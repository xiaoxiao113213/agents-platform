# Agents Platform 官网

Agents Platform 的独立纯前端官网，包含平台介绍、部署使用指南和正式版本下载记录。

## 本地开发

```powershell
pnpm install
powershell -ExecutionPolicy Bypass -File scripts/local/service.ps1 start
```

默认地址：<http://localhost:5175>

Linux/macOS 可使用：

```bash
./scripts/local/service.sh start
```

本地脚本支持 `start`、`restart`、`stop`、`status`、`health`、`logs` 和 `-h`。

## 构建与站点打包

```bash
pnpm build
pnpm package
```

`pnpm package` 会先构建，再在 `package/` 生成可直接交给 Nginx 等静态服务器的 `agents-platform-site-vX.Y.Z.tar.gz`。

## 正式发布

正式发布由主平台仓库的冻结发布物驱动，禁止用开发版本临时打包：

```powershell
$env:GITHUB_TOKEN = '<具有仓库写权限的 Token>'
./scripts/release/publish.ps1 -Version v0.0.5 -SourceRoot ..
```

```bash
export GITHUB_TOKEN='<具有仓库写权限的 Token>'
./scripts/release/publish.sh v0.0.5 ..
```

发布脚本会校验主仓库正式包和版本说明、构建官网、创建提交、更新 `master`、创建不可复用的 Tag 与 GitHub Release，并上传 Linux 正式包和官网静态包。脚本不生成或比较 SHA256。

发布前必须保证：

- 当前分支为 `master`
- 工作区无未提交修改
- `src/content/releases.ts` 已把目标版本标记为正式版本
- 主仓库存在 `dist/releases/<version>/devops-<version>-linux-x64.tar.gz`
- 主仓库存在 `docs/releases/<version>.md`
- 目标 Tag 和 GitHub Release 尚不存在

GitHub Release 单个附件上限为 2 GiB。脚本会在上传前检查文件大小并给出明确错误，不做哈希校验。
