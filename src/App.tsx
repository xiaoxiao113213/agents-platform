import { type ReactNode, useEffect, useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  Bot,
  Boxes,
  Check,
  ChevronRight,
  CircleDot,
  CloudDownload,
  Code2,
  Command,
  Copy,
  Database,
  ExternalLink,
  FileCheck2,
  GitBranch,
  Github,
  KeyRound,
  Menu,
  MessageSquareText,
  Network,
  PackageCheck,
  PanelTop,
  Play,
  RefreshCcw,
  Route,
  Server,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Workflow,
  X,
} from 'lucide-react'
import { Link, NavLink, Route as RouterRoute, Routes, useLocation } from 'react-router-dom'
import {
  builtinAgents,
  builtinMcps,
  enterpriseScenarios,
  mcpCategoryLabels,
  type BuiltinMcp,
} from './content/capabilities'
import {
  getReleaseDownloadUrl,
  getReleasePageUrl,
  latestRelease,
  releases,
  repositoryUrl,
} from './content/releases'
import {
  agentCaseCategories,
  agentUseCases,
  serviceCustomers,
  type AgentUseCase,
} from './content/useCases'

const navItems = [
  { to: '/', label: '平台' },
  { to: '/capabilities', label: '能力目录' },
  { to: '/deploy', label: '部署指南' },
  { to: '/guide', label: '使用指南' },
  { to: '/releases', label: '版本与下载' },
]

const contactEmail = '418179551@qq.com'

function Logo() {
  return (
    <Link className="brand" to="/" aria-label="Agents Platform 首页">
      <span className="brand-mark" aria-hidden="true">
        <span />
        <span />
        <span />
      </span>
      <span>Agents Platform</span>
    </Link>
  )
}

function SiteHeader() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Logo />
        <nav className={`site-nav ${open ? 'is-open' : ''}`} aria-label="主导航">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.to === '/'}>
              {item.label}
            </NavLink>
          ))}
          <a className="nav-github" href={repositoryUrl} target="_blank" rel="noreferrer">
            <Github size={17} /> GitHub
          </a>
        </nav>
        <button
          className="icon-button mobile-menu"
          type="button"
          aria-label={open ? '关闭导航' : '打开导航'}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <Logo />
          <p>给 Agent 一个目标、一组工具和清晰边界，让它把真实工作交付到结果。</p>
        </div>
        <div className="footer-links">
          <span>产品</span>
          <Link to="/capabilities">能力目录</Link>
          <Link to="/deploy">部署指南</Link>
          <Link to="/guide">使用指南</Link>
          <Link to="/releases">版本下载</Link>
        </div>
        <div className="footer-links">
          <span>仓库</span>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">提交问题</a>
        </div>
        <div className="footer-links">
          <span>联系</span>
          <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>Agents Platform</span>
        <span>Linux production delivery</span>
      </div>
    </footer>
  )
}

function HomePage() {
  const [activeCaseCategory, setActiveCaseCategory] = useState<(typeof agentCaseCategories)[number]>('全部')
  const [activeCaseId, setActiveCaseId] = useState(agentUseCases[0].id)
  const visibleCases = activeCaseCategory === '全部'
    ? agentUseCases
    : agentUseCases.filter((item) => item.category === activeCaseCategory)
  const activeCase = agentUseCases.find((item) => item.id === activeCaseId) ?? visibleCases[0] ?? agentUseCases[0]
  const caseIcons: Record<AgentUseCase['icon'], ReactNode> = {
    code: <Code2 />,
    issue: <MessageSquareText />,
    data: <Database />,
    presentation: <PanelTop />,
    video: <Play />,
    operations: <Server />,
    research: <Sparkles />,
    office: <FileCheck2 />,
    schedule: <RefreshCcw />,
    web: <PanelTop />,
  }

  const changeCaseCategory = (category: (typeof agentCaseCategories)[number]) => {
    setActiveCaseCategory(category)
    const firstCase = category === '全部'
      ? agentUseCases[0]
      : agentUseCases.find((item) => item.category === category)
    if (firstCase) setActiveCaseId(firstCase.id)
  }

  return (
    <main>
      <section className="home-hero">
        <div className="home-hero-product" aria-hidden="true" />
        <div className="home-hero-wash" aria-hidden="true" />
        <div className="shell home-hero-inner">
          <div className="home-hero-copy">
            <div className="release-kicker">
              <span className="live-dot" />
              Agent operating system
              <span className="kicker-divider" />
              {latestRelease.version}
            </div>
            <h1>Agents Platform</h1>
            <p className="home-hero-statement">
              不是回答问题。<br />是把工作做完。
            </p>
            <p className="home-hero-lead">
              给出目标，接入企业工具，Agent 会自己拆解任务、操作系统、生成文件、验证结果，再把完整过程交给人验收。
            </p>
            <div className="home-hero-actions">
              <RouteAnchor className="button button-primary" to="/#cases">
                看它能做什么 <ArrowDown size={17} />
              </RouteAnchor>
              <Link className="text-action" to="/capabilities">
                查看完整能力目录 <ArrowRight size={17} />
              </Link>
            </div>
            <div className="home-task-ticker" aria-label="Agent 可承接的任务示例">
              <span>现在可以交给它</span>
              <div>
                <strong>修复跨端故障</strong>
                <strong>生成经营大盘</strong>
                <strong>完成投标方案</strong>
                <strong>处理项目 Issue</strong>
              </div>
            </div>
          </div>
          <div className="home-live-trace" aria-label="Agent 执行轨迹示例">
            <span className="home-live-trace-status"><i /> 正在执行</span>
            <strong>排查客户工作台实时消息异常</strong>
            <div><span>01</span>读取截图与会话事件</div>
            <div><span>02</span>定位前端、SSE 与持久化链路</div>
            <div><span>03</span>修复并运行双端回归</div>
            <small>过程留痕 · 结果待人工验收</small>
          </div>
        </div>
      </section>

      <section className="customer-signal" aria-labelledby="customer-signal-title">
        <div className="shell customer-signal-inner">
          <div>
            <span>服务客户</span>
            <strong id="customer-signal-title">来自真实企业场景的持续反馈</strong>
          </div>
          {serviceCustomers.map((customer) => (
            <p key={customer.name}><small>{customer.city}</small>{customer.name}</p>
          ))}
          <Link to="/#customers">查看服务方式 <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="case-lab" id="cases">
        <div className="shell case-lab-heading">
          <div>
            <span className="eyebrow">Capability in practice</span>
            <h2>能力不是一张清单。<br />它发生在每个真实任务里。</h2>
          </div>
          <div>
            <p>下面是可复现的能力演示，不是客户项目成效。切换任务，查看 Agent 如何从一句目标走到可验收产物。</p>
            <span>{agentUseCases.length} 个跨职能案例</span>
          </div>
        </div>
        <div className="shell case-filters" role="tablist" aria-label="案例分类">
          {agentCaseCategories.map((category) => (
            <button
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCaseCategory === category}
              className={activeCaseCategory === category ? 'is-active' : ''}
              onClick={() => changeCaseCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="shell case-browser">
          <div className="case-index" role="tablist" aria-label={`${activeCaseCategory}案例`}>
            {visibleCases.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={activeCase.id === item.id}
                className={activeCase.id === item.id ? 'is-active' : ''}
                onClick={() => setActiveCaseId(item.id)}
              >
                <span>{item.index}</span>
                <i>{caseIcons[item.icon]}</i>
                <div><small>{item.category}</small><strong>{item.title}</strong></div>
                <ArrowRight size={16} />
              </button>
            ))}
          </div>
          <article className="case-dossier" aria-live="polite">
            <header>
              <span>能力演示 / {activeCase.index}</span>
              <div>{caseIcons[activeCase.icon]}</div>
              <h3>{activeCase.title}</h3>
              <p>{activeCase.summary}</p>
            </header>
            <blockquote>
              <span>任务输入</span>
              <p>{activeCase.request}</p>
            </blockquote>
            <div className="case-execution">
              <span>Agent 执行路径</span>
              {activeCase.sequence.map((step, index) => (
                <div key={step}><i>0{index + 1}</i><p>{step}</p>{index < activeCase.sequence.length - 1 && <ChevronRight size={15} />}</div>
              ))}
            </div>
            <footer>
              <div>
                <span>交付物</span>
                <p>{activeCase.deliverables.map((item) => <strong key={item}>{item}</strong>)}</p>
              </div>
              <div>
                <span>可接入系统</span>
                <p>{activeCase.systems.map((item) => <code key={item}>{item}</code>)}</p>
              </div>
            </footer>
          </article>
        </div>
      </section>

      <section className="capability-model">
        <div className="shell capability-model-layout">
          <div className="capability-model-copy">
            <span className="eyebrow eyebrow-light">An extensible worker</span>
            <h2>能力不设上限，<br />边界由权限和工具定义。</h2>
            <p>Agent 本身会规划和执行；MCP 让它进入企业系统；Skill 让它遵守专业流程；Workflow、定时任务和 Issue 让工作持续发生。</p>
            <Link className="button button-light" to="/capabilities">查看能力组合 <ArrowRight size={17} /></Link>
          </div>
          <div className="capability-model-map" aria-label="Agent 能力组合模型">
            <div className="capability-model-core"><Bot /><span>Agent</span><strong>规划、执行、反思</strong></div>
            <div className="capability-model-node node-tools"><Network /><span>MCP</span><strong>连接企业系统</strong></div>
            <div className="capability-model-node node-rules"><FileCheck2 /><span>Skill</span><strong>加载专业规范</strong></div>
            <div className="capability-model-node node-flow"><Workflow /><span>Workflow</span><strong>编排长任务</strong></div>
            <div className="capability-model-node node-human"><Users /><span>Human</span><strong>授权与验收</strong></div>
            <div className="capability-model-output">
              <span>可以继续扩展</span>
              <p>浏览器 · 终端 · 文件 · 数据库 · 代码仓库 · 云平台 · 企业 API</p>
            </div>
          </div>
        </div>
      </section>

      <section className="product-evidence" id="platform">
        <div className="shell product-evidence-heading">
          <div>
            <span className="eyebrow">Real operating surface</span>
            <h2>强大的能力，必须有<br />看得见的运行与治理。</h2>
          </div>
          <div>
            <p>管理员在同一工作台管理 Agent、模型密钥、项目目录、MCP、Skill、Workflow、客户授权、运行状态和历史产物。</p>
            <Link className="text-link" to="/guide">查看平台使用流程 <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="shell product-stage home-product-stage">
          <div className="stage-toolbar">
            <div className="stage-dots"><i /><i /><i /></div>
            <span>AI Agent / Container Management</span>
            <span className="stage-status"><CircleDot size={14} /> Runtime online</span>
          </div>
          <img
            src="/images/platform-ai-agent.png"
            alt="Agents Platform 的 Agent 容器管理工作台，展示运行状态、模型、项目与管理操作"
          />
          <div className="product-evidence-notes">
            <span><Check size={16} />运行时状态</span>
            <span><Check size={16} />项目级能力</span>
            <span><Check size={16} />客户授权</span>
            <span><Check size={16} />版本与升级</span>
          </div>
        </div>
      </section>

      <section className="customers-section" id="customers">
        <div className="shell customers-heading">
          <span className="eyebrow">Customers we serve</span>
          <h2>服务客户</h2>
          <p>以下企业已进入服务客户名单。具体项目内容与交付数据遵循保密边界，不在官网展开。</p>
        </div>
        <div className="shell customer-ledger">
          {serviceCustomers.map((customer, index) => (
            <article key={customer.name}>
              <span>0{index + 1}</span>
              <small>{customer.city}</small>
              <h3>{customer.name}</h3>
              <strong>企业客户</strong>
            </article>
          ))}
        </div>
        <div className="shell service-principles">
          <div><Server /><strong>私有化部署</strong><span>数据、目录和运行环境由企业掌握。</span></div>
          <div><Route /><strong>场景共同设计</strong><span>从真实任务出发配置 Agent、MCP 与 Skill。</span></div>
          <div><RefreshCcw /><strong>持续升级</strong><span>正式版本、数据库迁移与现场配置边界清晰。</span></div>
        </div>
      </section>

      <section className="release-cta">
        <div className="shell release-cta-inner">
          <div>
            <span className="eyebrow eyebrow-light">Start with real work</span>
            <h2>从一个真实任务开始。</h2>
            <p>当前正式版 {latestRelease.version} · {latestRelease.date}</p>
          </div>
          <div className="release-cta-actions">
            <a className="button button-light" href={getReleaseDownloadUrl(latestRelease)}>
              <CloudDownload size={17} /> 下载 Linux 正式包
            </a>
            <Link className="button button-ghost-light" to="/releases">查看发布记录 <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>
    </main>
  )
}

const guidedDeploySteps = [
  {
    id: '01',
    title: '下载并解压正式包',
    body: '新客户直接安装最新正式版本，不需要逐版安装。把发布目录放在固定位置，并使用可执行 sudo 的普通账号运行。',
    code: `curl -fL -o ${latestRelease.assetName} ${getReleaseDownloadUrl(latestRelease)}\ntar -xzf ${latestRelease.assetName}\ncd devops-${latestRelease.version}\nchmod 755 devops.sh`,
    icon: <PackageCheck />,
  },
  {
    id: '02',
    title: '运行首次安装向导',
    body: '向导先检查再询问。缺少 Java、Docker、MySQL 客户端、Nginx 或基础工具时，只有你确认后才会使用 sudo 和系统包管理器安装。',
    code: './devops.sh install',
    icon: <Sparkles />,
  },
  {
    id: '03',
    title: '按中文问题确认现场配置',
    body: '填写 MySQL、数据目录和站点端口。向导自动生成 SECRET_KEY；本机 MySQL 可自动建库授权，Nginx 只接入已经启用的 include 目录。',
    code: '# 每一步都可以输入 y / n\n# 密码使用隐藏输入，不进入 Shell 历史\n# 已完成的配置可在下次运行时直接保留',
    icon: <KeyRound />,
  },
  {
    id: '04',
    title: '复检并选择是否立即启动',
    body: '向导最后自动执行只读 check。全部必需项通过后，可以直接拉取固定版本镜像并启动，也可以稍后手工启动。',
    code: './devops.sh status\n\n# 选择暂不启动时\n./devops.sh start\n./devops.sh status',
    icon: <Play />,
  },
]

const manualDeploySteps = [
  {
    id: '01',
    title: '确认服务器与访问权限',
    body: '生产环境使用 Linux x64。准备一个可执行 sudo 的账号，并确认服务器可以访问 GitHub、运行时镜像仓库和模型 API。Windows 仅用于开发。',
    code: 'uname -s\nuname -m\njava -version\ndocker version',
    icon: <Server />,
  },
  {
    id: '02',
    title: '下载并解压正式包',
    body: '新客户直接安装最新正式版本，不需要逐版安装。建议解压到固定目录，并让运行账号拥有该目录。',
    code: `curl -fL -o ${latestRelease.assetName} ${getReleaseDownloadUrl(latestRelease)}\ntar -xzf ${latestRelease.assetName}\ncd devops-${latestRelease.version}\nchmod 755 devops.sh`,
    icon: <PackageCheck />,
  },
  {
    id: '03',
    title: '创建 MySQL 数据库与专用账号',
    body: '创建空的 devops 数据库，第一次启动会自动初始化系统结构和基础数据。不要让应用长期使用 root 账号。',
    code: "CREATE DATABASE devops CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\nCREATE USER 'devops_app'@'127.0.0.1' IDENTIFIED BY 'CHANGE_ME_STRONG_PASSWORD';\nGRANT ALL PRIVILEGES ON devops.* TO 'devops_app'@'127.0.0.1';\nFLUSH PRIVILEGES;",
    icon: <Database />,
  },
  {
    id: '04',
    title: '填写 application.properties',
    body: '按相邻中文注释填写 JDBC、数据目录、SECRET_KEY、远程 Agent 地址和可选 Java 路径。真实配置会在升级时保留，密码和 Token 不要写进 Shell 命令历史。',
    code: 'cp application.properties.example application.properties\nchmod 600 application.properties\nopenssl rand -hex 32\nvi application.properties',
    icon: <KeyRound />,
  },
]

function CopyCode({ value }: { value: string }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    await navigator.clipboard.writeText(value)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1600)
  }

  return (
    <div className="code-block">
      <pre><code>{value}</code></pre>
      <button className="icon-button code-copy" type="button" onClick={copy} aria-label="复制命令">
        {copied ? <Check size={17} /> : <Copy size={17} />}
      </button>
    </div>
  )
}

function RouteAnchor({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  const anchorId = to.split('#')[1]
  const scrollToAnchor = () => {
    if (!anchorId) return
    window.setTimeout(() => document.getElementById(anchorId)?.scrollIntoView({ block: 'start', behavior: 'instant' }), 100)
  }

  return <Link className={className} to={to} onClick={scrollToAnchor}>{children}</Link>
}

function DeployPage() {
  const guidedInstallAvailable = latestRelease.guidedInstall
  const deploySteps = guidedInstallAvailable ? guidedDeploySteps : manualDeploySteps

  return (
    <main className="subpage">
      <section className="page-intro">
        <div className="shell page-intro-grid">
          <div>
            <span className="eyebrow">Linux production</span>
            <h1>部署指南</h1>
          </div>
          <p>{guidedInstallAvailable
            ? '面向第一次部署平台的用户。解压后运行一个交互向导，缺少什么就先询问、再自动安装和配置，直到可以启动。'
            : `面向 ${latestRelease.version} 的完整部署说明，从环境准备开始完成数据库、外置配置、Nginx、上线检查和首次登录。`}</p>
        </div>
      </section>

      <section className="guide-section">
        <div className="shell guide-layout">
          <aside className="guide-nav">
            <span>本页目录</span>
            <RouteAnchor to="/deploy#prepare">开始之前</RouteAnchor>
            <RouteAnchor to="/deploy#install">下载与配置</RouteAnchor>
            <RouteAnchor to="/deploy#nginx">接入 Nginx</RouteAnchor>
            <RouteAnchor to="/deploy#preflight">上线预检</RouteAnchor>
            <RouteAnchor to="/deploy#launch">启动与登录</RouteAnchor>
            <RouteAnchor to="/deploy#upgrade">升级与回滚</RouteAnchor>
            <RouteAnchor to="/deploy#diagnosis">故障定位</RouteAnchor>
          </aside>
          <div className="guide-content">
            <section id="prepare" className="guide-block">
              <div className="guide-title">
                <span>Before you begin</span>
                <h2>开始之前</h2>
                <p>{guidedInstallAvailable
                  ? '主应用只部署在 Linux 宿主机。正式包保持轻量，系统依赖由首次安装向导检测，并在你确认后通过发行版包管理器安装。'
                  : `主应用只部署在 Linux 宿主机。${latestRelease.version} 需要先按本页准备 MySQL、Nginx、Docker 和 Java 运行环境。`}</p>
              </div>
              <div className="requirement-list">
                {[
                  ['Linux x64', '生产服务器；运行账号可使用 sudo，安装目录建议位于 /opt。'],
                  ['Java 21+', guidedInstallAvailable ? '缺少时，向导询问后自动安装宿主机运行环境。' : '主服务直接运行在宿主机，可通过 java -version 检查。'],
                  ['MySQL 8', guidedInstallAvailable ? '可使用远程数据库；本机缺少时可自动安装、建库并创建专用账号。' : '提前创建空的 devops 数据库和具有 DDL/DML 权限的专用账号。'],
                  ['Docker Engine', guidedInstallAvailable ? '缺少时可自动安装和启动，并检查当前账号是否具有访问权限。' : '运行 Agent 容器；运行账号必须能执行 docker info 和 docker pull。'],
                  ['Nginx', guidedInstallAvailable ? '缺少时可自动安装；已有配置会保留，只接入平台自己的站点文件。' : '提供后台与客户两个独立入口；未安装和已安装的处理方式见下文。'],
                  ['网络与域名', '服务器可访问镜像仓库和模型服务；准备后台、客户入口的域名或端口。'],
                ].map(([name, description]) => (
                  <div key={name}><strong>{name}</strong><span>{description}</span></div>
                ))}
              </div>
              <div className="callout">
                <FileCheck2 />
                {guidedInstallAvailable ? (
                  <p><strong>不知道环境是否齐全也可以直接开始。</strong> 执行 <code>./devops.sh install</code>，每项自动操作都会先询问。拒绝后不会修改对应系统项，最后仍会给出完整中文检查结果。</p>
                ) : (
                  <p><strong>当前下载的是 {latestRelease.version}。</strong> 请先执行 <code>./devops.sh check</code> 获取只读中文诊断，再按本页手工完成缺失环境；该冻结版本不包含 <code>install</code> 命令。</p>
                )}
              </div>
            </section>

            <section id="install" className="guide-block">
              <div className="guide-title">
                <span>Install</span>
                <h2>{guidedInstallAvailable ? '解压后，只运行一个安装命令' : '下载、数据库与外置配置'}</h2>
                <p>{guidedInstallAvailable
                  ? '默认流程不需要先写 SQL 或编辑 Nginx。向导会收集现场值、隐藏读取密码、先备份再修改，并且可以重复执行。'
                  : `以下步骤与当前 ${latestRelease.version} 发布包一致。密码、路径和域名都要替换为客户现场真实值。`}</p>
              </div>
              <div className="install-steps">
                {deploySteps.map((step) => (
                  <article className="install-step" key={step.id}>
                    <span className="step-number">{step.id}</span>
                    <span className="step-icon">{step.icon}</span>
                    <div>
                      <h3>{step.title}</h3>
                      <p>{step.body}</p>
                      {step.code && <CopyCode value={step.code} />}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section id="nginx" className="guide-block">
              <div className="guide-title">
                <span>Reverse proxy</span>
                <h2>{guidedInstallAvailable ? 'Nginx 自动接入与手工兜底' : '按机器现状接入 Nginx'}</h2>
                <p>{guidedInstallAvailable
                  ? <><code>install</code> 会自动处理常规机器。它不覆盖 nginx.conf，只识别当前 http 上下文已启用的 include 目录；以下路径用于特殊布局或自动安装失败时排查。</>
                  : <>后台与客户工作台是两个独立站点，默认端口为 80 和 8080。二者不能相同，也不能与 Java 的 <code>server.port</code> 冲突。</>}</p>
              </div>
              <div className="guide-facts">
                <div><PanelTop /><strong>后台管理</strong><span>web/ · 管理 Agent、MCP、Issue、客户与授权</span></div>
                <div><Users /><strong>客户工作台</strong><span>client/ · 只访问已经授权的 Agent 与 Issue 项目</span></div>
              </div>
              <div className="nginx-paths">
                <article>
                  <div className="scenario-heading"><span>路径 A</span><h3>机器没有安装 Nginx</h3></div>
                  <p>{guidedInstallAvailable ? '先在向导中同意自动安装。包管理器失败时，保留完整错误输出，再按常见系统手工执行以下命令。' : '先让 check 识别发行版并给出安装命令，也可以按常见系统执行以下命令。'}</p>
                  <CopyCode value={'# Debian / Ubuntu\nsudo apt-get update && sudo apt-get install -y nginx\n\n# RHEL / Rocky / AlmaLinux\nsudo dnf install -y nginx'} />
                  <p>编辑平台自己的 <code>nginx/devops.conf</code>。不要用它覆盖系统 <code>/etc/nginx/nginx.conf</code>，只在现有 <code>http {'{ }'}</code> 中增加一条绝对路径 include。</p>
                  <CopyCode value={'# 写在现有 /etc/nginx/nginx.conf 的 http { } 内\ninclude /opt/devops/nginx/devops.conf;\n\nsudo nginx -t\nsudo systemctl enable --now nginx\nsudo systemctl reload nginx'} />
                </article>
                <article>
                  <div className="scenario-heading"><span>路径 B</span><h3>机器已经有 Nginx</h3></div>
                  <p>保留现有主配置、证书和其他业务站点。先查看生效配置与端口，再决定使用直接 include 或已有的 <code>conf.d/sites-enabled</code> 目录。</p>
                  <CopyCode value={'sudo nginx -T\nsudo ss -ltnp\n\n# 编辑平台配置，不修改已有业务站点\nvi /opt/devops/nginx/devops.conf'} />
                  <p>只有 <code>sudo nginx -T</code> 确认某个目录已经被 include 时，才能把平台配置链接进去。若 80/8080 已占用，修改平台两个 <code>listen</code>，不要停止不明服务。</p>
                  <CopyCode value={'sudo ln -s /opt/devops/nginx/devops.conf /etc/nginx/conf.d/agents-platform.conf\nsudo nginx -t && sudo systemctl reload nginx\nsudo nginx -T'} />
                </article>
              </div>
              <div className="callout">
                <ShieldCheck />
                <p><strong>现场配置不会被升级覆盖。</strong> 实际使用的 <code>nginx/devops.conf</code> 和 <code>application.properties</code> 始终保留；新模板只写入 <code>.example</code>。首次接入和后续升级都不要覆盖系统主配置。</p>
              </div>
            </section>

            <section id="preflight" className="guide-block">
              <div className="guide-title">
                <span>Preflight</span>
                <h2>执行中文上线预检</h2>
                <p>{guidedInstallAvailable
                  ? <><code>install</code> 结束前会自动运行一次。也可以随时单独执行；独立 <code>check</code> 始终只读，不安装软件、不改配置、不拉镜像。</>
                  : <>在启动前运行检查，逐项处理所有“失败”。<code>check</code> 始终只读，不安装软件、不改配置、不拉镜像。</>}</p>
              </div>
              <CopyCode value={'./devops.sh check'} />
              <div className="check-matrix">
                {[
                  ['Nginx程序', '未安装', '按输出中的 apt/dnf/yum/zypper/apk 命令安装。'],
                  ['Nginx配置', '语法错误', '执行 sudo nginx -t，根据准确文件和行号修复。'],
                  ['Nginx站点接入', '未加载平台配置', '在现有 http { } 中 include；不要覆盖 nginx.conf。'],
                  ['Nginx监听端口', '端口冲突', '用 sudo ss -ltnp 查归属，修改平台 listen 或 Java 端口。'],
                  ['Nginx监听端口', '由 Nginx 占用', '正常，说明当前 Nginx 已在监听该端口。'],
                ].map(([name, state, action]) => (
                  <div key={`${name}-${state}`}><strong>{name}</strong><span>{state}</span><p>{action}</p></div>
                ))}
              </div>
            </section>

            <section id="launch" className="guide-block">
              <div className="guide-title">
                <span>Launch</span>
                <h2>启动、验证与首次登录</h2>
                <p>第一次启动会自动准备所需 Agent 运行环境，并初始化空数据库。下载时间取决于服务器网络。</p>
              </div>
              <CopyCode value={'./devops.sh start\n./devops.sh status\n\n# 如果启动失败\n./devops.sh logs\n./devops.sh foreground'} />
              <div className="first-login-strip">
                <div><span>后台地址</span><strong>http://&lt;后台域名或 IP&gt;:&lt;后台端口&gt;/</strong></div>
                <div><span>首次账号</span><strong>admin</strong></div>
                <div><span>初始密码</span><strong>111111</strong></div>
              </div>
              <div className="warning-callout">
                <ShieldCheck />
                <p><strong>先改密码，再开放公网。</strong> 只从受控管理网络首次登录，在“个人信息 → 修改密码”中设置客户专用强密码。客户工作台地址使用另一个 Nginx 站点端口。</p>
              </div>
            </section>

            <section id="upgrade" className="guide-block">
              <div className="guide-title">
                <span>Upgrade</span>
                <h2>累计升级与回滚</h2>
                <p>正式包支持历史版本累计升级。现存客户均已升级到 v0.0.7，可直接在线检查、下载并升级。</p>
              </div>
              <div className="launcher-transition">
                <div className="launcher-transition__copy">
                  <span>Launcher v1 · introduced in v0.0.7</span>
                  <h3>v0.0.7 及之后直接在线升级</h3>
                  <p>进入现有安装目录先执行只读检查，确认目标版本、配置差异和运行时镜像均可用后，再执行正式升级。现场配置、Nginx 和运行数据不会被覆盖。</p>
                </div>
                <CopyCode value={'./devops.sh launcher-version\n./devops.sh update --check\n./devops.sh update'} />
              </div>
              <CopyCode value={`./devops.sh upgrade --check /tmp/${latestRelease.assetName}\n./devops.sh stop\n./devops.sh upgrade /tmp/${latestRelease.assetName}\ndiff -u nginx/devops.conf nginx/devops.conf.example\n./devops.sh check\n./devops.sh start\n./devops.sh status`} />
              <div className="warning-callout">
                <RefreshCcw />
                <p><strong>程序回滚不等于数据库回滚。</strong> 升级前必须备份 MySQL 和现场配置。若新迁移与旧程序不兼容，回滚程序时必须同时恢复数据库与对应配置。</p>
              </div>
            </section>

            <section id="diagnosis" className="guide-block">
              <div className="guide-title">
                <span>Diagnostics</span>
                <h2>常用命令</h2>
              </div>
              <div className="command-table">
                {[
                  ['./devops.sh check', '完整上线预检；按失败项给出中文修复指引。'],
                  ...(guidedInstallAvailable ? [['./devops.sh install', '可重复运行的首次安装向导；每项系统修改都先询问。']] : []),
                  ['./devops.sh status', '显示版本、PID、端口归属与健康状态。'],
                  ['./devops.sh logs', '持续查看配置的应用日志。'],
                  ['./devops.sh foreground', '前台运行 Java，直接观察启动错误。'],
                  ['sudo nginx -T', '查看 Nginx 最终生效配置，确认平台站点确实被 include。'],
                  ['sudo ss -ltnp', '查看监听端口、PID 和进程归属，不要盲目停止未知服务。'],
                  ['./devops.sh -h', '查看完整中文命令、升级策略与故障处理。'],
                ].map(([command, description]) => (
                  <div key={command}><code>{command}</code><span>{description}</span></div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

function GuidePage() {
  return (
    <main className="subpage">
      <section className="page-intro">
        <div className="shell page-intro-grid">
          <div>
            <span className="eyebrow">Product guide</span>
            <h1>使用指南</h1>
          </div>
          <p>完成部署后，从首次安全设置开始，配置模型、创建 Agent、组合 MCP 与 Skill，并把能力授权给客户和 Issue 项目。</p>
        </div>
      </section>

      <section className="guide-section">
        <div className="shell guide-layout">
          <aside className="guide-nav">
            <span>本页目录</span>
            <RouteAnchor to="/guide#first-login">首次设置</RouteAnchor>
            <RouteAnchor to="/guide#api-key">模型 API Key</RouteAnchor>
            <RouteAnchor to="/guide#agent">创建 Agent</RouteAnchor>
            <RouteAnchor to="/guide#mcp-skill">MCP 与 Skill</RouteAnchor>
            <RouteAnchor to="/guide#authorization">客户授权</RouteAnchor>
            <RouteAnchor to="/guide#issue-workflow">Issue 工作流</RouteAnchor>
            <RouteAnchor to="/guide#sessions">会话与产物</RouteAnchor>
          </aside>
          <div className="guide-content">
            <section id="first-login" className="guide-block">
              <div className="guide-title">
                <span>First run</span>
                <h2>首次登录后的安全设置</h2>
                <p>首次管理员账号只用于初始化。修改密码后再创建客户、客户组和日常管理员账号，避免多人共享 admin。</p>
              </div>
              <ol className="workflow-list">
                <li><span>1</span><div><strong>立即修改初始密码</strong><p>进入“个人信息 → 修改密码”，设置客户专用强密码，不把初始密码留在交付工单中。</p></div></li>
                <li><span>2</span><div><strong>创建日常管理员与角色</strong><p>按职责分配菜单和操作权限，保留最小必要权限。</p></div></li>
                <li><span>3</span><div><strong>创建客户与客户组</strong><p>客户工作台与后台入口分离；后续 Agent 和 Issue 可以授权到用户或组。</p></div></li>
              </ol>
            </section>

            <section id="api-key" className="guide-block">
              <div className="guide-title">
                <span>Model access</span>
                <h2>配置模型 API Key</h2>
                <p>先在 AI Agent 的 API Key 管理中录入有效凭据，再创建 Agent。Key 可独立维护、切换并绑定不同模型，不需要重建 Agent。</p>
              </div>
              <div className="guide-grid">
                <article><span><KeyRound /></span><h3>录入凭据</h3><p>填写供应商、API Key、可用模型和默认模型。真实密钥由服务端加密保存，不展示完整明文。</p></article>
                <article><span><RefreshCcw /></span><h3>切换与验证</h3><p>在后台 Agent 或客户授权实例中切换 Key，发送一条最小对话确认模型、额度和网络均可用。</p></article>
              </div>
            </section>

            <section id="agent" className="guide-block">
              <div className="guide-title">
                <span>Agent</span>
                <h2>创建并验证专业 Agent</h2>
                <p>同一种内置 Agent 可以创建多个独立实例。每个实例都有自己的镜像、项目工作区、API Key、MCP、Skill、会话和产物。</p>
              </div>
              <div className="guide-grid">
                {[
                  [<Boxes />, '选择内置工程', '按任务选择通用、视频、PPT、Grafana 或 Issue Resolution Agent，填写唯一名称。'],
                  [<KeyRound />, '绑定 API Key', '选择已经验证的 Key 与默认模型；需要时可在管理页切换。'],
                  [<Play />, '启动并检查状态', '创建后等待容器或远程节点就绪。异常状态可打开详情查看具体错误。'],
                  [<MessageSquareText />, '完成最小验收', '发送一条与该 Agent 能力匹配的任务，确认回答、工具调用和产物都能正常返回。'],
                ].map(([icon, title, text]) => (
                  <article key={String(title)}><span>{icon}</span><h3>{title}</h3><p>{text}</p></article>
                ))}
              </div>
            </section>

            <section id="mcp-skill" className="guide-block">
              <div className="guide-title">
                <span>Tools and rules</span>
                <h2>按项目组合 MCP 与 Skill</h2>
                <p>MCP 提供外部系统工具，Skill 规定处理流程。先选目标 Agent 项目，再安装和填写现场参数。</p>
              </div>
              <ol className="workflow-list">
                <li><span>1</span><div><strong>选择目标项目</strong><p>同一 Agent 下可能有多个项目，添加 MCP 前必须明确安装到哪个项目。</p></div></li>
                <li><span>2</span><div><strong>自定义 Server 名称</strong><p>同一个 MCP 可以添加多次，例如分别连接测试和生产 Grafana；每个 Server 名称必须唯一。</p></div></li>
                <li><span>3</span><div><strong>填写必填环境变量</strong><p>数据库地址、Token、项目标识等没有虚假的默认值。非必填项才使用产品默认值。</p></div></li>
                <li><span>4</span><div><strong>安装 Skill 并实测工具</strong><p>安装与业务匹配的 Skill，重新打开会话后让 Agent 执行只读查询，确认连接和权限范围正确。</p></div></li>
              </ol>
            </section>

            <section id="authorization" className="guide-block">
              <div className="guide-title">
                <span>Delivery</span>
                <h2>授权给客户用户或组</h2>
                <p>授权决定客户工作台能看到什么。组内成员共享已授权 Agent 和项目会话，未授权资源保持不可见。</p>
              </div>
              <div className="guide-facts">
                <div><Users /><strong>按用户授权</strong><span>适合少量固定人员或需要单独隔离的 Agent 与 Issue 项目。</span></div>
                <div><Network /><strong>按组授权</strong><span>适合团队共用；新增组成员后自动继承该组已有访问权。</span></div>
              </div>
              <div className="callout"><ShieldCheck /><p><strong>授权后要用客户账号回归。</strong> 在客户工作台确认 Agent、共享会话和 Issue 可见，同时验证未授权资源确实不可访问。</p></div>
            </section>

            <section id="issue-workflow" className="guide-block">
              <div className="guide-title">
                <span>Issue loop</span>
                <h2>让 Agent 连续处理 Issue</h2>
                <p>把项目级 DevOps Issue MCP 和 issue-resolution Skill 安装到 Agent 后，形成从领取、澄清、处理到人工验收的闭环。</p>
              </div>
              <ol className="workflow-list">
                <li><span>1</span><div><strong>创建项目并取得令牌</strong><p>在 Issue 管理中创建项目，复制项目标识与令牌；令牌可在项目管理中再次复制或轮换。</p></div></li>
                <li><span>2</span><div><strong>添加 DevOps Issue MCP</strong><p>选择 Agent 项目，填写平台地址、项目标识和令牌，并设置唯一 Server 名称。</p></div></li>
                <li><span>3</span><div><strong>安装 issue-resolution Skill</strong><p>Agent 按优先级降序、创建时间正序领取“待 AI 处理”的 Issue，一次只处理一条。</p></div></li>
                <li><span>4</span><div><strong>澄清或交付</strong><p>信息不足时评论并转为“待用户澄清”；完成后转为“AI 处理完毕”，最终由用户验证并关闭。</p></div></li>
              </ol>
            </section>

            <section id="sessions" className="guide-block">
              <div className="guide-title">
                <span>Daily work</span>
                <h2>会话、任务与产物</h2>
                <p>会话用于持续协作，任务记录后台执行过程，产物保存 Agent 生成的文件。不要只根据聊天气泡判断任务是否完成。</p>
              </div>
              <div className="command-table">
                {[
                  ['上下文与压缩', '关注上下文比例；接近上限时主动压缩，再继续长任务。'],
                  ['任务状态', '任务仍在执行时等待完成；异常时打开详情查看运行错误和工具输出。'],
                  ['历史产物', '从产物列表访问本次及历史文件，下载后完成实际验收。'],
                  ['附件发送', '发送完成后输入区应清空；敏感附件只上传到明确授权的项目。'],
                ].map(([name, description]) => <div key={name}><code>{name}</code><span>{description}</span></div>)}
              </div>
              <div className="guide-next"><span>还没有完成安装？</span><Link to="/deploy">前往部署指南 <ArrowRight size={16} /></Link></div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

function CapabilitiesPage() {
  const [activeCategory, setActiveCategory] = useState<BuiltinMcp['category'] | 'all'>('all')
  const visibleMcps = activeCategory === 'all'
    ? builtinMcps
    : builtinMcps.filter((item) => item.category === activeCategory)
  const agentIcons: Record<string, ReactNode> = {
    default: <Code2 />,
    'ai-video': <Play />,
    'ai-ppt': <PanelTop />,
    'grafana-dashboard': <Database />,
    'issue-resolution': <MessageSquareText />,
  }
  const categoryIcons: Record<BuiltinMcp['category'], ReactNode> = {
    scm: <GitBranch />,
    artifact: <PackageCheck />,
    data: <Database />,
    infrastructure: <Server />,
    quality: <ShieldCheck />,
    observability: <PanelTop />,
    collaboration: <MessageSquareText />,
  }

  return (
    <main className="subpage capability-page">
      <section className="capability-hero">
        <div className="shell capability-hero-grid">
          <div>
            <span className="eyebrow">Built in, ready for work</span>
            <h1>开箱即用的企业 Agent 能力</h1>
            <p>平台交付的不是一个空白聊天框。专业 Agent 已经带着工程、规则和产物链路；MCP 把它们接入企业现有系统。</p>
            <div className="capability-hero-actions">
              <Link className="button button-primary" to="/deploy">部署平台 <ArrowRight size={17} /></Link>
              <Link className="button button-secondary" to="/guide">查看使用流程</Link>
            </div>
          </div>
          <div className="capability-hero-metrics" aria-label="内置能力规模">
            <div><strong>05</strong><span>专业 Agent 工程</span></div>
            <div><strong>18</strong><span>内置 JavaScript MCP</span></div>
            <div><strong>07</strong><span>企业系统类别</span></div>
            <div><strong>01</strong><span>统一治理工作台</span></div>
          </div>
        </div>
      </section>

      <section className="agent-catalog-section">
        <div className="shell section-heading two-column-heading">
          <div>
            <span className="eyebrow">Professional agents</span>
            <h2>选择一个角色，<br />直接开始交付。</h2>
          </div>
          <p>每个 Agent 都基于同一受控运行时构建，但拥有独立工程、规则、工具链和验收标准。同一种 Agent 可以创建多个隔离实例。</p>
        </div>
        <div className="shell agent-catalog-list">
          {builtinAgents.map((agent, index) => (
            <article className="agent-catalog-row" key={agent.code}>
              <div className="agent-catalog-identity">
                <span className="agent-catalog-index">0{index + 1}</span>
                <span className="agent-catalog-icon">{agentIcons[agent.code]}</span>
                <div><small>{agent.category}</small><h3>{agent.name}</h3></div>
              </div>
              <div className="agent-catalog-description">
                <p>{agent.summary}</p>
                <div className="agent-catalog-io">
                  <span><b>输入</b>{agent.input}</span>
                  <span><b>交付</b>{agent.output}</span>
                  <span><b>适合</b>{agent.audience}</span>
                </div>
              </div>
              <div className="agent-catalog-tags">
                {agent.capabilities.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mcp-catalog-section">
        <div className="shell section-heading two-column-heading">
          <div>
            <span className="eyebrow">Enterprise connectors</span>
            <h2>把 Agent 接进<br />正在运行的企业系统。</h2>
          </div>
          <p>所有内置 MCP 都是可直接安装的 JavaScript npm 工程。必填连接参数没有虚假默认值，同一个 MCP 可以多次配置并连接不同项目或环境。</p>
        </div>
        <div className="shell mcp-filter" role="tablist" aria-label="MCP 分类">
          <button type="button" className={activeCategory === 'all' ? 'is-active' : ''} onClick={() => setActiveCategory('all')}>全部 <span>{builtinMcps.length}</span></button>
          {(Object.entries(mcpCategoryLabels) as [BuiltinMcp['category'], string][]).map(([key, label]) => (
            <button key={key} type="button" className={activeCategory === key ? 'is-active' : ''} onClick={() => setActiveCategory(key)}>
              {label} <span>{builtinMcps.filter((item) => item.category === key).length}</span>
            </button>
          ))}
        </div>
        <div className="shell mcp-catalog-grid">
          {visibleMcps.map((mcp) => (
            <article className="mcp-catalog-item" key={mcp.code}>
              <div className="mcp-catalog-head">
                <span>{categoryIcons[mcp.category]}</span>
                <div><small>{mcpCategoryLabels[mcp.category]}</small><h3>{mcp.name}</h3></div>
                <code>{mcp.code}</code>
              </div>
              <p>{mcp.description}</p>
              <div className="mcp-capability-list">
                {mcp.capabilities.map((item) => <span key={item}>{item}</span>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="enterprise-scenarios-section">
        <div className="shell enterprise-scenarios-layout">
          <div className="enterprise-scenarios-copy">
            <span className="eyebrow eyebrow-light">Composable outcomes</span>
            <h2>不是 18 个孤立工具，<br />而是可组合的业务链路。</h2>
            <p>把专业 Agent、MCP、Skill、Workflow 和权限组合起来，企业可以从一个小场景开始，再逐步扩展到跨系统流程。</p>
          </div>
          <div className="enterprise-scenario-list">
            {enterpriseScenarios.map((scenario) => (
              <article key={scenario.index}>
                <span>{scenario.index}</span>
                <div><h3>{scenario.title}</h3><code>{scenario.path}</code><p>{scenario.description}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="capability-final-cta">
        <div className="shell">
          <div><span className="eyebrow">Start with one workflow</span><h2>先交付一个能验收的 Agent，<br />再把能力复制给更多团队。</h2></div>
          <div><p>下载当前 Linux 正式包，按部署指南完成安装。所需 Agent 运行环境会在安装过程中自动准备。</p><Link className="button button-primary" to="/deploy">查看完整部署流程 <ArrowRight size={17} /></Link></div>
        </div>
      </section>
    </main>
  )
}

function ReleasesPage() {
  return (
    <main className="subpage releases-page">
      <section className="page-intro release-intro">
        <div className="shell page-intro-grid">
          <div>
            <span className="eyebrow">Changelog</span>
            <h1>版本与下载</h1>
          </div>
          <div>
            <p>每个正式版本均可用于全新安装，也支持历史客户累计升级。版本记录清晰，方便确认当前版本与更新内容。</p>
            <a className="text-link" href={`${repositoryUrl}/releases`} target="_blank" rel="noreferrer">打开 GitHub Releases <ExternalLink size={16} /></a>
          </div>
        </div>
      </section>

      <section className="latest-release-band">
        <div className="shell latest-release-grid">
          <div>
            <div className="release-kicker release-kicker-dark"><span className="live-dot" />Latest stable</div>
            <h2>{latestRelease.version}</h2>
            <p>{latestRelease.title}</p>
          </div>
          <div className="latest-summary">
            <p>{latestRelease.summary}</p>
            <div className="latest-metrics">
              {latestRelease.metrics.map((metric) => <span key={metric}>{metric}</span>)}
            </div>
          </div>
          <div className="latest-actions">
            <a className="button button-light" href={getReleaseDownloadUrl(latestRelease)}><CloudDownload size={17} /> 下载 Linux 包</a>
            <a className="button button-ghost-light" href={getReleasePageUrl(latestRelease.version)} target="_blank" rel="noreferrer">查看更新说明 <ExternalLink size={16} /></a>
          </div>
        </div>
      </section>

      <section className="release-history">
        <div className="shell">
          <div className="launcher-transition launcher-transition--release">
            <div className="launcher-transition__copy">
              <span>Compatibility notice</span>
              <h3>v0.0.7 是当前最低保留版本</h3>
              <p>已部署 <code>v0.0.7</code> 的客户可直接使用 <code>./devops.sh update</code> 自动检查、下载和累计升级；官网与 GitHub 不再提供更早版本。</p>
            </div>
            <CopyCode value={'./devops.sh update --check\n./devops.sh update'} />
          </div>
          <div className="history-heading"><span>版本</span><span>正式发布记录</span><span>下载</span></div>
          {releases.map((release, index) => (
            <article className="release-row" key={release.version}>
              <div className="release-version">
                <strong>{release.version}</strong>
                <span>{release.date}</span>
                {index === 0 && <em>Current</em>}
              </div>
              <div className="release-detail">
                <h2>{release.title}</h2>
                <p>{release.summary}</p>
                <ul>
                  {release.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}
                </ul>
                <div className="release-metrics">
                  {release.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                </div>
              </div>
              <div className="release-links">
                {release.status === 'stable' ? (
                  <>
                    <a className="icon-link" href={getReleaseDownloadUrl(release)} aria-label={`下载 ${release.version}`} title={`下载 ${release.version}`}>
                      <CloudDownload size={19} />
                    </a>
                    <a className="icon-link" href={getReleasePageUrl(release.version)} target="_blank" rel="noreferrer" aria-label={`查看 ${release.version} 发布说明`} title="查看发布说明">
                      <ExternalLink size={18} />
                    </a>
                  </>
                ) : (
                  <span className="archive-label">Archive</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="release-policy">
        <div className="shell policy-grid">
          <div><GitBranch /><h3>版本记录清晰</h3><p>每个正式版本保留独立的更新说明和下载记录。</p></div>
          <div><Database /><h3>支持累计升级</h3><p>新客户可以直接安装，老客户可以跨版本升级。</p></div>
          <div><ShieldCheck /><h3>现场配置保留</h3><p>升级时保留已经配置的端口、目录和站点参数。</p></div>
        </div>
      </section>
    </main>
  )
}

function NotFoundPage() {
  return (
    <main className="not-found">
      <span>404</span>
      <h1>页面不存在</h1>
      <Link className="button button-primary" to="/">返回平台首页</Link>
    </main>
  )
}

function ScrollToTop() {
  useEffect(() => {
    let scrollTimer: number | undefined
    const scrollForCurrentRoute = () => {
      if (scrollTimer !== undefined) window.clearTimeout(scrollTimer)
      const anchorId = window.location.hash.match(/^#\/[^#]*#(.+)$/)?.[1]
      if (!anchorId) {
        window.scrollTo({ top: 0, behavior: 'instant' })
        return
      }
      scrollTimer = window.setTimeout(() => {
        document.getElementById(decodeURIComponent(anchorId))?.scrollIntoView({ block: 'start', behavior: 'instant' })
      }, 80)
    }

    window.addEventListener('hashchange', scrollForCurrentRoute)
    scrollForCurrentRoute()
    return () => {
      window.removeEventListener('hashchange', scrollForCurrentRoute)
      if (scrollTimer !== undefined) window.clearTimeout(scrollTimer)
    }
  }, [])

  return null
}

export default function App() {
  return (
    <div className="site-root">
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <RouterRoute path="/" element={<HomePage />} />
        <RouterRoute path="/capabilities" element={<CapabilitiesPage />} />
        <RouterRoute path="/deploy" element={<DeployPage />} />
        <RouterRoute path="/guide" element={<GuidePage />} />
        <RouterRoute path="/releases" element={<ReleasesPage />} />
        <RouterRoute path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </div>
  )
}
