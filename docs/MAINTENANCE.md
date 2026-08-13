# Agents Platform 官网维护与发布

本文档只面向官网仓库维护者，记录本地开发、静态站点打包和交付流程。面向平台用户的产品能力、安装与升级说明统一保留在仓库根目录 `README.md`。

## 仓库职责

本仓库包含：

- Agents Platform 官网的 React + TypeScript + Vite 源码。
- 官网图标、真实产品截图和版本展示数据。
- 本地服务生命周期脚本。
- 官网静态包，以及仅供维护者手工选择的 GitHub Tag/Release 辅助脚本。

本仓库不包含主平台后端、后台前端和客户前端源码。主平台冻结发布物由相邻的主平台仓库构建，再由本仓库生成官网 `dist/` 和本地站点归档；官网服务器由维护者自行部署。

## 目录结构

```text
agents-platform/
├── public/                 # 官网图标与真实产品截图
├── src/                    # React 页面、版本数据与样式
├── docs/releases/          # 面向客户的公开版本说明
├── docs/MAINTENANCE.md     # 官网维护者文档
├── scripts/local/          # 本地服务生命周期脚本
├── scripts/release/        # 可选的人工 GitHub 发布辅助脚本，默认流程不调用
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

## 官网交付前提

官网交付由主平台仓库中已经冻结的版本驱动。执行前必须同时满足：

1. 当前工作目录是官网主工作区，避免从历史 worktree 或旧副本构建。
2. `package.json` 的版本与目标产品版本一致。
3. `src/content/releases.ts` 已登记目标版本，并标记为 `stable`。
4. 主平台仓库存在 `dist/releases/<version>/devops-<version>-linux-x64.tar.gz`。
5. 主平台仓库存在不可变的内部 `docs/releases/<version>.md`。
6. 官网仓库存在面向客户的 `docs/releases/<version>.md`，其内容与页面版本卡片一致。
7. 公开内容已完成隐私和敏感信息检查。
8. `pnpm package` 成功，`dist/releases/latest.properties`、当前版本安装包、版本说明、启动器和更新脚本均存在。

## 公开版本文案

主平台仓库的 `docs/releases/<version>.md` 是内部验收记录，可以保留配置变化、验证数据和实现细节，但不得直接复制到官网。官网公开说明的唯一来源是本仓库的 `docs/releases/<version>.md`。

公开内容只描述客户能够感知的功能、稳定性、兼容性和升级体验。不公开凭据处理过程、加密与签名实现、内部配置真源、数据库迁移编号和结构统计、测试数量，以及镜像构建等内部发布过程。无法用客户价值清晰表达的内部修正，统一写为“修复了已知问题”。`pnpm package` 会对页面版本数据和公开 Markdown 执行术语门禁；交付前还必须检查页面和 `dist/releases/<version>.md`。

某个版本新增或改变客户现场的域名、DNS、Nginx、证书、端口、网关或外部服务要求时，不能只写功能介绍。该版本的公开说明和官网部署页必须同时列出：升级前置条件、精确配置键与填写示例、现场文件的保留与合并方式、DNS/证书/Nginx 操作、可执行的检查命令、产品内真实验收步骤及常见错误。这些内容必须随对应版本的 `docs/releases/<version>.md` 一起校验，不得只放在安装包内部手册。

正式官网内容交付后发现部署文档缺口，使用 `docs/guides/vX.Y.Z-*.md` 新增带版本号的补充说明，并从官网版本卡片与部署页提供直接入口。后续正式版本必须在交付前将这些内容直接纳入当版客户版说明。

## 本地正式交付

在官网目录执行：

```bash
pnpm package
```

完成后核验：

- `dist/` 是待人工复制到官网服务器的唯一静态目录。
- `dist/releases/latest.properties` 指向当前正式版本的安装包和说明。
- `dist/releases/devops.sh`、`update-launcher.sh` 与 `launcher.properties` 已同步。
- `package/agents-platform-site-vX.Y.Z.tar.gz` 可以完整列出并包含 `VERSION`。
- 官网正文、版本说明和安装升级命令不包含内部信息或旧版本下载地址。

AI 不连接官网服务器，不执行 Git commit/push、Tag、GitHub Release 或附件上传，也不在发布完成后自动递增产品版本。

## 可选人工 GitHub 工具

`scripts/release/publish.ps1` 与 `publish.sh` 仅作为维护者未来可能使用的人工工具保留，不属于官网或产品版本的默认发布步骤。只有维护者另行决定采用 GitHub Release 时，才应独立审阅脚本、凭据范围、目标版本和远端状态后手工执行。
