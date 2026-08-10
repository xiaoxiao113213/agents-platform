export type ReleaseStatus = 'stable'

export interface PlatformRelease {
  version: string
  date: string
  status: ReleaseStatus
  title: string
  summary: string
  highlights: string[]
  metrics: string[]
  assetName: string
  guidedInstall: boolean
}

export const repositoryUrl = 'https://github.com/xiaoxiao113213/agents-platform'
export const officialSiteUrl = 'https://mmmqaz.cn'

export const releases: PlatformRelease[] = [
  {
    version: 'v1.0.4',
    date: '2026-08-10',
    status: 'stable',
    title: '共享对话稳定性与更灵活的模型接入',
    summary: '多人共享 Agent 的消息与任务过程更加稳定，并加入开箱即用的模型服务、可修改的 Grafana 配置和更清晰的升级进度。',
    highlights: [
      '共享会话按顺序处理每轮对话，消息、任务进度、工具结果和最终回复在所有使用者之间保持一致。',
      '内置 DeepSeek 与 Kimi 模型服务，只需填写 API Key 即可选择平台维护的模型与配置，同时保留完整的自定义接入能力。',
      'Grafana Agent 创建后可修改服务地址、令牌、默认文件夹和多数据源绑定，运行中的 Agent 保存后自动应用。',
      '大型 Office 类 Skill 可以从能力目录完整同步，Agent 管理、小屏布局和站点视觉细节同步优化。',
      '镜像准备与在线升级持续展示进度并支持断点续传，跨版本累计升级更加省心。',
    ],
    metrics: ['共享会话稳定', '内置模型服务', '可恢复升级'],
    assetName: 'devops-v1.0.4-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v1.0.3',
    date: '2026-08-09',
    status: 'stable',
    title: '多数据源看板与更稳定的 Agent 交付',
    summary: '内置 Agent 的项目规则、能力配置和交付验证更加完整，并支持在一套 Grafana 配置中组合多个数据源。',
    highlights: [
      '一套 Grafana 配置可绑定 1 至 20 套数据源组合，每个 UID 对应一套 MySQL 只读连接，同一大盘的不同组件可分别选用或复用数据源。',
      '内置 Agent 会按各自工作类型稳定初始化规则、Skill、能力配置和项目模板，并在交付前完成自我验证。',
      'Agent 项目网站可从常见构建目录和项目子目录稳定发布，并返回可直接访问的入口。',
      '问答、执行确认和文件工作台的信息更清晰，长内容、权限范围和操作结果更容易阅读。',
      '支持从更早正式版本直接累计升级，并修复了已知问题。',
    ],
    metrics: ['Grafana 多数据源', '内置 Agent 自验证', '累计升级'],
    assetName: 'devops-v1.0.3-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v1.0.2',
    date: '2026-08-09',
    status: 'stable',
    title: '更省心的安装与项目网站发布',
    summary: '减少重复配置和安装阻断，让平台、Agent 项目网站与运行环境按一致的默认规则协同工作。',
    highlights: [
      'Agent 项目网站自动使用平台当前域名和端口下的固定路径，无需重复填写公开访问地址。',
      '项目网站发布目录跟随平台数据根目录，应用与 Nginx 默认配置保持一致。',
      '安装和启动会直接复用本机已有运行环境，缺少的内容会在需要时自动下载。',
      '部署检查兼容常见 Nginx 配置写法，远程 Agent 地址仅在实际使用该能力时配置。',
      '发布成功后会直接返回可点击的网站入口，并修复了已知问题。',
    ],
    metrics: ['同域项目网站', '更少安装配置', '累计升级'],
    assetName: 'devops-v1.0.2-linux-x64.tar.gz',
    guidedInstall: true,
  },
]

export const latestRelease = releases[0]

export function getReleaseDownloadUrl(release: PlatformRelease) {
  return `${officialSiteUrl}/releases/${release.assetName}`
}

export function getReleasePageUrl(version: string) {
  return `${repositoryUrl}/releases/tag/${version}`
}
