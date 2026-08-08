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
    version: 'v1.0.0',
    date: '2026-08-08',
    status: 'stable',
    title: 'Agent 工作平台全新版本',
    summary: '以 Agent 为工作入口，统一项目、数据、Issue、协作和交付能力，让团队可以把完整任务交给 Agent 持续完成。',
    highlights: [
      'Agent 成为平台主入口，团队成员可在授权范围内创建、使用和共享同一份 Agent。',
      '内置通用、数据库、网站、Issue、Grafana、PPT 和视频七类 Agent。',
      'Issue、Skill、定时任务和项目服务都在项目工作区内直接使用。',
      '支持 Windows 与 Linux 远程 Agent，持续处理跨环境任务。',
      '完善对话控制、共享协作和移动宽度适配，并修复了已知问题。',
    ],
    metrics: ['7 个内置 Agent', '18 个内置 MCP', 'Linux 全新安装'],
    assetName: 'devops-v1.0.0-linux-x64.tar.gz',
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
