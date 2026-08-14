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
  upgradeNotice?: {
    title: string
    summary: string
    guidePath: string
    action: string
  }
}

export const repositoryUrl = 'https://github.com/xiaoxiao113213/agents-platform'
export const officialSiteUrl = 'https://mmmqaz.cn'

export const releases: PlatformRelease[] = [
  {
    version: 'v1.0.17',
    date: '2026-08-15',
    status: 'stable',
    title: 'Skill 导入贡献与项目服务恢复更加稳定',
    summary: '提升 GitHub Skill 包、大型项目 Skill 贡献和旧运行环境项目服务恢复的兼容性，并确保新项目自动具备统一目录规范。',
    highlights: [
      'GitHub 下载的 Skill ZIP 可保留安全的点目录和点文件，不再因常见仓库结构误判导入失败。',
      '大型项目 Skill 贡献改用受控文件传输，降低长时间等待后返回 503 的概率，并在失败后清理临时文件。',
      '每个新建项目和新 Agent 的默认项目都会自动写入项目目录规范 Skill，无需用户重复安装。',
      '旧运行环境不支持新恢复接口时，平台会使用兼容动作重新部署或停止项目服务。',
      'Agent 停止、重启、重建或迁移后会及时断开旧连接，避免请求继续命中过期运行环境。',
      'JDK、Maven、pnpm 内容没有变化，不重复提供软件离线包，继续复用 v1.0.15 软件包和服务器缓存。',
      '修复了已知问题。',
    ],
    metrics: ['GitHub Skill 兼容', '大型贡献稳定', '旧服务自动恢复'],
    assetName: 'devops-v1.0.17-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先导入运行环境',
      summary: '先导入本版本运行环境包，再执行平台累计升级；现场配置、项目工作区、会话和已有 Skill 会继续保留。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.16',
    date: '2026-08-14',
    status: 'stable',
    title: '项目服务长期运行更稳定，异常可直接定位',
    summary: '修复项目服务运行一段时间后访问超时和网络流量持续升高的问题，并在全局看板提供逐 Agent、逐服务诊断。',
    highlights: [
      '单个项目服务响应过快或浏览器处理过慢时，只中止受影响的访问，不再拖累同一 Agent 的其他服务。',
      '项目服务长时间运行、Agent 断线重连和平台重启后的连接与资源释放更加完整。',
      '全局看板新增项目服务总数、异常数，以及每个 Agent 的服务健康汇总。',
      '逐服务诊断展示 Agent 与通道在线状态、活动请求、连接、数据积压、健康时间和明确问题原因。',
      'Linux 升级预检兼容不同语言环境，不再输出配置键排序告警。',
      '对话稳定、会话恢复、Linux 终端、离线安装和项目服务重建恢复继续纳入统一回归。',
      'JDK、Maven、pnpm 内容没有变化，不重复提供软件离线包，已有环境继续复用缓存。',
      '修复了已知问题。',
    ],
    metrics: ['长时间运行稳定', '单服务故障隔离', '全局诊断可见'],
    assetName: 'devops-v1.0.16-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先导入运行环境',
      summary: '先导入本版本运行环境包，再执行平台累计升级；现场配置、项目工作区和会话数据会继续保留。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.15',
    date: '2026-08-14',
    status: 'stable',
    title: '项目服务重启和重建后可自动恢复',
    summary: '修复项目服务在平台重启、Agent 重启或容器重建后仍显示运行中但实际无法打开的问题。',
    highlights: [
      '容器重建后即使本地服务状态记录丢失，也会从平台保存的完整配置重新建立运行状态。',
      '打开项目服务前会确认真实运行状态，过期的端口和进程信息不再直接用于访问。',
      '项目服务首访和后台巡检共用同一恢复流程，避免重复启动和持续失败重试。',
      '项目服务响应超时会正确标记为上游服务故障，后续访问可以触发恢复。',
      '保留失败次数和退避保护，故障项目不会形成无限重启循环。',
      '修复了已知问题。',
    ],
    metrics: ['重建后自动恢复', '首访实时确认', '失败状态可追踪'],
    assetName: 'devops-v1.0.15-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先导入运行环境',
      summary: '先导入本版本运行环境包，再执行平台累计升级；现场配置、项目工作区和会话数据会继续保留。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.14',
    date: '2026-08-14',
    status: 'stable',
    title: 'Agent 重启恢复与持续对话更加稳定',
    summary: '系统或 Agent 重启后会主动恢复项目服务和会话状态，对话页面保持稳定，离线软件安装也更加可靠。',
    highlights: [
      '平台和 Agent 重启后会主动恢复原来要求运行的项目服务，无需先打开服务面板触发恢复。',
      '项目服务恢复过程具备并发保护和失败隔离，单个服务异常不会拖垮整个 Agent 运行进程。',
      'Agent 对话页的后台刷新保持现有对象和界面状态，减少整页闪动、滚动跳动和无关服务刷新。',
      '关闭审核面板后停止无意义的高频审核请求，降低长时间对话的页面负担。',
      '历史会话恢复失败时保留原会话，不会静默创建缺少上下文的新会话。',
      '离线安装命令兼容非交互终端，JDK、Maven 和 pnpm 继续直接复用服务器缓存。',
      'Linux 终端输入、新会话创建、服务入口自动出现和终端角色权限继续保持可用。',
      '修复了已知问题。',
    ],
    metrics: ['重启后自动恢复', '对话界面稳定', '离线安装可靠'],
    assetName: 'devops-v1.0.14-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先导入运行环境',
      summary: '先导入本版本运行环境包，再执行平台累计升级；现场配置、项目工作区和会话数据会继续保留。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.13',
    date: '2026-08-14',
    status: 'stable',
    title: 'Agent 对话、终端和离线安装恢复稳定',
    summary: '对话不再整页闪动，回合结束后可以可靠继续发送；Linux Docker Agent 终端输入和离线软件安装也已修复。',
    highlights: [
      'Agent 对话执行期间保持当前页面和消息稳定，不再按秒刷新整个对话界面。',
      '上一回合真正结束后才开放下一次发送，避免错误提示上一条消息仍在处理中。',
      '新会话执行期间保持同一会话上下文，不再因地址切换出现跳动或消息抖动。',
      'Linux Docker Agent 终端恢复键盘输入、交互命令和窗口尺寸同步。',
      'Docker Agent 安装离线 JDK、Maven 和 pnpm 时直接复用服务器缓存，减少不必要的传输等待。',
      'Windows 与 Linux 远程 Agent 的原有终端和软件安装方式保持兼容。',
      '修复了已知问题。',
    ],
    metrics: ['对话稳定可续发', 'Linux 终端可输入', '离线安装更快'],
    assetName: 'devops-v1.0.13-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先导入运行环境',
      summary: '先导入本版本运行环境包，再执行平台累计升级；需要离线安装 JDK、Maven 或 pnpm 时，继续复用服务器缓存目录。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.12',
    date: '2026-08-13',
    status: 'stable',
    title: '项目协作与 Agent 工作区更加完整',
    summary: '项目资料、附件预览、会话恢复、服务入口和终端权限形成更稳定的项目协作闭环。',
    highlights: [
      'Issue 项目新增资料目录、审核发布、历史版本和事项关联，AI 可以读取背景并沉淀确认后的结论。',
      '对话附件支持常用文本、代码、Markdown、图片、PDF 和音视频站内预览。',
      '新建会话立即出现在左侧，快速重复操作只创建一个会话，刷新后不会丢失或重复。',
      'Agent 开发出新的项目服务后，当前项目的服务入口会在对话过程中自动出现，无需刷新页面。',
      '角色管理新增 Agent 终端权限，授权成员可以在其有权访问的 Agent 项目中使用终端。',
      '项目文件按交付类型规范放置，已有工程保持原结构，迁移前必须先得到用户确认。',
      '新建或重建 Agent 的最低配置统一为 2 核、2048 MB。',
      'JDK、Maven 和 pnpm 可从服务器离线缓存安装，避免每个 Agent 重复下载。',
      '视频 Agent 增加成熟镜头制作库，强化产品演示、空间运镜、节奏和声音设计。',
      'Agent 重建跟随当前固定运行环境，停机 Agent 不再沿用历史版本。',
      '修复了已知问题。',
    ],
    metrics: ['会话即时可用', '服务入口自动出现', '终端按角色授权'],
    assetName: 'devops-v1.0.12-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先准备运行环境',
      summary: '升级前先导入本版本运行环境包；需要为 Agent 安装 JDK、Maven 或 pnpm 时，再把离线软件包一次解压到默认缓存目录。现场配置和项目数据会继续保留。',
      guidePath: '/deploy#update',
      action: '查看升级步骤',
    },
  },
  {
    version: 'v1.0.11',
    date: '2026-08-13',
    status: 'stable',
    title: '共享对话与刷新恢复更加可靠',
    summary: '多人共用会话时保持顺序，执行中刷新可恢复完整状态，Windows 与 Linux 远程 Agent 的项目能力也更加稳定。',
    highlights: [
      '同一共享会话按顺序处理输入，发送后立即显示执行状态，快速重复点击只产生一次请求。',
      '新会话执行期间刷新会恢复真实会话、工具过程和最终回复，不再残留临时会话。',
      'Windows 与 Linux 远程 Agent 使用各自的平台身份和工作区，同机多个 Agent 相互独立。',
      '项目应用兼容常见端口变量写法，修改配置或人工重启后会重新进行健康检查。',
      '项目应用可按项目开放公网访问，未开放时继续只允许项目成员访问。',
      '项目 Skill 可以贡献到能力广场，贡献者可以继续更新自己分享的版本。',
      'Skill ZIP 导入兼容单个 Markdown 文件和常见 macOS 压缩包元数据。',
      '可以独立导入完整运行环境交付包，再执行平台升级。',
      '修复了已知问题。',
    ],
    metrics: ['共享输入有序', '项目应用可分享', 'Skill 可沉淀'],
    assetName: 'devops-v1.0.11-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先检查现场配置',
      summary: 'v1.0.11 没有新增生产配置；项目应用仍需完成通配 DNS 与 Nginx 项目应用虚拟主机配置。',
      guidePath: '/deploy#project-app',
      action: '查看项目应用配置',
    },
  },
  {
    version: 'v1.0.10',
    date: '2026-08-12',
    status: 'stable',
    title: '共享会话与远程 Agent 更加稳定',
    summary: '长任务消息、工具过程和最终回复保持一致，Windows 与 Linux 远程 Agent 的升级、终端和项目能力同步也更加可靠。',
    highlights: [
      '消息、任务进度、工具结果和最终回复保持稳定顺序，刷新后可以恢复完整历史。',
      '错误、停止与中断结果更加清晰，已完成历史不再重复显示实时消息。',
      'API Key 和模型只在当前会话执行期间锁定，其他空闲会话不受影响。',
      'Windows 与 Linux 远程 Agent 统一提供生命周期、升级、状态和日志命令，并展示 Runtime 版本状态。',
      '远程终端输入、输出与断线重连更加稳定，重启时确保只保留一个有效进程。',
      '重建内置 Agent 会保留项目内容，远程项目的项目应用、Skill 和 MCP 同步更加可靠。',
    ],
    metrics: ['共享消息一致', '远程运行稳定', '项目内容保留'],
    assetName: 'devops-v1.0.10-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: '升级前先检查现场配置',
      summary: 'v1.0.10 没有新增生产配置；项目应用仍需完成通配 DNS 与 Nginx 项目应用虚拟主机配置。',
      guidePath: '/deploy#project-app',
      action: '查看项目应用配置',
    },
  },
  {
    version: 'v1.0.9',
    date: '2026-08-11',
    status: 'stable',
    title: '让每个 Agent 项目真正运行完整应用',
    summary: '前端、Java、Node.js、Python 和前后端一体项目都可以在项目空间中运行、自检，并通过独立地址访问。',
    highlights: [
      '每个项目都可以按需添加项目应用能力，统一管理启动、停止、重启、状态和访问入口。',
      '项目应用使用独立子域名访问，静态网站和动态服务保持一致，项目之间相互隔离。',
      '对话中可以直接搜索和添加工程 Skill，不同项目可以自由组合自己的能力。',
      '新增常用前端、Java、Node.js、Python 和一体化工程 Skill，数据库升级随服务启动自动完成。',
      '从旧版本升级后需合并项目应用 Nginx 虚拟主机，并配置项目根域的通配 DNS；版本页提供完整步骤和验证命令。',
      '服务启动会检查端口与进程状态，安装配置更清晰，并修复了已知问题。',
    ],
    metrics: ['完整项目运行', '独立应用地址', '升级配置清单'],
    assetName: 'devops-v1.0.9-linux-x64.tar.gz',
    guidedInstall: true,
    upgradeNotice: {
      title: 'v1.0.9 项目应用升级必做',
      summary: '从旧版本升级后，需要配置项目应用根域与通配 DNS，并将新的项目应用虚拟主机合并到现场 Nginx 配置。',
      guidePath: '/deploy#project-app',
      action: '查看域名与 Nginx 步骤',
    },
  },
  {
    version: 'v1.0.8',
    date: '2026-08-11',
    status: 'stable',
    title: '大型会话更快，任务与产物更稳定',
    summary: '大型会话按需加载历史，多人共享时消息与最终状态保持一致，任务进度和产物展示也更加可靠。',
    highlights: [
      '大型会话优先加载最近消息，需要时可继续查看更早内容，重新进入对话更加顺畅。',
      '多人共用 Agent 和会话时，正在生成的消息、最终回复与刷新后的状态保持一致。',
      '已结束任务不再错误显示为运行中，长计划默认展示摘要并可完整展开阅读。',
      '会话产物打开更快，手工刷新仍可重新校准，无效或空白产物不再占据列表。',
      '减少重复后台请求，并修复了已知问题。',
    ],
    metrics: ['历史按需加载', '共享消息一致', '任务状态准确'],
    assetName: 'devops-v1.0.8-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v1.0.7',
    date: '2026-08-10',
    status: 'stable',
    title: '项目切换更自然，团队权限更细致',
    summary: '模型连接与 Issue 能力可以按角色分配，运行中的 Agent 支持跨项目查看，长任务消息展示也更加稳定。',
    highlights: [
      '模型连接管理与 Issue 管理统一通过角色权限分配，团队职责不再受固定账号限制。',
      'Issue 权限覆盖查看、项目管理、创建、编辑、评论、流转、删除与项目令牌，操作和数据范围可分别控制。',
      'Agent 执行期间可以切换项目，原任务继续完成，当前页面只显示所选项目的数据和状态。',
      '切回原项目后可继续处理任务问答，项目浏览不会打断正在执行的工作。',
      'Task、子任务和超长内容在分栏和小尺寸窗口中保持稳定，并修复了已知问题。',
    ],
    metrics: ['角色化能力权限', '运行中项目切换', '长内容稳定展示'],
    assetName: 'devops-v1.0.7-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v1.0.6',
    date: '2026-08-10',
    status: 'stable',
    title: '模型用量清晰可见，共享对话更加稳定',
    summary: '模型连接支持按成员授权并提供多维用量分析，多人共享会话和长任务上下文处理也更加稳定。',
    highlights: [
      '模型连接可以全局共享或只授权给指定成员，团队复用与使用边界都能按需设置。',
      '用量分析按连接、成员和模型展示请求次数及 Token 消耗，并支持日期与对象筛选。',
      '删除模型连接前可以查看关联内容，并先批量替换到其他连接，减少 Agent 使用中断。',
      '多人共用同一 Agent 和会话时，消息顺序、任务过程与最终结果保持一致。',
      '长任务会更早整理上下文并继续执行，同时修复了已知问题。',
    ],
    metrics: ['成员级连接权限', '多维 Token 用量', '共享会话稳定'],
    assetName: 'devops-v1.0.6-linux-x64.tar.gz',
    guidedInstall: true,
  },
  {
    version: 'v1.0.5',
    date: '2026-08-10',
    status: 'stable',
    title: '团队模型连接与远程 Agent 更易使用',
    summary: '团队可以更灵活地复用已配置的模型连接，远程 Agent 支持多模型连接，并进一步减少累计升级后的磁盘占用。',
    highlights: [
      '已启用的模型连接可以在团队 Agent 中直接选择和切换，集中配置后无需每位成员重复录入。',
      '创建远程 Agent 时可以一次绑定多个模型连接、指定默认项，并根据可用模型完成选择。',
      '模型连接的日常维护仍由具备管理权限的成员负责，Agent 使用与连接维护各自保持清晰。',
      '累计升级完成后会清理没有被任何 Agent 使用的旧版本运行环境；仍在使用的内容会自动保留。',
      '安装与升级说明统一到当前累计升级规则，并修复了已知问题。',
    ],
    metrics: ['团队连接共享', '远程 Agent 多模型', '升级自动整理'],
    assetName: 'devops-v1.0.5-linux-x64.tar.gz',
    guidedInstall: true,
  },
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
