export interface BuiltinAgent {
  code: string
  name: string
  category: string
  summary: string
  input: string
  output: string
  audience: string
  capabilities: string[]
}

export interface BuiltinMcp {
  code: string
  name: string
  category: 'scm' | 'artifact' | 'data' | 'infrastructure' | 'quality' | 'observability' | 'collaboration'
  description: string
  capabilities: string[]
}

export const builtinAgents: BuiltinAgent[] = [
  {
    code: 'default',
    name: '通用 Claude Agent',
    category: '研发与自动化',
    summary: '带完整终端、文件系统、项目工作区和扩展能力的通用软件工程 Agent。',
    input: '代码仓库、问题描述、设计文档或自动化目标',
    output: '代码修改、验证结果、文档、脚本与可下载产物',
    audience: '研发、测试、架构与平台团队',
    capabilities: ['软件开发', '终端操作', '文件处理', 'MCP 扩展'],
  },
  {
    code: 'ai-video',
    name: 'AI 视频制作 Agent',
    category: '内容生产',
    summary: '从主题到分镜、专业旁白、字幕与 Remotion 工程，完成校验后交付 MP4。',
    input: '主题、受众、时长、品牌要求与参考素材',
    output: '带神经语音旁白和字幕的 MP4、脚本与工程文件',
    audience: '市场、培训、售前与内部传播团队',
    capabilities: ['视频策划', '分镜脚本', '神经语音', '字幕同步', 'MP4 渲染'],
  },
  {
    code: 'ai-ppt',
    name: 'AI PPT 制作 Agent',
    category: '内容生产',
    summary: '围绕主题、受众与材料完成结构、逐页内容、视觉排版和交付前检查。',
    input: '汇报目标、受众、原始材料与品牌规范',
    output: '可继续编辑的 PPTX、PDF 和逐页预览图',
    audience: '管理层、售前、咨询与项目团队',
    capabilities: ['内容策划', '演示结构', 'PPTX 生成', '版式检查', '可编辑交付'],
  },
  {
    code: 'grafana-dashboard',
    name: 'Grafana 大盘 Agent',
    category: '数据与可观测',
    summary: '探查只读 MySQL 数据、编写和校验 SQL，在 Grafana 中创建或迭代 Dashboard。',
    input: '指标需求、数据源连接、Grafana 地址与目标文件夹',
    output: '可访问的 Grafana Dashboard、只读 SQL 与验证结论',
    audience: '运维、研发效能、数据与管理团队',
    capabilities: ['MySQL 只读分析', '数据探查', 'Dashboard 设计', 'SQL 校验', '看板迭代'],
  },
  {
    code: 'issue-resolution',
    name: 'DevOps Issue 处理 Agent',
    category: '研发协作',
    summary: '按优先级串行接管需求、Bug 和任务，下载完整上下文并完成澄清、处理与交付。',
    input: '待 AI 处理的 Issue、评论、图片、附件和项目代码',
    output: '代码或文档变更、验证证据、处理评论和待人工验收状态',
    audience: '产品、研发、测试与客户支持团队',
    capabilities: ['Issue 接管', '需求与 Bug 处理', '附件处理', '评论协作', '验证闭环'],
  },
]

export const mcpCategoryLabels: Record<BuiltinMcp['category'], string> = {
  scm: '代码与协作',
  artifact: '制品与存储',
  data: '数据平台',
  infrastructure: '基础设施',
  quality: '质量工程',
  observability: '可观测',
  collaboration: '业务协作',
}

export const builtinMcps: BuiltinMcp[] = [
  { code: 'github', name: 'GitHub', category: 'scm', description: '仓库、分支、标签、成员、Issue、PR、Actions 与权限管理。', capabilities: ['仓库', 'PR', 'Issue', 'Actions'] },
  { code: 'gitlab', name: 'GitLab', category: 'scm', description: '项目、分支、标签、成员、合并请求与 CI Pipeline 管理。', capabilities: ['项目', 'MR', 'Pipeline', '权限'] },
  { code: 'gerrit', name: 'Gerrit', category: 'scm', description: '项目、分支、标签、访问权限、变更与评审管理。', capabilities: ['变更', '评审', '分支', '权限'] },
  { code: 'svn', name: 'Subversion', category: 'scm', description: '仓库浏览、日志、差异、工作副本、分支、标签与提交管理。', capabilities: ['仓库', '差异', '历史', '提交'] },
  { code: 'artifactory', name: 'JFrog Artifactory', category: 'artifact', description: '仓库、制品、目录、远程代理、权限与构建信息管理。', capabilities: ['制品', '代理', '权限', '构建信息'] },
  { code: 'nexus', name: 'Sonatype Nexus', category: 'artifact', description: '仓库、组件、制品、代理仓库、安全权限与任务管理。', capabilities: ['组件', '制品', '代理', '任务'] },
  { code: 'ftp', name: 'FTP / FTPS', category: 'artifact', description: '在限定根目录内浏览、读取、上传、移动和删除文件。', capabilities: ['文件', '目录', '上传', '下载'] },
  { code: 's3', name: 'S3 对象存储', category: 'artifact', description: '管理 AWS S3、MinIO 等兼容存储的 Bucket、对象、元数据和签名 URL。', capabilities: ['Bucket', '对象', '复制', '签名 URL'] },
  { code: 'mysql', name: 'MySQL（只读）', category: 'data', description: '只读查询结构、DDL、索引、约束、例程、事件并执行 EXPLAIN 和诊断。', capabilities: ['查询', 'Schema', 'EXPLAIN', '诊断'] },
  { code: 'milvus', name: 'Milvus', category: 'data', description: '数据库、Collection、向量数据、索引与查询管理。', capabilities: ['Collection', '向量', '索引', '查询'] },
  { code: 'kubernetes', name: 'Kubernetes', category: 'infrastructure', description: '上下文、资源、日志、事件、发布、扩缩容与指标管理。', capabilities: ['资源', '日志', '发布', '扩缩容'] },
  { code: 'jenkins', name: 'Jenkins', category: 'infrastructure', description: 'Job、Pipeline、构建参数、队列、日志、节点与视图管理。', capabilities: ['Job', 'Pipeline', '构建', '日志'] },
  { code: 'docker', name: 'Docker Engine', category: 'infrastructure', description: '容器、镜像、网络、存储卷、日志、状态与资源用量管理。', capabilities: ['容器', '镜像', '网络', '指标'] },
  { code: 'kafka', name: 'Apache Kafka', category: 'infrastructure', description: '集群、Topic、Partition、Consumer Group、生产与有界消费管理。', capabilities: ['Topic', '分区', '消费组', '消息'] },
  { code: 'sonarqube', name: 'SonarQube', category: 'quality', description: '项目、问题、指标、质量门禁、分析历史、源码与安全热点管理。', capabilities: ['问题', '指标', '质量门禁', '热点'] },
  { code: 'parasoft', name: 'Parasoft DTP', category: 'quality', description: '项目、构建、静态分析问题、测试、覆盖率与质量门禁管理。', capabilities: ['构建', '静态分析', '覆盖率', '门禁'] },
  { code: 'grafana', name: 'Grafana', category: 'observability', description: '数据源、文件夹、Dashboard 查询、校验、创建、更新与深链生成。', capabilities: ['数据源', 'Dashboard', 'SQL 校验', '深链'] },
  { code: 'devops-issue', name: 'DevOps Issue', category: 'collaboration', description: '按项目查询、创建、接管、评论、流转和解决 Issue，并交换图片与附件。', capabilities: ['项目', '父子 Issue', '评论', '附件'] },
]

export const enterpriseScenarios = [
  { index: '01', title: '研发问题自动闭环', path: 'Issue → Agent → 代码与验证 → 人工验收', description: '产品把需求或 Bug 放入待 AI 队列，Agent 串行接管、澄清、修改、验证并交回用户关闭。' },
  { index: '02', title: '研发效能与质量治理', path: 'GitHub / GitLab → Jenkins → SonarQube → Issue', description: '从代码变更、流水线和质量门禁中读取事实，定位失败原因并形成可追踪处理项。' },
  { index: '03', title: '基础设施故障处理', path: 'Kubernetes / Docker → 日志与指标 → 处理建议', description: '围绕资源、事件、日志和发布状态完成诊断，在权限边界内执行明确的恢复动作。' },
  { index: '04', title: '经营与项目数据看板', path: 'MySQL → SQL 校验 → Grafana Dashboard', description: '把自然语言指标需求转成可复查的只读 SQL 和可访问、可继续迭代的监控大盘。' },
  { index: '05', title: '企业内容生产', path: '业务材料 → 视频 / PPT Agent → 可编辑产物', description: '让培训、售前和汇报材料进入标准工程，产出带旁白视频或可编辑演示文稿。' },
]
