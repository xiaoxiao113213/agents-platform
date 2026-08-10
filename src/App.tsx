import { useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  ArrowRight,
  BarChart3,
  Blocks,
  Bot,
  Check,
  ChevronRight,
  CircleDot,
  CloudCog,
  Code2,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  Globe2,
  HardDrive,
  LockKeyhole,
  Mail,
  Menu,
  MessageSquareText,
  MonitorCheck,
  PanelsTopLeft,
  Presentation,
  RefreshCw,
  RotateCcw,
  ServerCog,
  Share2,
  ShieldCheck,
  Sparkles,
  TerminalSquare,
  Users,
  Video,
  Workflow,
  X,
} from 'lucide-react'
import { Link, NavLink, Route as RouterRoute, Routes, useLocation } from 'react-router-dom'
import { builtinAgents, builtinMcps, mcpCategoryLabels } from './content/capabilities'
import { agentCaseCategories, agentUseCases, serviceCustomers, type AgentCaseIcon } from './content/useCases'
import { getReleaseDownloadUrl, getReleasePageUrl, latestRelease, releases } from './content/releases'

const contactEmail = '418179551@qq.com'
const repositoryUrl = 'https://github.com/xiaoxiao113213/agents-platform'

const caseIcons: Record<AgentCaseIcon, ReactNode> = {
  code: <Code2 />,
  issue: <CircleDot />,
  data: <Database />,
  presentation: <Presentation />,
  video: <Video />,
  operations: <CloudCog />,
  research: <Globe2 />,
  office: <FileText />,
  schedule: <Workflow />,
  web: <PanelsTopLeft />,
}

const agentIcons: Record<string, ReactNode> = {
  default: <TerminalSquare />,
  'database-agent': <Database />,
  'frontend-vibe-coding': <Globe2 />,
  'issue-resolution': <CircleDot />,
  'grafana-dashboard': <BarChart3 />,
  'ai-ppt': <Presentation />,
  'ai-video': <Video />,
}

function Brand() {
  return (
    <Link className="brand" to="/" aria-label="Agents Platform 首页">
      <span className="brand-mark"><img src="/favicon.svg" alt="" /></span>
      <span>Agents Platform</span>
    </Link>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => setOpen(false), [location.pathname])

  const nav = (
    <>
      <NavLink to="/capabilities">能力与案例</NavLink>
      <NavLink to="/deploy">安装与升级</NavLink>
      <NavLink to="/guide">使用指南</NavLink>
      <NavLink to="/releases">版本</NavLink>
    </>
  )

  return (
    <header className="site-header">
      <div className="header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="主导航">{nav}</nav>
        <div className="header-actions">
          <a className="icon-link" href={repositoryUrl} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">
            <Github />
          </a>
          <a className="button button-small button-dark" href={getReleaseDownloadUrl(latestRelease)}>
            <Download />下载 {latestRelease.version}
          </a>
          <button
            className="menu-button"
            type="button"
            onClick={() => setOpen((value) => !value)}
            title={open ? '关闭导航' : '打开导航'}
            aria-label={open ? '关闭导航' : '打开导航'}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && <nav className="mobile-nav" aria-label="移动端导航">{nav}</nav>}
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main page-shell">
        <div className="footer-intro">
          <Brand />
          <p>让 Agent 进入项目、理解上下文、使用工具，并把结果真正交付给团队。</p>
        </div>
        <div className="footer-links">
          <div><strong>产品</strong><Link to="/capabilities">能力与案例</Link><Link to="/guide">使用指南</Link><Link to="/releases">版本下载</Link></div>
          <div><strong>安装与升级</strong><Link to="/deploy">Linux 安装与升级</Link><a href={repositoryUrl} target="_blank" rel="noreferrer">GitHub</a><a href={`mailto:${contactEmail}`}>技术支持</a></div>
          <div><strong>说明</strong><Link to="/license">软件许可</Link><Link to="/privacy">隐私说明</Link><Link to="/terms">服务条款</Link></div>
        </div>
      </div>
      <div className="footer-bottom page-shell">
        <span>© 2026 Agents Platform</span>
        <a href={`mailto:${contactEmail}`}><Mail />{contactEmail}</a>
      </div>
    </footer>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow">{children}</div>
}

function PageIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="page-intro section-dark">
      <div className="page-shell">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function CaseGrid({ limit }: { limit?: number }) {
  const cases = limit ? agentUseCases.slice(0, limit) : agentUseCases
  return (
    <div className="case-grid">
      {cases.map((item) => (
        <article className="case-item" key={item.id}>
          <div className="case-topline">
            <span className="case-icon">{caseIcons[item.icon]}</span>
            <span>{item.category}</span>
          </div>
          <h3>{item.title}</h3>
          <p>{item.summary}</p>
          <blockquote>{item.request}</blockquote>
          <div className="case-output">
            <strong>交付</strong>
            <span>{item.deliverables.join(' · ')}</span>
          </div>
        </article>
      ))}
    </div>
  )
}

function HomePage() {
  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-copy page-shell">
            <Eyebrow>企业 Agent 工作平台</Eyebrow>
            <h1>让 Agent<br />完成真实工作</h1>
            <p>不止回答问题。让 Agent 进入项目、连接数据和业务系统，从理解目标到交付文件、代码、看板与处理结果。</p>
            <div className="hero-actions">
              <Link className="button button-primary" to="/capabilities"><Sparkles />查看能做什么</Link>
              <Link className="button button-quiet" to="/deploy">部署自己的平台<ArrowRight /></Link>
            </div>
          </div>
          <div className="hero-product page-shell">
            <div className="product-caption">
              <span><CircleDot />真实产品界面</span>
              <strong>一个工作台管理团队全部 Agent</strong>
              <small>创建、配置、共享、运行和进入项目工作区</small>
            </div>
            <img src="/images/platform-agent-overview-v1.png" alt="Agents Platform 的 Agent 管理台真实界面" />
          </div>
        </section>

        <section className="proof-strip" id="work">
          <div className="page-shell proof-grid">
            <div><strong>7</strong><span>内置专业 Agent</span></div>
            <div><strong>18</strong><span>可连接的企业系统</span></div>
            <div><strong>1</strong><span>统一项目工作区</span></div>
            <div><strong>24/7</strong><span>持续执行与交付</span></div>
          </div>
        </section>

        <section className="section section-cases">
          <div className="page-shell">
            <div className="section-heading wide-heading">
              <div><Eyebrow>真实工作案例</Eyebrow><h2>一句目标，交付一整段工作</h2></div>
              <p>Agent 会读取上下文、操作项目、调用获准使用的能力、验证结果，并把过程和产物留在团队共同的工作区。</p>
            </div>
            <CaseGrid limit={6} />
            <div className="center-action"><Link className="text-link" to="/capabilities#cases">查看全部案例<ArrowRight /></Link></div>
          </div>
        </section>

        <section className="section section-agents">
          <div className="page-shell">
            <div className="section-heading">
              <h2>从软件研发到内容交付</h2>
              <p>每个 Agent 都有独立工作空间，可以按项目添加能力，也可以继续扩展新的专业方向。</p>
            </div>
            <div className="agent-lineup">
              {builtinAgents.map((agent) => (
                <article key={agent.code}>
                  <span className="agent-icon">{agentIcons[agent.code] ?? <Bot />}</span>
                  <h3>{agent.name}</h3>
                  <p>{agent.summary}</p>
                  <div>{agent.capabilities.slice(0, 3).map((capability) => <span key={capability}>{capability}</span>)}</div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section section-workspace">
          <div className="page-shell workspace-layout">
            <div className="workspace-statement">
              <h2>同一份 Agent<br />同一个项目现场</h2>
              <p>共享成员看到相同的会话、项目文件、任务记录和交付物。项目进展不再留在某个人的临时对话里。</p>
              <Link className="text-link light-link" to="/guide">了解团队使用方式<ArrowRight /></Link>
            </div>
            <div className="workspace-flow">
              <div><Users /><strong>团队成员</strong><span>按权限创建、使用和管理</span></div>
              <ChevronRight />
              <div className="flow-focus"><Bot /><strong>共享 Agent</strong><span>一份会话与项目状态</span></div>
              <ChevronRight />
              <div><Check /><strong>共同交付</strong><span>代码、文件、看板与结果</span></div>
            </div>
          </div>
        </section>

        <section className="section section-builtins">
          <div className="page-shell">
            <div className="section-heading wide-heading">
              <div><h2>数据和 Issue 与项目一起工作</h2></div>
              <p>常用能力不是散落的配置页面，而是直接进入 Agent 项目，在当前上下文里完成工作。</p>
            </div>
            <div className="builtin-split">
              <article>
                <Database />
                <h3>数据库工作空间</h3>
                <p>一个数据库 Agent 绑定一个 MySQL Schema，团队在同一处完成问答、结构设计和 SQL 操作。</p>
                <ul><li><Check />连接状态和结构一目了然</li><li><Check />默认 ER 画板自动准备</li><li><Check />变更操作需要明确确认</li></ul>
              </article>
              <article>
                <CircleDot />
                <h3>Issue 协作空间</h3>
                <p>一个项目目录绑定一个 Issue 项目，事项、评论、附件和处理状态始终跟随当前项目。</p>
                <ul><li><Check />项目绑定关系顶部清晰展示</li><li><Check />人工与 Agent 在同一事项协作</li><li><Check />处理证据和验收状态完整保留</li></ul>
              </article>
            </div>
          </div>
        </section>

        <section className="section customer-section">
          <div className="page-shell">
            <div className="section-heading"><Eyebrow>正在服务</Eyebrow><h2>和真实团队一起落地</h2><p>围绕研发协作、数据分析和内容生产，把 Agent 能力接入企业每天都在发生的工作。</p></div>
            <div className="customer-list">
              {serviceCustomers.map((customer) => <div key={customer.name}><span>{customer.city}</span><strong>{customer.name}</strong><Check /></div>)}
            </div>
          </div>
        </section>

        <section className="closing-cta">
          <div className="page-shell">
            <h2>把下一项真实工作<br />交给 Agent</h2>
            <div><Link className="button button-light" to="/deploy"><Download />下载并部署</Link><a className="button button-outline-light" href={`mailto:${contactEmail}`}><Mail />联系团队</a></div>
          </div>
        </section>
      </main>
    </>
  )
}

function CapabilitiesPage() {
  const [category, setCategory] = useState<(typeof agentCaseCategories)[number]>('全部')
  const filteredCases = useMemo(() => category === '全部' ? agentUseCases : agentUseCases.filter((item) => item.category === category), [category])
  const groupedMcps = useMemo(() => Object.entries(mcpCategoryLabels).map(([code, label]) => ({
    code,
    label,
    items: builtinMcps.filter((item) => item.category === code),
  })), [])

  return (
    <main>
      <PageIntro eyebrow="能力与案例" title="能力可以继续生长，交付必须看得见" description="从通用软件工程到数据库、网站、Issue、看板、PPT 和视频，每个 Agent 都以实际产出为目标。" />
      <section className="section page-section">
        <div className="page-shell">
          <div className="section-heading wide-heading"><div><h2>先覆盖高频工作，再按团队扩展</h2></div><p>选择一个最接近目标的 Agent，添加项目和成员，即可在独立工作区里持续协作。</p></div>
          <div className="capability-agent-list">
            {builtinAgents.map((agent) => (
              <article key={agent.code}>
                <div className="capability-agent-head"><span>{agentIcons[agent.code] ?? <Bot />}</span></div>
                <p className="agent-category">{agent.category}</p>
                <h3>{agent.name}</h3>
                <p>{agent.summary}</p>
                <dl><div><dt>适合</dt><dd>{agent.audience}</dd></div><div><dt>交付</dt><dd>{agent.output}</dd></div></dl>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section page-section section-muted" id="cases">
        <div className="page-shell">
          <div className="section-heading"><h2>从需求到可验收结果</h2><p>这些不是演示脚本，而是 Agent 可以在真实项目中完成的工作路径。</p></div>
          <div className="segmented" role="group" aria-label="案例分类">
            {agentCaseCategories.map((item) => <button type="button" className={item === category ? 'active' : ''} onClick={() => setCategory(item)} key={item}>{item}</button>)}
          </div>
          <div className="case-grid">
            {filteredCases.map((item) => (
              <article className="case-item" key={item.id}>
                <div className="case-topline"><span className="case-icon">{caseIcons[item.icon]}</span><span>{item.category}</span></div>
                <h3>{item.title}</h3><p>{item.summary}</p><blockquote>{item.request}</blockquote>
                <ol>{item.sequence.map((step) => <li key={step}>{step}</li>)}</ol>
                <div className="case-output"><strong>交付</strong><span>{item.deliverables.join(' · ')}</span></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section integrations-section">
        <div className="page-shell">
          <div className="section-heading wide-heading"><div><h2>让 Agent 使用团队已有工具</h2></div><p>代码、制品、数据库、云平台、质量、监控与协作系统都可以按项目连接，并由权限决定谁能使用。</p></div>
          <div className="integration-groups">
            {groupedMcps.map((group) => (
              <div key={group.code}>
                <strong>{group.label}</strong>
                <div>{group.items.map((item) => <span key={item.code}><Blocks />{item.name}</span>)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

function DeployPage() {
  const releaseVersion = latestRelease.version
  const releaseArchive = latestRelease.assetName

  return (
    <main>
      <PageIntro eyebrow="Linux 安装与升级" title="已有环境直接升级，无需重新部署" description={`${releaseVersion} 支持全新安装，也支持 v0.0.1 及后续正式版本在原安装目录累计升级。启动器、程序、配置和数据库分别按清晰边界处理。`} />
      <section className="generation-notice">
        <div className="page-shell">
          <span><RefreshCw /></span>
          <div><strong>已有正式版本请在原目录升级</strong><p><code>update</code> 会保留现场配置、Nginx、数据和日志；首次部署才需要新目录和空数据库。</p></div>
          <Link to="/releases">查看版本说明<ArrowRight /></Link>
        </div>
      </section>
      <section className="section page-section">
        <div className="page-shell deploy-layout">
          <aside className="page-toc">
            <strong>安装与升级</strong>
            <Link to="/deploy#choose">选择路径</Link><Link to="/deploy#upgrade">在线升级</Link><Link to="/deploy#launcher">升级启动器</Link><Link to="/deploy#offline">离线升级</Link><Link to="/deploy#verify">配置与验证</Link><Link to="/deploy#install">全新安装</Link><Link to="/deploy#rollback">回滚边界</Link>
          </aside>
          <div className="guide-content">
            <section id="choose">
              <h2>先确认你是哪种情况</h2>
              <p>升级与全新安装是两条不同路径。已有正式版本不要重新解压到新目录，也不要连接空数据库。</p>
              <div className="deploy-paths">
                <Link className="deploy-path deploy-path-primary" to="/deploy#upgrade"><RefreshCw /><span>已有 v0.0.1 及后续正式版本</span><strong>在原安装目录累计升级</strong><p>保留配置、Nginx、数据、日志和数据库，只替换版本程序。</p><ArrowRight /></Link>
                <Link className="deploy-path" to="/deploy#install"><Download /><span>首次部署</span><strong>使用新目录全新安装</strong><p>连接空 MySQL 8 devops 数据库，再按安装向导完成配置。</p><ArrowRight /></Link>
              </div>
            </section>

            <section id="upgrade">
              <h2>在线升级：先检查，再执行</h2>
              <p>进入当前正在使用的安装目录。<code>update --check</code> 只读取官网版本信息和发布包响应，不下载大包、不拉取镜像，也不会修改任何现场文件。</p>
              <pre><code>{`cd /opt/devops/devops
./devops.sh version
./devops.sh launcher-version
./devops.sh update --check`}</code></pre>
              <div className="callout"><ShieldCheck /><div><strong>预检通过后再安排升级窗口</strong><p>先备份 MySQL、application.properties 和 nginx/devops.conf。生产环境建议主动停止服务后升级，完成检查后再启动。</p></div></div>
              <pre><code>{`./devops.sh stop
./devops.sh update
./devops.sh check
./devops.sh start
./devops.sh status`}</code></pre>
              <p className="section-note"><code>update</code> 会下载官网最新正式 Linux 包，校验升级代际、包结构和目标版本，并仅拉取本地缺少的固定版本 Agent 镜像。产品包下载中断后再次执行会断点续传；产品包已经下载完成而镜像阶段中断时，下次会直接复用，不会从头下载。</p>
              <div className="callout"><Download /><div><strong>镜像下载过程保持可见</strong><p>脚本按当前数量和总数显示进度，同时保留 Docker 的分层下载内容；下载时间较长时会持续显示等待时间，结束后汇总复用和实际下载数量。</p></div></div>
            </section>

            <section id="launcher">
              <h2>devops.sh 本身需要升级时</h2>
              <p>启动器与产品版本独立更新。旧启动器没有 <code>update</code> 命令，或新版本提示先升级启动器时，在现有安装目录执行下面的命令。</p>
              <pre><code>{`cd /opt/devops/devops
curl -fsSL https://mmmqaz.cn/releases/update-launcher.sh | bash
./devops.sh launcher-version
./devops.sh images status
./devops.sh update --check`}</code></pre>
              <div className="launcher-boundary"><RefreshCw /><div><strong>启动器更新只替换 devops.sh</strong><p>更新器会先备份旧脚本并校验新脚本；不会停止服务，也不会修改 Jar、前端、application.properties、Nginx、数据库或运行数据。已经是最新版本时不会重复替换，后续产品升级也不会用较旧脚本将它降级。</p></div></div>
              <pre><code>{`# 单独查看或下载当前版本镜像
./devops.sh images status
./devops.sh images pull

# 按本地发布包提前下载目标版本镜像
./devops.sh images pull /tmp/${releaseArchive}`}</code></pre>
            </section>

            <section id="offline">
              <h2>服务器无法访问官网时使用离线包</h2>
              <p>先在可联网环境下载正式 Linux 包并传到服务器。<code>upgrade</code> 使用指定的本地包，其他校验、保留和备份规则与在线升级一致。</p>
              <pre><code>{`cd /opt/devops/devops
./devops.sh upgrade --check /tmp/${releaseArchive}
./devops.sh stop
./devops.sh upgrade /tmp/${releaseArchive}
./devops.sh check
./devops.sh start
./devops.sh status`}</code></pre>
              <div className="command-compare"><div><strong>update</strong><span>自动检查并下载官网最新正式包</span></div><div><strong>upgrade</strong><span>使用已经下载到服务器的指定安装包</span></div></div>
            </section>
            <section id="verify">
              <h2>升级后哪些保留，哪些更新</h2>
              <p>升级器把现场文件和版本程序分开处理，不要求用户重新填写全部配置。</p>
              <div className="upgrade-boundaries">
                <div><strong>始终保留</strong><span>application.properties</span><span>nginx/devops.conf</span><span>数据、日志和数据库</span></div>
                <div><strong>随版本更新</strong><span>服务端、平台前端与 devops.sh</span><span>application.properties.example</span><span>nginx/devops.conf.example</span></div>
              </div>
              <p className="section-note">如果示例配置或 Nginx 模板发生变化，升级器会保留实际文件并给出差异提示。只合并新版本需要的配置项和路由，不要覆盖现场域名、端口、证书与密钥。</p>
              <pre><code>{`diff -u application.properties application.properties.example
diff -u nginx/devops.conf nginx/devops.conf.example
sudo nginx -t

./devops.sh check
./devops.sh start
./devops.sh status`}</code></pre>
              <div className="guide-checks"><div><Check />确认安装版本已更新</div><div><Check />确认平台健康检查通过</div><div><Check />确认 Nginx 配置有效</div><div><Check />确认 Agent 镜像与核心业务可用</div></div>
            </section>
            <section id="install">
              <h2>只有首次部署才需要全新安装</h2>
              <p>生产环境使用 Linux x64、Java 21、MySQL 8 和 Docker。全新安装使用新目录与空 devops 数据库；已有 v0.0.1 及后续正式版本可在原目录累计升级。</p>
              <div className="requirements-grid"><div><ServerCog /><strong>Linux x64</strong><span>新的安装目录</span></div><div><Database /><strong>MySQL 8</strong><span>空 devops 数据库</span></div><div><HardDrive /><strong>Java 21</strong><span>宿主机运行平台服务</span></div><div><CloudCog /><strong>Docker</strong><span>运行专业 Agent</span></div></div>
              <pre><code>{`curl -fL -o ${releaseArchive} \\\n  https://mmmqaz.cn/releases/${releaseArchive}\n\ntar -xzf ${releaseArchive}\ncd devops-${releaseVersion}\nchmod +x devops.sh\n./devops.sh install`}</code></pre>
              <div className="callout"><MonitorCheck /><div><strong>安装向导逐项完成现场准备</strong><p>向导检查依赖、填写外置配置、准备 MySQL 与数据目录、生成 Nginx 站点并执行最终检查。每项系统修改都会先询问确认。</p></div></div>
            </section>
            <section id="rollback">
              <h2>回滚程序不等于回滚数据库</h2>
              <p><code>rollback</code> 只恢复最近一次程序备份，不会反向修改数据库结构，也不会覆盖现场配置。若新版本已经执行数据库升级，恢复旧程序前必须同时恢复升级前的 MySQL 备份。</p>
              <pre><code>{`# 仅在确认数据库兼容，或已恢复升级前数据库备份后执行
./devops.sh rollback
./devops.sh check
./devops.sh start
./devops.sh status`}</code></pre>
              <div className="rollback-warning"><RotateCcw /><div><strong>不要把旧发布包传给 upgrade 尝试降级</strong><p>相同版本和降级包会被拒绝。发生问题时先保留现场日志，根据数据迁移情况决定继续修复还是恢复程序与数据库备份。</p></div></div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

function GuidePage() {
  return (
    <main>
      <PageIntro eyebrow="使用指南" title="先创建一个 Agent，再把项目交给它" description="从模型服务、Agent、项目和成员开始，数据库、Issue 与其他工具都围绕当前 Agent 项目展开。" />
      <section className="section page-section">
        <div className="page-shell guide-layout">
          <aside className="page-toc"><strong>开始使用</strong><Link to="/guide#start">平台准备</Link><Link to="/guide#agent">创建 Agent</Link><Link to="/guide#project">创建项目</Link><Link to="/guide#database">数据库工作</Link><Link to="/guide#issue">Issue 协作</Link><Link to="/guide#share">团队共享</Link></aside>
          <div className="guide-content">
            <section id="start"><h2>配置团队可用的模型服务</h2><p>管理员先在平台中添加可用的模型服务。成员创建 Agent 时从已配置的选项中选择，无需在每个项目重复填写。</p><div className="inline-flow"><div><LockKeyhole /><strong>管理员配置</strong></div><ChevronRight /><div><Bot /><strong>Agent 选择</strong></div><ChevronRight /><div><MessageSquareText /><strong>发送首条任务</strong></div></div></section>
            <section id="agent"><h2>选择专业 Agent 或通用 Agent</h2><p>数据库、网站、Issue、Grafana、PPT 和视频 Agent 已经准备好对应工作方式。更通用的研发和自动化任务从通用 Agent 开始。</p><div className="guide-checks"><div><Check />名称说明用途和团队</div><div><Check />选择获准使用的模型服务</div><div><Check />按任务配置资源和扩展能力</div><div><Check />启动后进入 Agent 控制台</div></div></section>
            <section id="project"><h2>在 Agent 空间下创建项目</h2><p>每个 Agent 的工作空间下都有独立 projects 目录。新项目会在其中形成自己的目录，会话、文件、任务和产物都跟随当前项目。</p><pre><code>{`/workspace/projects/<agent-space>/projects/<project-code>`}</code></pre></section>
            <section id="database"><h2>把一个 Database Agent 绑定到一个 Schema</h2><p>填写 MySQL 连接并验证后，平台会准备数据库工作空间和默认结构画板。团队可在同一处问答、设计表关系和执行 SQL。</p><div className="callout"><Database /><div><strong>变更边界</strong><p>结构修改和数据写入会先明确展示影响并要求确认，只读分析可以直接进行。</p></div></div></section>
            <section id="issue"><h2>一个项目目录绑定一个 Issue 项目</h2><p>绑定后，项目顶部会持续展示当前 Issue 项目。成员和 Agent 在同一空间查看事项、评论、图片、附件和状态，不会混入其他项目。</p></section>
            <section id="share"><h2>共享的是同一个 Agent</h2><p>添加共享成员后，大家进入的是同一份 Agent，不是复制出来的个人副本。会话、项目文件、数据库状态、SQL 记录和 Issue 工作区都共同可见。</p><div className="sharing-board"><div><Users /><span>产品、研发、测试、运营</span></div><Share2 /><div><Bot /><span>同一 Agent 与项目上下文</span></div><ArrowRight /><div><Check /><span>共同验收交付结果</span></div></div></section>
          </div>
        </div>
      </section>
    </main>
  )
}

function ReleasesPage() {
  return (
    <main>
      <PageIntro eyebrow="版本与下载" title={`当前正式版本 ${latestRelease.version}`} description="官网和 GitHub 提供当前 v1 正式版本。公开说明聚焦功能、稳定性、兼容性和升级体验。" />
      <section className="section page-section release-page">
        <div className="page-shell">
          {releases.map((release) => (
            <article className="release-feature" key={release.version}>
              <div className="release-meta"><span>当前正式版本</span><strong>{release.version}</strong><small>{release.date}</small></div>
              <div className="release-content"><h2>{release.title}</h2><p>{release.summary}</p><ul>{release.highlights.map((item) => <li key={item}><Check />{item}</li>)}</ul><div className="release-metrics">{release.metrics.map((item) => <span key={item}>{item}</span>)}</div><div className="release-actions"><a className="button button-primary" href={getReleaseDownloadUrl(release)}><Download />下载 Linux 正式包</a><a className="button button-quiet" href={getReleasePageUrl(release.version)} target="_blank" rel="noreferrer"><ExternalLink />GitHub Release</a></div></div>
            </article>
          ))}
          <div className="release-generation"><ShieldCheck /><div><strong>安装与升级边界</strong><p>{latestRelease.version} 支持全新安装，也支持 v0.0.1 及后续正式版本直接累计升级，无需补装中间版本。</p></div><Link to="/deploy">阅读安装与升级指南<ArrowRight /></Link></div>
        </div>
      </section>
    </main>
  )
}

function PrivacyPage() {
  return <LegalPage title="隐私说明" updated="2026-08-06"><p>Agents Platform 尊重用户与企业数据边界。本说明适用于官方网站提供的信息浏览、版本下载和联系渠道。</p><h2>我们处理的信息</h2><p>访问官方网站时，站点服务可能产生维持访问和排查故障所需的基础日志。通过邮箱主动联系我们时，我们仅使用来信中提供的信息回复咨询和持续沟通。</p><h2>产品部署数据</h2><p>Agents Platform 由客户部署在自己的环境中。项目、会话、文件、数据库连接和业务系统数据由部署方管理，官网不会自动获取这些内容。</p><h2>信息使用与保留</h2><p>联系信息仅用于响应支持、商务或产品反馈。我们不会出售个人信息。部署方应根据自身制度设置账号权限、数据保留和审计规则。</p><h2>联系我们</h2><p>对本说明有疑问，请发送邮件至 <a href={`mailto:${contactEmail}`}>{contactEmail}</a>。</p></LegalPage>
}

function TermsPage() {
  return <LegalPage title="服务条款" updated="2026-08-10"><p>下载、安装或使用 Agents Platform 即表示使用方同意按照适用法律、软件许可、授权范围和所在组织的管理制度使用本产品。</p><h2>适用范围</h2><p>平台用于创建和运行 Agent、管理项目以及连接获准使用的企业系统。使用方应确保其对接入的数据、代码、账号和外部服务拥有合法权限。</p><h2>部署与运维责任</h2><p>产品由使用方部署在自己的环境中。使用方负责基础设施、网络、备份、账号权限、外部服务费用和生产变更审批。</p><h2>Agent 结果</h2><p>Agent 可以执行复杂工作，但结果仍应按照业务风险接受人工复核。涉及生产变更、数据写入、对外发布和重要决策时，使用方应建立明确的确认流程。</p><h2>版本支持</h2><p>{latestRelease.version} 支持全新安装，也支持 v0.0.1 及后续正式版本直接累计升级，无需补装中间版本。版本适用条件、已知限制和后续更新以对应 Release 说明为准。</p><h2>软件许可</h2><p>本产品是专有软件，不是开源软件。使用范围、限制和单独商业授权方式以<Link to="/license">软件许可</Link>为准。</p><h2>联系我们</h2><p>许可和服务问题请发送邮件至 <a href={`mailto:${contactEmail}`}>{contactEmail}</a>。</p></LegalPage>
}

function LicensePage() {
  return <LegalPage title="软件许可" updated="2026-08-08"><p>Agents Platform 是可免费自托管使用的专有软件，不是开源软件。下载、安装或使用产品即表示使用方同意随正式版本提供的许可条款。</p><h2>免费使用范围</h2><p>个人或同一法人实体可以在自己控制的环境中免费安装、运行和备份官方未修改的二进制发布包，用于内部业务，包括内部商业业务。</p><h2>不包含的权利</h2><p>免费授权不包含平台核心源码、再分发、修改后分发、OEM、SaaS 转售、面向第三方的托管服务、逆向工程或移除权利声明。适用法律明确禁止限制的情形除外。</p><h2>商业授权</h2><p>需要再分发、OEM、托管服务、定制转售或其他扩展用途时，请发送邮件至 <a href={`mailto:${contactEmail}`}>{contactEmail}</a> 获取书面授权。</p><h2>第三方组件</h2><p>产品包含或依赖的第三方组件继续适用各自的许可，Agents Platform 的专有许可不会减少第三方许可已经授予的权利。</p><h2>完整条款</h2><p>正式法律文本随每个 Linux 发布包提供，也可以在 <a href={`${repositoryUrl}/blob/master/LICENSE`} target="_blank" rel="noreferrer">GitHub LICENSE</a> 中查看。</p></LegalPage>
}

function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return <main><PageIntro eyebrow="说明" title={title} description={`更新日期：${updated}`} /><section className="section page-section"><article className="legal-content page-shell">{children}</article></section></main>
}

function NotFoundPage() {
  return <main className="not-found"><div><span>404</span><h1>这个页面不存在</h1><p>链接可能已经更新，返回首页继续查看产品能力和最新版本。</p><Link className="button button-primary" to="/">返回首页<ArrowRight /></Link></div></main>
}

function ScrollManager() {
  const location = useLocation()
  useEffect(() => {
    const target = location.hash ? document.getElementById(location.hash.slice(1)) : null
    window.requestAnimationFrame(() => target?.scrollIntoView({ behavior: 'smooth', block: 'start' }) ?? window.scrollTo({ top: 0, behavior: 'instant' }))
  }, [location.pathname, location.hash])
  return null
}

export default function App() {
  return (
    <div className="app-shell">
      <ScrollManager />
      <Header />
      <Routes>
        <RouterRoute path="/" element={<HomePage />} />
        <RouterRoute path="/capabilities" element={<CapabilitiesPage />} />
        <RouterRoute path="/deploy" element={<DeployPage />} />
        <RouterRoute path="/guide" element={<GuidePage />} />
        <RouterRoute path="/releases" element={<ReleasesPage />} />
        <RouterRoute path="/privacy" element={<PrivacyPage />} />
        <RouterRoute path="/terms" element={<TermsPage />} />
        <RouterRoute path="/license" element={<LicensePage />} />
        <RouterRoute path="*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </div>
  )
}
