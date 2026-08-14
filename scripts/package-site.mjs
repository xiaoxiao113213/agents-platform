import { copyFile, cp, mkdir, readFile, readdir, rm, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import * as tar from 'tar'

const root = process.cwd()
const packageJson = JSON.parse(await readFile(path.join(root, 'package.json'), 'utf8'))
const version = `v${packageJson.version}`
const distDir = path.join(root, 'dist')
const packageDir = path.join(root, 'package')
const stagingName = `agents-platform-site-${version}`
const stagingDir = path.join(packageDir, stagingName)
const archivePath = path.join(packageDir, `${stagingName}.tar.gz`)
const sourceRoot = path.resolve(root, process.env.AGENTS_PLATFORM_SOURCE_ROOT || '..')
const publicSiteUrl = (process.env.AGENTS_PLATFORM_PUBLIC_URL || 'https://mmmqaz.cn').replace(/\/$/, '')
const releaseArchiveName = `devops-${version}-linux-x64.tar.gz`
const releaseArchive = path.join(sourceRoot, 'dist', 'releases', version, releaseArchiveName)
const publicReleaseNotes = path.join(root, 'docs', 'releases', `${version}.md`)
const publicGuideSourceDir = path.join(root, 'docs', 'guides')
const publicGuideFiles = (await readdir(publicGuideSourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
  .map((entry) => ({ source: path.join(publicGuideSourceDir, entry.name), output: entry.name }))
const releaseContentSource = path.join(root, 'src', 'content', 'releases.ts')
const launcherSource = path.join(sourceRoot, 'deploy', 'standalone', 'devops.sh')
const launcherUpdaterSource = path.join(sourceRoot, 'deploy', 'standalone', 'update-launcher.sh')
const publicReleaseDir = path.join(distDir, 'releases')
const publicGuideDir = path.join(distDir, 'guides')

for (const requiredFile of [releaseArchive, publicReleaseNotes, releaseContentSource, launcherSource, launcherUpdaterSource, ...publicGuideFiles.map((guide) => guide.source)]) {
  const fileStat = await stat(requiredFile).catch(() => null)
  if (!fileStat?.isFile()) {
    throw new Error(`官网打包缺少正式发布文件：${requiredFile}`)
  }
}

const forbiddenPublicReleaseTerms = [
  [/HMAC/i, '签名算法'],
  [/AES-GCM/i, '加密算法'],
  [/SECRET_KEY/i, '内部配置键'],
  [/Flyway/i, '数据库迁移工具'],
  [/V\d{14}__/, '数据库迁移编号'],
  [/\d+\s*张表/, '数据库结构统计'],
  [/\d+\s*项[^\n，。]*测试/, '内部测试数量'],
  [/(固定镜像|镜像[^\n，。]*(构建|推送|回拉)|远端回拉)/, '镜像发布过程'],
  [/(密钥派生|分域签名|历史敏感信息)/, '内部安全实现'],
]

for (const publicContentFile of [publicReleaseNotes, releaseContentSource, ...publicGuideFiles.map((guide) => guide.source)]) {
  const publicContent = await readFile(publicContentFile, 'utf8')
  for (const [pattern, label] of forbiddenPublicReleaseTerms) {
    if (pattern.test(publicContent)) {
      throw new Error(`官网公开版本文案包含${label}，请改为客户可感知的功能描述：${publicContentFile}`)
    }
  }
}

await mkdir(publicReleaseDir, { recursive: true })
await mkdir(publicGuideDir, { recursive: true })
await copyFile(releaseArchive, path.join(publicReleaseDir, releaseArchiveName))
await copyFile(publicReleaseNotes, path.join(publicReleaseDir, `${version}.md`))
for (const guide of publicGuideFiles) {
  await copyFile(guide.source, path.join(publicGuideDir, guide.output))
}
const launcherContent = (await readFile(launcherSource, 'utf8')).replace(/\r\n?/g, '\n')
const launcherUpdaterContent = (await readFile(launcherUpdaterSource, 'utf8')).replace(/\r\n?/g, '\n')
const launcherVersion = launcherContent.match(/^DEVOPS_LAUNCHER_VERSION='([1-9][0-9]*)'$/m)?.[1]
const launcherIntroducedIn = launcherContent.match(/^DEVOPS_LAUNCHER_INTRODUCED_IN='(v[0-9]+\.[0-9]+\.[0-9]+)'$/m)?.[1]
if (!launcherVersion || !launcherIntroducedIn) {
  throw new Error(`无法从启动器读取版本标记：${launcherSource}`)
}
await writeFile(path.join(publicReleaseDir, 'devops.sh'), launcherContent, 'utf8')
await writeFile(path.join(publicReleaseDir, 'update-launcher.sh'), launcherUpdaterContent, 'utf8')
await writeFile(
  path.join(publicReleaseDir, 'launcher.properties'),
  [
    `launcher-version=${launcherVersion}`,
    `introduced-in=${launcherIntroducedIn}`,
    `script-url=${publicSiteUrl}/releases/devops.sh`,
    '',
  ].join('\n'),
  'utf8',
)
await writeFile(
  path.join(publicReleaseDir, 'latest.properties'),
  [
    `version=${version}`,
    `asset-url=${publicSiteUrl}/releases/${releaseArchiveName}`,
    `notes-url=${publicSiteUrl}/releases/${version}.md`,
    '',
  ].join('\n'),
  'utf8',
)

await rm(packageDir, { recursive: true, force: true })
await mkdir(stagingDir, { recursive: true })
await cp(distDir, stagingDir, { recursive: true })
await writeFile(
  path.join(stagingDir, 'VERSION'),
  `${version}\n`,
  'utf8',
)
try {
  await tar.c(
    {
      cwd: packageDir,
      file: archivePath,
      gzip: true,
      portable: true,
    },
    [stagingName],
  )
} finally {
  await rm(stagingDir, { recursive: true, force: true })
}

console.log(`站点发布包已生成：${archivePath}`)
console.log(`官网正式包已同步：${path.join(publicReleaseDir, releaseArchiveName)}`)
console.log(`官网启动器已同步：v${launcherVersion}（首次引入于 ${launcherIntroducedIn}）`)
