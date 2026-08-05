export type AgentCaseCategory = '研发工程' | '数据运营' | '内容交付' | '企业流程'

export type AgentCaseIcon =
  | 'code'
  | 'issue'
  | 'data'
  | 'presentation'
  | 'video'
  | 'operations'
  | 'research'
  | 'office'
  | 'schedule'
  | 'web'

export interface AgentUseCase {
  id: string
  index: string
  category: AgentCaseCategory
  icon: AgentCaseIcon
  title: string
  summary: string
  request: string
  sequence: string[]
  deliverables: string[]
  systems: string[]
}

export const agentCaseCategories = ['全部', '研发工程', '数据运营', '内容交付', '企业流程'] as const

export const agentUseCases: AgentUseCase[] = [
  {
    id: 'cross-end-debugging',
    index: '01',
    category: '研发工程',
    icon: 'code',
    title: '从一张截图定位跨端故障',
    summary: '沿页面、接口、SSE、会话持久化和运行时事件逐层排查，修复后完成双端构建与浏览器回归。',
    request: '“C 端切换项目后刷新错乱，识图结果必须刷新才出现，帮我查清并完整修好。”',
    sequence: ['复现页面与实时消息异常', '核对前端、后端与 Runtime 调用链', '修复、补测试并完成浏览器回归'],
    deliverables: ['代码变更', '根因清单', '自动化测试', '浏览器证据'],
    systems: ['React', 'Spring Boot', 'SSE / WebSocket', 'Playwright'],
  },
  {
    id: 'issue-delivery-loop',
    index: '02',
    category: '研发工程',
    icon: 'issue',
    title: '连续处理项目 Issue',
    summary: '按优先级领取需求与 Bug，读取评论、图片和附件，在同一工作区完成修改、验证、回写与人工验收。',
    request: '“把待 AI 处理的问题逐项解决，信息不足先问，处理完交回给我验收。”',
    sequence: ['领取单条 Issue 并锁定上下文', '澄清或执行代码与文档变更', '回写证据并进入人工验收'],
    deliverables: ['问题修复', '处理评论', '验证记录', '状态闭环'],
    systems: ['DevOps Issue', 'Git', 'CI', '项目文件'],
  },
  {
    id: 'business-dashboard',
    index: '03',
    category: '数据运营',
    icon: 'data',
    title: '把经营口径做成 Grafana 大盘',
    summary: '先探查真实数据库结构，再把自然语言指标转成可复查 SQL、可访问 Dashboard 和交付说明。',
    request: '“按区域、产品和月份分析订单变化，做一套管理层每天都能看的经营大盘。”',
    sequence: ['只读探查表结构与指标口径', '编写 SQL 并校验异常数据', '创建 Dashboard 并检查可读性'],
    deliverables: ['指标口径', '只读 SQL', 'Grafana Dashboard', '验证结论'],
    systems: ['MySQL', 'Grafana', 'MCP', '浏览器'],
  },
  {
    id: 'board-presentation',
    index: '04',
    category: '内容交付',
    icon: 'presentation',
    title: '把散乱材料变成董事会汇报',
    summary: '从多份文档、表格和会议纪要中提炼主线，完成逐页结构、数据表达、视觉排版与交付前检查。',
    request: '“把这些项目材料整理成 20 分钟汇报，重点讲问题、决策和下一阶段投入。”',
    sequence: ['读取材料并建立事实清单', '设计叙事结构与逐页信息', '生成并检查可编辑演示文稿'],
    deliverables: ['可编辑 PPTX', 'PDF', '逐页预览', '讲述提纲'],
    systems: ['PPT Agent', '文档', '表格', '品牌规范'],
  },
  {
    id: 'training-video',
    index: '05',
    category: '内容交付',
    icon: 'video',
    title: '自动完成带旁白培训视频',
    summary: '围绕受众和时长完成脚本、分镜、神经语音、字幕同步、画面工程与成片校验。',
    request: '“把新员工安全规范做成 8 分钟培训视频，语言清楚，字幕和旁白必须同步。”',
    sequence: ['规划章节、脚本与分镜', '生成旁白、字幕和画面工程', '渲染 MP4 并完成音画检查'],
    deliverables: ['MP4 成片', '配音稿', '字幕文件', '可维护工程'],
    systems: ['Video Agent', 'Remotion', '神经语音', '媒体工具'],
  },
  {
    id: 'production-incident',
    index: '06',
    category: '研发工程',
    icon: 'operations',
    title: '从告警追到生产故障根因',
    summary: '关联 Kubernetes 事件、容器日志、发布记录和质量门禁，给出根因、恢复动作与后续治理项。',
    request: '“新版本发布后接口大量超时，先只读排查，确认方案后再执行恢复动作。”',
    sequence: ['读取资源、事件与实时日志', '关联发布与代码质量事实', '提交恢复方案并在授权后执行'],
    deliverables: ['故障时间线', '根因证据', '恢复记录', '预防事项'],
    systems: ['Kubernetes', 'Docker', 'Jenkins', 'SonarQube'],
  },
  {
    id: 'market-research',
    index: '07',
    category: '企业流程',
    icon: 'research',
    title: '完成可追溯的行业与竞品调研',
    summary: '围绕明确问题检索、筛选和交叉验证来源，把结论、证据与不确定项整理为可继续编辑的报告。',
    request: '“研究国内工业智能体市场，比较主要产品、落地方式和采购风险，所有结论要有来源。”',
    sequence: ['拆解研究问题与证据标准', '检索并交叉核对有效来源', '组织结论、引用与待验证事项'],
    deliverables: ['调研报告', '来源索引', '竞品矩阵', '决策摘要'],
    systems: ['浏览器', '搜索', '文档生成', '知识库'],
  },
  {
    id: 'spreadsheet-operations',
    index: '08',
    category: '数据运营',
    icon: 'office',
    title: '批量核对表格并生成运营简报',
    summary: '清洗多来源 Excel，识别口径冲突和异常行，保留公式与审计列，并形成管理者可读的结果摘要。',
    request: '“合并华东区 12 家门店报表，找出异常波动，保留问题明细并生成本周简报。”',
    sequence: ['检查工作簿结构与字段口径', '清洗合并并标记异常证据', '生成分析表与管理摘要'],
    deliverables: ['整理后 XLSX', '异常清单', '趋势图表', '运营简报'],
    systems: ['Excel', '数据分析', '图表', '文件产物'],
  },
  {
    id: 'scheduled-briefing',
    index: '09',
    category: '企业流程',
    icon: 'schedule',
    title: '每天定时交付业务简报',
    summary: '把固定工作拆成可追踪定时任务，按计划读取授权数据、生成独立会话和结果，并保留每次运行记录。',
    request: '“工作日 9 点汇总昨日交付、质量和故障情况，生成一页日报并保留历史。”',
    sequence: ['配置时间、项目与数据权限', '独立会话执行查询和汇总', '归档结果、状态与失败原因'],
    deliverables: ['定时日报', '历史归档', '运行记录', '异常提示'],
    systems: ['定时任务', 'Workflow', 'MCP', 'Agent 会话'],
  },
  {
    id: 'product-interface',
    index: '10',
    category: '内容交付',
    icon: 'web',
    title: '把需求稿落成可用产品界面',
    summary: '读取现有设计系统与工程约束，完成页面、交互、响应式适配、生产构建和真实浏览器检查。',
    request: '“把这套后台工作台做得更专业，不能破坏原功能，桌面和移动端都要验收。”',
    sequence: ['审计现有产品与用户工作流', '实现页面、状态与响应式布局', '生产构建并完成浏览器回归'],
    deliverables: ['前端代码', '生产构建', '交互状态', '验收截图'],
    systems: ['React', '设计系统', 'TypeScript', 'Playwright'],
  },
]

export const serviceCustomers = [
  {
    city: '沈阳',
    name: '沈阳英培智谱科技有限公司',
  },
  {
    city: '嘉兴',
    name: '嘉兴跃擎科技有限公司',
  },
]
