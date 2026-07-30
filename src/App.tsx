import { useEffect, useState } from 'react'
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
  getReleaseDownloadUrl,
  getReleasePageUrl,
  latestRelease,
  releases,
  repositoryUrl,
} from './content/releases'

const navItems = [
  { to: '/', label: '平台' },
  { to: '/guide', label: '使用指南' },
  { to: '/releases', label: '版本与下载' },
]

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
          <p>让 Agent、工具、流程与业务问题在同一套可交付系统中工作。</p>
        </div>
        <div className="footer-links">
          <span>产品</span>
          <Link to="/guide">部署指南</Link>
          <Link to="/releases">版本下载</Link>
        </div>
        <div className="footer-links">
          <span>仓库</span>
          <a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a>
          <a href={`${repositoryUrl}/issues`} target="_blank" rel="noreferrer">提交问题</a>
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
  const capabilityRows = [
    {
      icon: <Bot />,
      index: '01',
      title: 'Agent 工程化交付',
      body: '通用、视频、PPT、Grafana 与 Issue Agent 以固定版本镜像交付，同一种 Agent 可创建多个隔离实例。',
      tags: ['Docker Agent', '远程 Agent', '工作区持久化'],
    },
    {
      icon: <Network />,
      index: '02',
      title: 'MCP 与 Skill 能力层',
      body: '内置 MCP 只读维护，实例按项目配置。必填值不设假默认值，密钥加密保存并注入运行环境。',
      tags: ['17+ MCP', '项目级实例', '离线制品'],
    },
    {
      icon: <Workflow />,
      index: '03',
      title: 'Workflow 与上下文',
      body: '会话、任务、产物、上下文压缩和动态 Workflow 统一进入可追踪的执行链路。',
      tags: ['SSE / WebSocket', '会话持久化', '运行中心'],
    },
    {
      icon: <MessageSquareText />,
      index: '04',
      title: 'Issue 驱动协作',
      body: '人提交需求与附件，Agent 串行领取、澄清和处理，最终由用户验证关闭，完整保留评论和状态轨迹。',
      tags: ['父子 Issue', 'AI 状态机', '客户授权'],
    },
  ]

  return (
    <main>
      <section className="hero">
        <div className="hero-product-image" aria-hidden="true" />
        <div className="hero-shade" aria-hidden="true" />
        <div className="shell hero-inner">
          <div className="hero-copy">
            <div className="release-kicker">
              <span className="live-dot" />
              最新正式版 {latestRelease.version}
              <span className="kicker-divider" />
              Linux
            </div>
            <h1>Agents Platform</h1>
            <p className="hero-lead">
              面向企业交付的 AI Agent 工程与协作平台。把 Agent、MCP、Skill、Workflow、Issue 和客户授权放进一套可部署、可升级、可审计的系统。
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/guide">
                开始使用 <ArrowRight size={17} />
              </Link>
              <a className="button button-secondary" href={getReleaseDownloadUrl(latestRelease)}>
                <CloudDownload size={17} /> 下载 {latestRelease.version}
              </a>
            </div>
            <div className="hero-meta">
              <span><ShieldCheck size={16} /> 累计升级</span>
              <span><PackageCheck size={16} /> 离线交付</span>
              <span><Server size={16} /> Java 21 + Docker</span>
            </div>
          </div>
          <button
            className="scroll-cue"
            type="button"
            aria-label="继续浏览"
            onClick={() => document.getElementById('platform')?.scrollIntoView()}
          >
            <span>Explore platform</span>
            <ArrowDown size={17} />
          </button>
        </div>
      </section>

      <section className="platform-band" id="platform">
        <div className="shell section-heading two-column-heading">
          <div>
            <span className="eyebrow">One operating surface</span>
            <h2>不是聊天窗口，<br />是一套运行系统。</h2>
          </div>
          <div className="section-intro">
            <p>平台负责 Agent 的创建、运行、升级与授权，也负责把真实业务问题组织成 Agent 可以持续处理的工作队列。</p>
            <Link className="text-link" to="/guide">查看部署与使用流程 <ArrowRight size={16} /></Link>
          </div>
        </div>

        <div className="shell product-stage">
          <div className="stage-toolbar">
            <div className="stage-dots"><i /><i /><i /></div>
            <span>AI Agent / Container Management</span>
            <span className="stage-status"><CircleDot size={14} /> Runtime online</span>
          </div>
          <img
            src="/images/platform-ai-agent.png"
            alt="Agents Platform 的 Agent 容器管理工作台，展示运行状态、版本、模型与管理操作"
          />
        </div>
      </section>

      <section className="capabilities-section">
        <div className="shell">
          <div className="section-heading compact-heading">
            <span className="eyebrow">Built for real work</span>
            <h2>从能力到业务结果，链路完整。</h2>
          </div>
          <div className="capability-list">
            {capabilityRows.map((item) => (
              <article className="capability-row" key={item.index}>
                <span className="capability-index">{item.index}</span>
                <span className="capability-icon">{item.icon}</span>
                <div className="capability-copy">
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
                <div className="capability-tags">
                  {item.tags.map((tag) => <span key={tag}>{tag}</span>)}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="flow-section">
        <div className="shell flow-layout">
          <div className="flow-copy">
            <span className="eyebrow">Human in the loop</span>
            <h2>AI 负责处理，<br />人负责验收。</h2>
            <p>Issue 进入待 AI 队列后，Agent 按优先级和时间顺序一次领取一条。信息不足就发起澄清，处理完成交回用户验证，用户才拥有最终关闭权。</p>
            <Link className="button button-secondary" to="/guide#issue-workflow">查看 Issue 工作流 <ArrowRight size={17} /></Link>
          </div>
          <div className="flow-rail" aria-label="Issue AI 处理流程">
            {[
              ['01', '待 AI 处理', '进入项目队列'],
              ['02', 'AI 处理中', '原子领取单条'],
              ['03', '待用户澄清', '评论补充后自动回队'],
              ['04', 'AI 处理完毕', '提交结果与验证证据'],
              ['05', '已关闭', '用户验收后关闭'],
            ].map(([number, title, description], index) => (
              <div className="flow-step" key={number}>
                <span>{number}</span>
                <div><strong>{title}</strong><small>{description}</small></div>
                {index < 4 && <ChevronRight size={18} />}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="release-cta">
        <div className="shell release-cta-inner">
          <div>
            <span className="eyebrow eyebrow-light">Current release</span>
            <h2>{latestRelease.version}</h2>
            <p>{latestRelease.title} · {latestRelease.date}</p>
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

const installSteps = [
  {
    id: '01',
    title: '准备 Linux 运行环境',
    body: '准备 Java 21+、MySQL 8、Docker Engine、Docker CLI 和 Nginx。在 MySQL 中创建空的 devops 数据库和具有该库 DDL/DML 权限的专用账号。',
    icon: <Server />,
  },
  {
    id: '02',
    title: '下载并解压正式包',
    body: '每个正式包既是完整安装包，也是累计升级包。新客户直接安装目标版本，不需要先安装历史版本。',
    code: `tar -xzf ${latestRelease.assetName}\ncd devops-${latestRelease.version}`,
    icon: <PackageCheck />,
  },
  {
    id: '03',
    title: '填写外置配置',
    body: '编辑 application.properties，配置 MySQL、绝对数据目录、SECRET_KEY、远程 Agent 公网地址和可选 Java 路径。真实密钥不要通过命令参数写入。',
    code: 'cp application.properties.example application.properties\nchmod 600 application.properties',
    icon: <KeyRound />,
  },
  {
    id: '04',
    title: '执行中文上线预检',
    body: 'check 会检查操作系统、Java、配置、目录、MySQL、Docker、离线镜像、Nginx 和端口归属。失败项会给出具体修改位置和处理命令。',
    code: './devops.sh check',
    icon: <FileCheck2 />,
  },
  {
    id: '05',
    title: '启动并确认健康',
    body: '首次启动会自动导入缺失的固定版本 Agent 镜像，Flyway 自动初始化或升级数据库。确认服务为 UP 后再配置 Nginx。',
    code: './devops.sh start\n./devops.sh status',
    icon: <Play />,
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

function GuidePage() {
  return (
    <main className="subpage">
      <section className="page-intro">
        <div className="shell page-intro-grid">
          <div>
            <span className="eyebrow">Documentation</span>
            <h1>部署与使用指南</h1>
          </div>
          <p>从一台干净的 Linux 服务器开始，完成主服务、双前端、数据库和 Agent 运行时的正式部署。所有正式版本都支持累计升级。</p>
        </div>
      </section>

      <section className="guide-section">
        <div className="shell guide-layout">
          <aside className="guide-nav">
            <span>本页目录</span>
            <a href="#/guide#install">首次安装</a>
            <a href="#/guide#nginx">Nginx 与双端</a>
            <a href="#/guide#agent">创建 Agent</a>
            <a href="#/guide#issue-workflow">Issue 工作流</a>
            <a href="#/guide#upgrade">版本升级</a>
            <a href="#/guide#diagnosis">诊断命令</a>
          </aside>
          <div className="guide-content">
            <section id="install" className="guide-block">
              <div className="guide-title">
                <span>Install</span>
                <h2>首次安装</h2>
                <p>生产环境只支持 Linux。Windows 是开发和构建环境，不是客户部署平台。</p>
              </div>
              <div className="install-steps">
                {installSteps.map((step) => (
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
                <span>Access</span>
                <h2>Nginx 与双端入口</h2>
                <p>后台和客户工作台是两个独立站点，必须使用不同端口。默认后台为 80，客户工作台为 8080。</p>
              </div>
              <div className="guide-facts">
                <div><PanelTop /><strong>后台管理</strong><span>web/ · 管理 Agent、MCP、Issue 与客户授权</span></div>
                <div><Users /><strong>客户工作台</strong><span>client/ · 只访问已授权 Agent 与 Issue 项目</span></div>
              </div>
              <div className="callout">
                <ShieldCheck />
                <p><strong>现场配置不会被升级覆盖。</strong> 实际使用的 <code>nginx/devops.conf</code> 和 <code>application.properties</code> 始终保留；新模板写入 <code>.example</code>，由运维按差异合并。</p>
              </div>
            </section>

            <section id="agent" className="guide-block">
              <div className="guide-title">
                <span>Operate</span>
                <h2>创建并交付 Agent</h2>
              </div>
              <div className="guide-grid">
                {[
                  [<Boxes />, '选择内置 Agent', '从通用、视频、PPT、Grafana 或 Issue Resolution Agent 中选择。同一类型可以创建多个实例。'],
                  [<KeyRound />, '绑定 API Key', 'API Key 独立管理，可在平台 Agent 或客户授权实例间切换；模型范围和默认模型随 Key 配置。'],
                  [<Network />, '配置 MCP', '选择目标项目、自定义 Server 名称并填写环境变量。同一 MCP 可按不同 Server 名称添加多次。'],
                  [<Users />, '授权客户', '按客户账号或客户组授权。组成员动态继承访问权，共享项目中的对话对组内成员可见。'],
                ].map(([icon, title, text]) => (
                  <article key={String(title)}>
                    <span>{icon}</span>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </article>
                ))}
              </div>
            </section>

            <section id="issue-workflow" className="guide-block">
              <div className="guide-title">
                <span>Issue loop</span>
                <h2>让 Agent 连续处理 Issue</h2>
                <p>把项目级 DevOps Issue MCP 和 issue-resolution Skill 安装到 Agent 后，即可形成持续工作队列。</p>
              </div>
              <ol className="workflow-list">
                <li><span>1</span><div><strong>创建项目并取得令牌</strong><p>在 Issue 管理中创建项目，复制项目标识与令牌；令牌可在项目管理中再次获取或轮换。</p></div></li>
                <li><span>2</span><div><strong>给 Agent 添加 DevOps Issue MCP</strong><p>选择 Agent 项目，填写服务地址、项目标识和项目令牌，并为 Server 设置唯一名称。</p></div></li>
                <li><span>3</span><div><strong>安装 issue-resolution Skill</strong><p>Skill 按优先级降序、创建时间正序领取“待 AI 处理”的 Issue，一次只处理一条。</p></div></li>
                <li><span>4</span><div><strong>澄清或交付</strong><p>信息不足时转为“待用户澄清”并继续下一条；完成后转为“AI 处理完毕”，等待用户验证关闭。</p></div></li>
              </ol>
            </section>

            <section id="upgrade" className="guide-block">
              <div className="guide-title">
                <span>Upgrade</span>
                <h2>累计升级与回滚</h2>
                <p>目标正式包包含全部历史 Flyway 迁移。老客户可逐版升级，也可直接从任意更早正式版本升级到目标版本。</p>
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
                  ['./devops.sh status', '显示版本、PID、端口归属与健康状态。'],
                  ['./devops.sh logs', '持续查看配置的应用日志。'],
                  ['./devops.sh foreground', '前台运行 Java，直接观察启动错误。'],
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
            <p>每个正式版本都是完整安装包和累计升级包。版本发布后，Tag、说明和发布物均冻结，不覆盖历史记录。</p>
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
            <a className="button button-ghost-light" href={getReleasePageUrl(latestRelease.version)} target="_blank" rel="noreferrer">Release notes <ExternalLink size={16} /></a>
          </div>
        </div>
      </section>

      <section className="release-history">
        <div className="shell">
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
          <div><GitBranch /><h3>不可复用 Tag</h3><p>每个版本创建唯一 Git Tag 和 GitHub Release，发布后不覆盖。</p></div>
          <div><Database /><h3>累计迁移</h3><p>Flyway 保留完整历史，新客户直装，老客户可跨版本升级。</p></div>
          <div><ShieldCheck /><h3>现场配置保留</h3><p>升级不覆盖真实 application.properties 与 nginx/devops.conf。</p></div>
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
  const location = useLocation()

  useEffect(() => {
    if (location.hash) {
      window.setTimeout(() => document.querySelector(location.hash)?.scrollIntoView(), 0)
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname, location.hash])

  return null
}

export default function App() {
  return (
    <div className="site-root">
      <ScrollToTop />
      <SiteHeader />
      <Routes>
        <RouterRoute path="/" element={<HomePage />} />
        <RouterRoute path="/guide" element={<GuidePage />} />
        <RouterRoute path="/releases" element={<ReleasesPage />} />
        <RouterRoute path="*" element={<NotFoundPage />} />
      </Routes>
      <SiteFooter />
    </div>
  )
}
