# Agents Platform 官网维护与发布

本文档只面向官网仓库维护者，记录本地开发、静态站点打包和正式 GitHub Release 流程。面向平台用户的产品能力、安装与升级说明统一保留在仓库根目录 `README.md`。

## 仓库职责

本仓库包含：

- Agents Platform 官网的 React + TypeScript + Vite 源码。
- 官网图标、真实产品截图和版本展示数据。
- 本地服务生命周期脚本。
- 官网静态包以及 GitHub Tag/Release 发布脚本。

本仓库不包含主平台后端、后台前端和客户前端源码。主平台冻结发布物由相邻的主平台仓库构建，再由本仓库发布到 GitHub Releases。

## 目录结构

```text
agents-platform/
├── public/                 # 官网图标与真实产品截图
├── src/                    # React 页面、版本数据与样式
├── docs/releases/          # 面向客户的公开版本说明
├── docs/MAINTENANCE.md     # 官网维护者文档
├── scripts/local/          # 本地服务生命周期脚本
├── scripts/release/        # 正式 Tag、Release 与附件发布脚本
├── package/                # 官网静态发布包，本地生成且不提交
├── package.json
└── README.md               # 对外产品介绍
```

## 本地开发

前端依赖使用 `pnpm` 管理，版本由 `package.json` 的 `packageManager` 字段约束。先启用 Corepack，再安装锁定依赖：

```powershell
corepack enable
pnpm install --frozen-lockfile
powershell -ExecutionPolicy Bypass -File scripts/local/service.ps1 start
```

Windows 默认访问地址：<http://localhost:5175>

Linux：

```bash
corepack enable
pnpm install --frozen-lockfile
./scripts/local/service.sh start
```

生命周期脚本支持：

```text
start | restart | stop | status | health | logs | -h
```

不要绕过脚本手工启动额外 Vite 进程，避免端口冲突、PID 失管和旧代码仍在运行。

## 构建与站点打包

只验证 production build：

```bash
pnpm build
```

生成官网静态包：

```bash
pnpm package
```

`pnpm build` 执行 TypeScript 检查和 Vite production build。`pnpm package` 已内置完整构建，不需要先重复执行 `pnpm build`，并会在 `package/` 生成：

```text
agents-platform-site-vX.Y.Z.tar.gz
```

该文件是可直接交给 Nginx 等静态服务器的官网包，不提交到 Git。

## 正式发布前提

正式发布由主平台仓库中已经冻结的版本驱动。执行前必须同时满足：

1. 当前分支为 `master`，并已从 `origin/master` 的最新提交开始准备本次发布。
2. `package.json` 的版本与目标 Tag 一致。
3. `src/content/releases.ts` 已登记目标版本，并标记为 `stable`。
4. 主平台仓库存在 `dist/releases/<version>/devops-<version>-linux-x64.tar.gz`。
5. 主平台仓库存在不可变的内部 `docs/releases/<version>.md`。
6. 官网仓库存在面向客户的 `docs/releases/<version>.md`，其内容与页面版本卡片一致。
7. 目标 GitHub Tag 和 Release 尚不存在。
8. 执行 `git status --short` 和 `git diff`，确认工作区只包含本次官网版本变化；发布脚本会执行 `git add -A`，不得混入无关文件或敏感内容。
9. 当前进程提供具有仓库写权限的 `GITHUB_TOKEN`，不得把 Token 写入文件、命令参数、Shell 历史、日志或提交。

## 公开版本文案

主平台仓库的 `docs/releases/<version>.md` 是内部验收记录，可以保留配置变化、验证数据和实现细节，但不得直接复制到官网或 GitHub Release。官网和 GitHub 的唯一公开说明来源是本仓库的 `docs/releases/<version>.md`。

公开内容只描述客户能够感知的功能、稳定性、兼容性和升级体验。不公开凭据处理过程、加密与签名实现、内部配置真源、数据库迁移编号和结构统计、测试数量，以及构建、推送、回拉等发布过程。无法用客户价值清晰表达的内部修正，统一写为“修复了已知问题”。`pnpm package` 会对页面版本数据和公开 Markdown 执行术语门禁；发布前还必须检查页面、`dist/releases/<version>.md`、GitHub Release 正文和同名 Markdown 附件。

脚本会使用普通 `git push origin master` 同步远端。执行前必须确认本地 `master` 没有意外分叉，且远端没有其他人尚未合并的发布提交。

## Windows 发布

以下命令以 `v1.0.0` 为当前正式版本示例：

```powershell
$secureToken = Read-Host 'GitHub Token' -AsSecureString
$env:GITHUB_TOKEN = [System.Net.NetworkCredential]::new('', $secureToken).Password
./scripts/release/publish.ps1 -Version v1.0.0 -SourceRoot ..
Remove-Item Env:\GITHUB_TOKEN
$secureToken = $null
```

## Linux 发布

```bash
read -rsp 'GitHub Token: ' GITHUB_TOKEN
printf '\n'
export GITHUB_TOKEN
./scripts/release/publish.sh v1.0.0 ..
unset GITHUB_TOKEN
```

发布脚本会：

1. 使用锁文件安装依赖并构建官网。
2. 生成官网静态发布包。
3. 提交官网版本变化并更新远端 `master`。
4. 使用官网公开版本说明创建不可覆盖的正式 Tag 与 GitHub Release。
5. 上传主平台 Linux 正式包、公开版本说明和官网静态包。

发布包不生成或比较 SHA256。GitHub Release 单个附件必须小于 2 GiB，脚本会在上传前检查文件大小。

## 中断恢复

如果 Tag 已创建，但 Release 创建或附件上传因网络中断，必须先确认目标 Tag 指向正确冻结提交，并确认当前官网构建输入与该 Tag 完全一致。

恢复模式不是纯上传模式：两个脚本仍会重新安装依赖、构建官网、执行 `git add -A`、按需提交，并通过普通 push 同步 `master`。只要当前源码已经继续开发，就不得直接恢复旧版本发布；应先把旧版本构建输入恢复到与 Tag 一致的状态，并再次检查生成的官网包。

Windows：

```powershell
./scripts/release/publish.ps1 -Version v1.0.0 -SourceRoot .. -Resume
```

Linux：

```bash
RESUME=true ./scripts/release/publish.sh v1.0.0 ..
```

恢复模式不会覆盖已有 Tag、Release 和同名附件，只会在完成上述重建与 `master` 同步后补齐缺失项。不要用它修改已经正式发布的版本内容。

## 发布后核验

发布完成后至少确认：

- GitHub 仓库默认分支仍为 `master`。
- Tag 指向本次官网冻结提交。
- Release 不是 Draft 或 Prerelease。
- Linux 正式包、公开版本说明与官网静态包均为 `uploaded`。
- GitHub 首页 README、真实产品截图和下载链接可以正常访问。
- 主平台仓库已经递增到下一个开发版本，已发布镜像 tag 和历史发布说明未被覆盖。
