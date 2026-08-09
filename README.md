<p align="center">
  <img src="./public/favicon.svg" width="76" height="76" alt="Agents Platform 标志" />
</p>

<h1 align="center">Agents Platform</h1>

<p align="center">
  <strong>让 Agent 进入项目，完成真实工作。</strong>
</p>

<p align="center">
  从软件研发、数据库和 Issue 协作，到网站、经营看板、PPT 与视频交付，<br />
  团队在一个平台中创建、共享和持续使用自己的 Agent。
</p>

<p align="center">
  <a href="https://github.com/xiaoxiao113213/agents-platform/releases/latest"><img src="https://img.shields.io/github/v/release/xiaoxiao113213/agents-platform?display_name=tag&style=flat-square&color=111111" alt="最新正式版本" /></a>
  <img src="https://img.shields.io/badge/production-Linux%20x64-111111?style=flat-square" alt="生产平台 Linux x64" />
  <img src="https://img.shields.io/badge/runtime-Java%2021-111111?style=flat-square" alt="Java 21" />
  <img src="https://img.shields.io/badge/Agent-7%20built--in-137a55?style=flat-square" alt="7 个内置 Agent" />
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-Proprietary-111111?style=flat-square" alt="专有软件许可" /></a>
</p>

<p align="center">
  <a href="https://mmmqaz.cn/"><strong>官方网站</strong></a>
  ·
  <a href="https://mmmqaz.cn/#/capabilities">能力与案例</a>
  ·
  <a href="https://mmmqaz.cn/#/deploy">安装与升级</a>
  ·
  <a href="https://mmmqaz.cn/#/guide">使用指南</a>
  ·
  <a href="https://mmmqaz.cn/#/releases">版本下载</a>
</p>

<p align="center">
  <a href="https://mmmqaz.cn/releases/devops-v1.0.3-linux-x64.tar.gz"><strong>官网下载 v1.0.3</strong></a>
  ·
  <a href="https://github.com/xiaoxiao113213/agents-platform/releases/tag/v1.0.3">GitHub Release</a>
</p>

## Agent 是平台的工作入口

Agents Platform 不是另一个独立聊天页面。每个 Agent 都拥有项目目录、会话、文件、任务和交付物，可以在授权范围内使用团队已有的代码、数据和业务系统。

- 每位成员都可以在权限和数量限制内创建 Agent 与项目。
- Agent 可以添加共享成员，成员进入同一份 Agent，共享会话和项目现场。
- 账号 ID 1 拥有完整管理权限，其他账号的功能由统一权限控制。
- 一个 Agent 项目目录绑定一个 Issue 项目，绑定关系和当前项目持续展示。
- 一个数据库 Agent 绑定一个 MySQL Schema，数据库问答、ER 设计和 SQL 操作在同一工作区完成。

## 七类内置 Agent

| Agent | 主要工作 | 典型交付 |
| --- | --- | --- |
| 通用 Agent | 软件开发、排障、自动化与文档 | 代码、脚本、验证记录、文件 |
| 数据库 Agent | 数据库问答、结构设计与 SQL 操作 | ER 设计、SQL、分析与执行记录 |
| 网站开发 Agent | 网站与 Web 应用设计、开发和验收 | 前端工程、构建文件、可访问站点 |
| Issue 处理 Agent | 接管需求、Bug 和任务并完成处理闭环 | 修改结果、评论、证据与验收状态 |
| Grafana Agent | 在一套 Grafana 中组合多个数据源进行分析 | 指标口径、SQL、多数据源 Dashboard |
| PPT Agent | 把材料整理成专业演示文稿 | 可编辑 PPTX、PDF、预览图 |
| 视频 Agent | 从主题完成脚本、旁白、字幕和成片 | MP4、字幕、脚本与工程文件 |

## 团队可以交付什么

- 从一张故障截图出发，沿页面、接口、实时消息和运行时完成修复与回归。
- 按项目连续处理 Issue，读取评论、图片和附件，完成修改后交给人工验收。
- 探查数据库结构，把经营问题转成可复查 SQL 和 Grafana Dashboard。
- 将散乱材料整理为董事会汇报或带旁白培训视频。
- 读取云平台、流水线和质量信息，形成故障根因、恢复建议与治理事项。
- 根据产品需求实现网站或工作台，完成响应式适配和真实浏览器检查。

更多完整案例见[官网能力与案例](https://mmmqaz.cn/#/capabilities)。

## v1.0.3 安装与升级

`v1.0.3` 支持 Linux x64 全新安装，也支持从 `v0.0.1` 及后续正式版本在原安装目录直接累计升级，无需补装中间版本。跨较大版本升级前，请先在数据库备份副本上核对业务数据。

### 已有 v1 环境在线升级

先备份 MySQL、`application.properties` 和 `nginx/devops.conf`，再进入当前安装目录执行：

```bash
./devops.sh update --check
./devops.sh stop
./devops.sh update
./devops.sh check
./devops.sh start
./devops.sh status
```

如果旧 `devops.sh` 没有 `update` 命令，或新版本提示先升级启动器，只更新启动器后再预检：

```bash
curl -fsSL https://mmmqaz.cn/releases/update-launcher.sh | bash
./devops.sh launcher-version
./devops.sh images status
./devops.sh update --check
```

启动器更新会备份并只替换 `devops.sh`，不会停止服务，也不会修改程序、配置、Nginx、数据库或运行数据。镜像可以独立查看和下载，下载时会显示每个镜像、Docker 分层进度、等待时间和最终汇总：

```bash
./devops.sh images status
./devops.sh images pull
./devops.sh images pull /tmp/devops-v1.0.3-linux-x64.tar.gz
```

在线产品包下载中断后，再次执行 `./devops.sh update` 会断点续传；如果产品包已经完成而镜像阶段中断，会直接复用已下载的包，不会再次下载完整产品包。独立更新后的启动器也不会被较旧的产品包降级覆盖。服务器无法访问官网时，可以先下载 Linux 包，再执行：

```bash
./devops.sh upgrade --check /tmp/devops-v1.0.3-linux-x64.tar.gz
./devops.sh stop
./devops.sh upgrade /tmp/devops-v1.0.3-linux-x64.tar.gz
./devops.sh check
./devops.sh start
./devops.sh status
```

升级会保留实际 `application.properties`、`nginx/devops.conf`、数据、日志和数据库；新版示例写入对应 `.example` 文件，由维护者按提示合并新增项。`rollback` 只回滚程序，不回滚数据库，恢复旧程序前必须确认数据库兼容或同时恢复升级前备份。

### 首次安装

全新安装使用新目录和空 MySQL 8 `devops` 数据库：

```bash
curl -fL -o devops-v1.0.3-linux-x64.tar.gz \
  https://mmmqaz.cn/releases/devops-v1.0.3-linux-x64.tar.gz

tar -xzf devops-v1.0.3-linux-x64.tar.gz
cd devops-v1.0.3
chmod +x devops.sh
./devops.sh install
```

安装、升级、配置差异和回滚边界见[官方安装与升级指南](https://mmmqaz.cn/#/deploy)。

## 官网本地开发

```powershell
pnpm install
powershell -ExecutionPolicy Bypass -File scripts/local/service.ps1 start
```

本地地址：`http://localhost:5175`

```powershell
pnpm lint
pnpm build
```

官网交付文件生成在 `dist/`。线上官网文件由维护者自行拷贝部署。

## 软件许可

Agents Platform 是可免费自托管使用的专有软件，不是开源软件。免费授权适用于个人或同一法人实体内部使用官方未修改的二进制发布包；平台核心源码、再分发、OEM、SaaS 转售和面向第三方的托管服务不在免费授权范围内。

本 GitHub 仓库用于维护官方网站源码与发布正式二进制文件，不代表平台核心源码开放。完整条款见 [LICENSE](./LICENSE)，其他使用方式请联系 `418179551@qq.com` 获取书面商业授权。

## 服务与联系

当前服务客户包括：

- 沈阳英培智谱科技有限公司
- 嘉兴跃擎科技有限公司

产品使用、部署支持与商务合作：`418179551@qq.com`

## 版本

当前正式版本：[`v1.0.3`](./docs/releases/v1.0.3.md)

正式安装包、版本说明和不可覆盖的 Tag 统一发布在 [GitHub Releases](https://github.com/xiaoxiao113213/agents-platform/releases)。
