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
    version: 'v1.0.1',
    date: '2026-08-08',
    status: 'stable',
    title: '更清晰的能力权限与项目访问',
    summary: '让团队更准确地分配 Agent 能力，并在同一平台地址内使用项目网站、外部服务和持续协作能力。',
    highlights: [
      '本地 Agent、远程 Agent 和 Skill 工作台可分别授权，更适合不同岗位和团队边界。',
      '项目网站与平台使用同一访问地址，项目服务可在对话右侧或弹层中直接打开。',
      '外部网站不支持页面内打开时，会清楚说明需要调整的嵌入、HTTPS、Cookie 或登录条件。',
      '平台交互统一使用 Agent 产品语言，提问、审批与异常提示更加一致。',
      '支持全新安装和从 v1.0.0 直接升级，并修复了已知问题。',
    ],
    metrics: ['本地与远程 Agent', '项目内 Skill', 'Linux 安装与升级'],
    assetName: 'devops-v1.0.1-linux-x64.tar.gz',
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
