#!/usr/bin/env bash
set -euo pipefail

VERSION="${1:-}"
SOURCE_ROOT="${2:-..}"
REPOSITORY="${REPOSITORY:-xiaoxiao113213/agents-platform}"
RESUME="${RESUME:-false}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
SOURCE="$(cd "$ROOT/$SOURCE_ROOT" && pwd)"

[[ "$VERSION" =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]] || { printf '用法：publish.sh vX.Y.Z [主仓库目录]\n' >&2; exit 1; }
[[ -n "${GITHUB_TOKEN:-}" ]] || { printf '错误：缺少 GITHUB_TOKEN。\n' >&2; exit 1; }

ARCHIVE="$SOURCE/dist/releases/$VERSION/devops-$VERSION-linux-x64.tar.gz"
NOTES="$SOURCE/docs/releases/$VERSION.md"
SITE_ARCHIVE="$ROOT/package/agents-platform-site-$VERSION.tar.gz"
[[ -f "$ARCHIVE" ]] || { printf '错误：缺少正式 Linux 发布包：%s\n' "$ARCHIVE" >&2; exit 1; }
[[ -f "$NOTES" ]] || { printf '错误：缺少正式版本说明：%s\n' "$NOTES" >&2; exit 1; }
[[ "$(stat -c %s "$ARCHIVE")" -lt 2147483648 ]] || { printf '错误：正式包达到或超过 GitHub 单附件 2 GiB 上限。请先降低体积或设计分片交付，不要增加哈希文件。\n' >&2; exit 1; }

PACKAGE_VERSION="v$(node -p "JSON.parse(require('fs').readFileSync('$ROOT/package.json','utf8')).version")"
[[ "$PACKAGE_VERSION" == "$VERSION" ]] || { printf '错误：package.json 版本 %s 与目标版本 %s 不一致。\n' "$PACKAGE_VERSION" "$VERSION" >&2; exit 1; }
if ! node - "$ROOT/src/content/releases.ts" "$VERSION" <<'NODE'
const fs = require('fs')
const [file, version] = process.argv.slice(2)
const escaped = version.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
const source = fs.readFileSync(file, 'utf8')
if (!new RegExp(`version:\\s*'${escaped}'[\\s\\S]{0,400}?status:\\s*'stable'`).test(source)) process.exit(1)
NODE
then
  printf '错误：版本数据未把 %s 标记为正式版本。\n' "$VERSION" >&2
  exit 1
fi

cd "$ROOT"
[[ "$(git branch --show-current)" == master ]] || { printf '错误：正式发布必须在 master 分支执行。\n' >&2; exit 1; }
pnpm install --frozen-lockfile
pnpm package
[[ -f "$SITE_ARCHIVE" ]] || { printf '错误：官网发布包未生成。\n' >&2; exit 1; }

git add -A
git diff --cached --quiet || git commit -m "release: $VERSION"
git push --force-with-lease origin master

REMOTE_TAG="$(git ls-remote --tags origin "refs/tags/$VERSION")"
if [[ -n "$REMOTE_TAG" && "$RESUME" != true ]]; then
  printf '错误：远端 Tag %s 已存在且不可覆盖。仅补传附件时设置 RESUME=true。\n' "$VERSION" >&2
  exit 1
fi
if [[ -z "$REMOTE_TAG" ]]; then
  git tag -a "$VERSION" -m "Agents Platform $VERSION"
  git push origin "refs/tags/$VERSION"
fi

AUTH_HEADER="Authorization: Bearer $GITHUB_TOKEN"
ACCEPT_HEADER='Accept: application/vnd.github+json'
VERSION_HEADER='X-GitHub-Api-Version: 2022-11-28'
RELEASE_JSON="$(curl --silent --show-error --fail-with-body \
  -H "$AUTH_HEADER" -H "$ACCEPT_HEADER" -H "$VERSION_HEADER" \
  "https://api.github.com/repos/$REPOSITORY/releases/tags/$VERSION" 2>/dev/null || true)"

if [[ -n "$RELEASE_JSON" && "$RESUME" != true ]]; then
  printf '错误：GitHub Release %s 已存在且不可覆盖。仅补传附件时设置 RESUME=true。\n' "$VERSION" >&2
  exit 1
fi
if [[ -z "$RELEASE_JSON" ]]; then
  PAYLOAD="$(node - "$VERSION" "$NOTES" <<'NODE'
const fs = require('fs')
const [version, notes] = process.argv.slice(2)
process.stdout.write(JSON.stringify({tag_name: version, target_commitish: 'master', name: `Agents Platform ${version}`, body: fs.readFileSync(notes, 'utf8'), draft: false, prerelease: false}))
NODE
)"
  RELEASE_JSON="$(curl --silent --show-error --fail-with-body -X POST \
    -H "$AUTH_HEADER" -H "$ACCEPT_HEADER" -H "$VERSION_HEADER" -H 'Content-Type: application/json' \
    -d "$PAYLOAD" "https://api.github.com/repos/$REPOSITORY/releases")"
fi

UPLOAD_URL="$(printf '%s' "$RELEASE_JSON" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>process.stdout.write(JSON.parse(s).upload_url.replace('{?name,label}','')))")"
ASSET_NAMES="$(printf '%s' "$RELEASE_JSON" | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>process.stdout.write((JSON.parse(s).assets||[]).map(x=>x.name).join('\\n')))")"

for FILE in "$ARCHIVE" "$SITE_ARCHIVE"; do
  NAME="$(basename "$FILE")"
  if printf '%s\n' "$ASSET_NAMES" | grep -Fxq "$NAME"; then
    printf '附件已存在，跳过：%s\n' "$NAME"
    continue
  fi
  ENCODED_NAME="$(node -p "encodeURIComponent(process.argv[1])" "$NAME")"
  printf '正在上传：%s\n' "$NAME"
  curl --silent --show-error --fail-with-body -X POST \
    -H "$AUTH_HEADER" -H "$ACCEPT_HEADER" -H "$VERSION_HEADER" -H 'Content-Type: application/octet-stream' \
    --data-binary "@$FILE" "$UPLOAD_URL?name=$ENCODED_NAME" >/dev/null
done

printf '正式发布完成：https://github.com/%s/releases/tag/%s\n' "$REPOSITORY" "$VERSION"
