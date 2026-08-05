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
    title: '凭据清理与密钥体系加固',
    summary: '清理源码与工具配置中的历史敏感信息，统一主密钥派生、Token 分域签名和数据库连接密码加密，并完成五个固定镜像与累计升级验证。',
    highlights: [
      '移除历史模型 Key、地图 Key、本地数据库密码、固定签名材料、示例 Token、个人目录与本机绝对路径。',
      '登录 Token 与文件 Token 从主密钥按用途独立派生 HMAC-SHA256 密钥，跨用途 Token 不能互相验签。',
      '数据库连接密码改为基于主密钥的 AES-GCM 加密；旧格式密文明确提示重新填写，不再用不可靠的固定密钥兼容。',
      'SECRET_KEY 不再提供运行默认值，升级保持既有配置键、端口、目录、MySQL 与 Nginx 现场参数不变。',
      '五个内置 Agent 镜像统一升级到 v0.0.9，并完成空库、v0.0.8 升级和 v0.0.1 累计直升验证。',
    ],
    metrics: ['230 项后端测试', '5 个 v0.0.9 固定镜像', '3 条数据库路径双启动'],
    assetName: 'devops-v0.0.9-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v0.0.8',
    date: '2026-08-04',
    status: 'archived',
    title: 'Agent 项目隔离与原生 Issue 协作',
    summary: '完善客户 Agent 多项目隔离、流式消息稳定性和定时任务，并把 Issue MCP 与 Skill 收敛为平台托管的一键能力包。',
    highlights: [
      '客户 Agent 支持多项目切换，聊天、文件、附件、产物、工作流和项目服务按项目完整隔离。',
      '修复流式消息闪动、图片识别结果延迟到刷新后才显示，以及旧项目异步响应覆盖当前项目的问题。',
      'Issue 能力改为平台原生 MCP + Skill 包；一个 Agent 项目只绑定一个 Issue 项目，并在后台与 C 端顶部展示绑定信息。',
      '新增仅一次、每天、每周、每月和按间隔的 Agent 定时对话，使用独立归档会话并提供运行记录。',
      '容器删除、API Key 同步和本地端口联动形成完整闭环，五个内置 Agent 镜像统一升级到 v0.0.8。',
    ],
    metrics: ['5 个 v0.0.8 固定镜像', '225 项后端测试', '141 项 Runtime 测试通过'],
    assetName: 'devops-v0.0.8-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v0.0.7',
    date: '2026-07-31',
    status: 'archived',
    title: '交互式安装与官网在线升级',
    summary: '把 Linux 首次部署、依赖检查、Nginx 接入、启动器更新和后续累计升级收敛为中文交互流程，让非运维用户也能完成正式安装与升级。',
    highlights: [
      '新增 ./devops.sh install 中文安装向导，逐项检查并在用户确认后自动安装缺失依赖。',
      '自动识别已有 Nginx 和 include 目录，保护系统 nginx.conf 与现场 server_name、端口和证书配置。',
      '新增 update --check 与 update，直接从官网检查、下载并累计升级到最新正式版本。',
      '启动器独立版本化；v0.0.6 及更早客户可用一条命令安全备份并替换旧 devops.sh。',
      '五个专业 Agent 镜像统一升级到 v0.0.7 固定 tag，并由部署脚本从远端自动拉取。',
    ],
    metrics: ['5 个远端固定镜像', '完整 Linux 启动器契约', '一条命令升级旧启动器'],
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
