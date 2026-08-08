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
</p>

<p align="center">
  <a href="https://mmmqaz.cn/"><strong>官方网站</strong></a>
  ·
  <a href="https://mmmqaz.cn/#/capabilities">能力与案例</a>
  ·
  <a href="https://mmmqaz.cn/#/deploy">部署指南</a>
  ·
  <a href="https://mmmqaz.cn/#/guide">使用指南</a>
  ·
  <a href="https://mmmqaz.cn/#/releases">版本下载</a>
</p>

<p align="center">
  <a href="https://mmmqaz.cn/releases/devops-v1.0.0-linux-x64.tar.gz"><strong>官网下载 v1.0.0</strong></a>
  ·
  <a href="https://github.com/xiaoxiao113213/agents-platform/releases/tag/v1.0.0">GitHub Release</a>
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
| Grafana Agent | 分析数据并创建经营或运维看板 | 指标口径、SQL、Dashboard |
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

## v1.0.0 部署

`v1.0.0` 是全新的安装代际，仅支持 Linux x64 全新安装：

- 使用新的安装目录。
- 连接空 MySQL 8 `devops` 数据库。
- 宿主机准备 Java 21 和 Docker。
- 不支持从 `v0.x` 原地升级。
- 后续 `v1.x` 补丁版本支持同代升级。

```bash
curl -fL -o devops-v1.0.0-linux-x64.tar.gz \
  https://mmmqaz.cn/releases/devops-v1.0.0-linux-x64.tar.gz

tar -xzf devops-v1.0.0-linux-x64.tar.gz
cd devops-v1.0.0
cp application.properties.example application.properties

# 填写现场配置后执行
chmod +x devops.sh
./devops.sh check
./devops.sh start
./devops.sh status
```

完整步骤见[官方部署指南](https://mmmqaz.cn/#/deploy)。

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

## 服务与联系

当前服务客户包括：

- 沈阳英培智谱科技有限公司
- 嘉兴跃擎科技有限公司

产品使用、部署支持与商务合作：`418179551@qq.com`

## 版本

当前正式版本：[`v1.0.0`](./docs/releases/v1.0.0.md)

正式安装包、版本说明和不可覆盖的 Tag 统一发布在 [GitHub Releases](https://github.com/xiaoxiao113213/agents-platform/releases)。
