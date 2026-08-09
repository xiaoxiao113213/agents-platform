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
