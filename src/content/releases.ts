export type ReleaseStatus = 'stable' | 'archived'

export interface PlatformRelease {
  version: string
  date: string
  status: ReleaseStatus
  title: string
  summary: string
  highlights: string[]
  metrics: string[]
  assetName: string
}

export const repositoryUrl = 'https://github.com/xiaoxiao113213/agents-platform'

export const releases: PlatformRelease[] = [
  {
    version: 'v0.0.6',
    date: '2026-07-31',
    status: 'stable',
    title: '轻量发布与远程镜像交付',
    summary: '把五个专业 Agent 镜像迁移到远端固定版本交付，让正式包更轻，同时保留完整安装、累计升级和现场配置保护能力。',
    highlights: [
      '五个 Linux x64 Agent 镜像完成固定 tag 构建、推送、远端回拉和本地镜像校验。',
      '正式包不再携带数 GiB Docker 镜像归档，启动和正式升级按 runtime-images.txt 自动拉取。',
      'check 与 upgrade --check 只读验证远端镜像、端口归属、配置和环境，并输出中文修复指引。',
      '为 v0.0.5 及更早客户提供一次性过渡脚本，现场 application.properties 与 nginx/devops.conf 继续保留。',
      '视频 Agent 固化专业旁白规范、神经语音链路和经过完整渲染验证的中国象棋教学案例。',
    ],
    metrics: ['5 个远端固定镜像', '137 项 Runtime 测试通过', '正式包约 373 MiB'],
    assetName: 'devops-v0.0.6-linux-x64.tar.gz',
  },
  {
    version: 'v0.0.5',
    date: '2026-07-29',
    status: 'archived',
    title: 'Agent 与 Issue 协作闭环',
    summary: '把专业 Agent、MCP、Issue 队列、客户授权和双端工作台收敛为可直接交付的完整版本。',
    highlights: [
      '新增 DevOps Issue 管理、项目授权、父子结构、附件、评论和六态 AI 处理闭环。',
      '新增 Issue Resolution Agent，并固化优先级排序、串行领取、澄清、处理和人工验收流程。',
      '视频 Agent 升级为神经语音与音视频双流门禁，避免生成无旁白成片。',
      '后台与客户工作台使用独立 Nginx 站点，升级时保留现场 application.properties 与 nginx/devops.conf。',
      '正式包同时支持空库安装、逐版升级和从任意更早正式版本累计直升。',
    ],
    metrics: ['5 个固定 Agent 镜像', '194 项后端测试', '135 项 Runtime 测试通过'],
    assetName: 'devops-v0.0.5-linux-x64.tar.gz',
  },
  {
    version: 'v0.0.4',
    date: '2026-07-27',
    status: 'archived',
    title: 'Agent Runtime 可观测性',
    summary: '将 Docker 生命周期与 Agent 执行状态分开呈现，并补齐 Linux 容器反向连接能力。',
    highlights: [
      'Agent 列表新增可用、异常状态与诊断弹框。',
      'Linux Docker Agent 自动维护 host-gateway 映射。',
      '异常时限制工作台入口，同时保留恢复操作。',
    ],
    metrics: ['166 项后端测试', '4 个固定 Agent 镜像'],
    assetName: 'devops-v0.0.4-linux-x64.tar.gz',
  },
  {
    version: 'v0.0.3',
    date: '2026-07-27',
    status: 'archived',
    title: '客户交付版本固化',
    summary: '统一 Jar、前端、数据库迁移和 Agent 镜像版本，稳定离线 Linux 交付链路。',
    highlights: [
      '内置通用、视频、PPT、Grafana 四种 Agent。',
      'Windows 构建产物统一 UTF-8 与 Linux 行尾。',
      '支持从 v0.0.1 或 v0.0.2 直接累计升级。',
    ],
    metrics: ['162 项后端测试', '4 个固定 Agent 镜像'],
    assetName: 'devops-v0.0.3-linux-x64.tar.gz',
  },
  {
    version: 'v0.0.2',
    date: '2026-07-27',
    status: 'archived',
    title: '专业 Agent 目录',
    summary: '从单一容器升级为可重复创建的内置 Agent 目录，并移除旧视频、PPT 独立业务模块。',
    highlights: [
      '创建 Agent 时明确选择类型，并显示能力与必填配置。',
      '敏感配置加密保存，必填值不提供演示默认值。',
      'Nginx 现场配置在升级和回滚中保持不变。',
    ],
    metrics: ['4 种内置 Agent', '161 项后端测试'],
    assetName: 'devops-v0.0.2-linux-x64.tar.gz',
  },
  {
    version: 'v0.0.1',
    date: '2026-07-26',
    status: 'archived',
    title: '首个正式发布基线',
    summary: '建立 Linux 独立部署、Flyway 累计升级、Docker/远程 Agent 和内置 MCP 的正式交付基线。',
    highlights: [
      'Java 21 宿主机服务、双前端 Nginx、MySQL 8 与 Docker Engine。',
      '同时支持 Docker Agent 和远程 Agent。',
      '内置 17 个离线 JavaScript MCP 制品。',
    ],
    metrics: ['17 个内置 MCP', '147 项后端测试'],
    assetName: 'devops-v0.0.1-linux-x64.tar.gz',
  },
]

export const latestRelease = releases[0]

export function getReleaseDownloadUrl(release: PlatformRelease) {
  return `${repositoryUrl}/releases/download/${release.version}/${release.assetName}`
}

export function getReleasePageUrl(version: string) {
  return `${repositoryUrl}/releases/tag/${version}`
}
