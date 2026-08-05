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
  guidedInstall: boolean
}

export const repositoryUrl = 'https://github.com/xiaoxiao113213/agents-platform'
export const officialSiteUrl = 'https://mmmqaz.cn'

export const releases: PlatformRelease[] = [
  {
    version: 'v0.0.9',
    date: '2026-08-05',
    status: 'stable',
    title: '稳定性与升级体验优化',
    summary: '提升平台运行稳定性与版本升级体验，完善内置 Agent 能力，并修复了已知问题。',
    highlights: [
      '提升账号登录、文件访问和数据连接等核心场景的稳定性。',
      '优化数据库设计与连接配置的保存和使用体验。',
      '保持端口、目录和站点等现场配置兼容，减少升级后的重复调整。',
      '五个内置专业 Agent 同步更新，部署和使用流程保持一致。',
      '修复了已知问题，提升长期运行与累计升级稳定性。',
    ],
    metrics: ['5 个内置专业 Agent', '支持全新安装', '支持跨版本累计升级'],
    assetName: 'devops-v0.0.9-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v0.0.8',
    date: '2026-08-04',
    status: 'archived',
    title: 'Agent 项目空间与 Issue 协作',
    summary: '完善 Agent 多项目空间、内置 Issue 协作和定时任务，让不同项目的工作更清晰、更稳定。',
    highlights: [
      'Agent 支持多个项目空间自由切换，聊天、文件、附件、产物和工作流按项目独立管理。',
      '优化项目切换后的聊天连续性，图片识别结果可以及时、稳定地呈现。',
      'Issue 协作成为平台内置能力，一个项目目录绑定一个 Issue 项目，并在后台与 C 端顶部清晰展示。',
      '支持仅一次、每天、每周、每月和自定义间隔的定时对话，并提供运行记录。',
      '五个内置专业 Agent 同步更新，并修复了已知问题。',
    ],
    metrics: ['项目空间独立管理', '内置 Issue 协作闭环', '多种定时对话方式'],
    assetName: 'devops-v0.0.8-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v0.0.7',
    date: '2026-07-31',
    status: 'archived',
    title: '中文安装向导与在线升级',
    summary: '提供清晰的中文安装向导和在线累计升级能力，让首次安装与后续升级更简单。',
    highlights: [
      '中文安装向导会逐项完成环境检查，并在确认后帮助准备缺失环境。',
      '兼容客户已有站点、端口和证书配置，降低首次接入与升级调整成本。',
      '支持在线检查、下载并累计升级到最新正式版本。',
      '已部署客户可以平滑切换到新的在线升级流程。',
      '五个内置专业 Agent 同步更新，并修复了已知问题。',
    ],
    metrics: ['中文引导安装', '在线累计升级', '5 个内置专业 Agent'],
    assetName: 'devops-v0.0.7-linux-x64.tar.gz',
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
