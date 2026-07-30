#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
RUNTIME_DIR="$ROOT/.runtime/agents-platform-local"
PID_FILE="$RUNTIME_DIR/service.pid"
OUT_LOG="$RUNTIME_DIR/stdout.log"
ERR_LOG="$RUNTIME_DIR/stderr.log"
PORT=5175
HEALTH_URL="http://localhost:${PORT}/"

show_help() {
  cat <<'EOF'
Agents Platform 本地服务管理

用法：./scripts/local/service.sh <命令>

命令：
  start     启动 Vite 开发服务，默认监听 5175
  restart   停止当前脚本管理的服务后重新启动
  stop      只停止 PID 文件记录的服务及其子进程
  status    显示 PID、端口归属、健康状态和日志位置
  health    探测 http://localhost:5175/，成功退出码为 0
  logs      持续查看 stdout/stderr 日志，按 Ctrl+C 退出
  -h        显示本帮助

若 5175 被外部进程占用，脚本不会终止该进程。请先停止占用者，或同步修改
package.json 中的 dev 端口、脚本中的 PORT 与健康地址。
EOF
}

read_pid() {
  [[ -f "$PID_FILE" ]] || return 1
  local value
  value="$(tr -d '[:space:]' < "$PID_FILE")"
  [[ "$value" =~ ^[0-9]+$ ]] || return 1
  printf '%s' "$value"
}

port_owner() {
  if command -v ss >/dev/null 2>&1; then
    ss -ltnp "sport = :$PORT" 2>/dev/null | awk 'NR > 1 { if (match($0, /pid=([0-9]+)/, m)) { print m[1]; exit } }'
  elif command -v lsof >/dev/null 2>&1; then
    lsof -nP -iTCP:"$PORT" -sTCP:LISTEN -t 2>/dev/null | head -n 1
  fi
}

healthy() {
  curl --silent --show-error --fail --max-time 3 "$HEALTH_URL" >/dev/null 2>&1
}

is_descendant() {
  local child="$1" ancestor="$2" current="$1" parent
  for _ in {1..12}; do
    [[ "$current" == "$ancestor" ]] && return 0
    [[ -r "/proc/$current/stat" ]] || return 1
    parent="$(awk '{print $4}' "/proc/$current/stat")"
    [[ "$parent" =~ ^[0-9]+$ && "$parent" -gt 0 ]] || return 1
    current="$parent"
  done
  return 1
}

show_status() {
  local pid="" owner="" managed=no state=stopped health=unhealthy
  pid="$(read_pid || true)"
  owner="$(port_owner || true)"
  [[ -n "$pid" && -d "/proc/$pid" ]] && state=running
  [[ -n "$pid" && -n "$owner" ]] && is_descendant "$owner" "$pid" && managed=yes
  healthy && health=healthy
  printf 'service=%s\nport=%s\nurl=%s\npid=%s\nport_owner_pid=%s\nmanaged=%s\nprocess=%s\nhealth=%s\nout_log=%s\nerr_log=%s\n' \
    agents-platform "$PORT" "$HEALTH_URL" "${pid:-none}" "${owner:-none}" "$managed" "$state" "$health" "$OUT_LOG" "$ERR_LOG"
  if [[ -n "$owner" && "$managed" != yes ]]; then
    printf '警告：端口 %s 被外部进程占用，脚本不会停止它。PID=%s，命令=%s\n' "$PORT" "$owner" "$(tr '\0' ' ' < "/proc/$owner/cmdline" 2>/dev/null || true)" >&2
  fi
}

start_service() {
  mkdir -p "$RUNTIME_DIR"
  local pid="" owner=""
  pid="$(read_pid || true)"
  if [[ -n "$pid" && -d "/proc/$pid" ]]; then
    healthy && { printf 'Agents Platform 已运行：%s\n' "$HEALTH_URL"; show_status; return; }
    printf '错误：PID 文件记录的进程仍在运行但健康检查失败。请执行 logs 或 restart。\n' >&2
    exit 1
  fi
  owner="$(port_owner || true)"
  if [[ -n "$owner" ]]; then
    printf '错误：端口 %s 被外部进程占用，PID=%s。脚本不会停止外部进程。\n' "$PORT" "$owner" >&2
    exit 1
  fi
  command -v pnpm >/dev/null 2>&1 || { printf '错误：未找到 pnpm。\n' >&2; exit 1; }
  (
    cd "$ROOT"
    nohup pnpm dev >"$OUT_LOG" 2>"$ERR_LOG" &
    echo "$!" > "$PID_FILE"
  )
  for _ in {1..30}; do
    sleep 0.5
    healthy && { printf 'Agents Platform 已启动：%s\n' "$HEALTH_URL"; return; }
    pid="$(read_pid || true)"
    [[ -n "$pid" && -d "/proc/$pid" ]] || break
  done
  printf '错误：服务未在 15 秒内就绪。请查看 %s 和 %s。\n' "$OUT_LOG" "$ERR_LOG" >&2
  exit 1
}

stop_service() {
  local pid=""
  pid="$(read_pid || true)"
  if [[ -z "$pid" || ! -d "/proc/$pid" ]]; then
    rm -f "$PID_FILE"
    printf 'Agents Platform 本地服务未运行。\n'
    return
  fi
  pkill -TERM -P "$pid" 2>/dev/null || true
  kill -TERM "$pid" 2>/dev/null || true
  for _ in {1..20}; do
    [[ ! -d "/proc/$pid" ]] && break
    sleep 0.2
  done
  if [[ -d "/proc/$pid" ]]; then
    pkill -KILL -P "$pid" 2>/dev/null || true
    kill -KILL "$pid" 2>/dev/null || true
  fi
  rm -f "$PID_FILE"
  printf 'Agents Platform 本地服务已停止。\n'
}

case "${1:-status}" in
  start) start_service ;;
  restart) stop_service; start_service ;;
  stop) stop_service ;;
  status) show_status ;;
  health) healthy && { printf '健康：%s\n' "$HEALTH_URL"; exit 0; }; printf '不可用：%s\n' "$HEALTH_URL" >&2; exit 1 ;;
  logs) mkdir -p "$RUNTIME_DIR"; touch "$OUT_LOG" "$ERR_LOG"; tail -n 80 -f "$OUT_LOG" "$ERR_LOG" ;;
  -h|--help|help) show_help ;;
  *) show_help; printf '错误：未知命令：%s\n' "$1" >&2; exit 1 ;;
esac

