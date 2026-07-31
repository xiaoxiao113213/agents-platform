import { copyFile, cp, mkdir, readFile, rm, stat, writeFile } from 'node:fs/promises'
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
const releaseNotes = path.join(sourceRoot, 'docs', 'releases', `${version}.md`)
const publicReleaseDir = path.join(distDir, 'releases')

for (const requiredFile of [releaseArchive, releaseNotes]) {
  const fileStat = await stat(requiredFile).catch(() => null)
  if (!fileStat?.isFile()) {
    throw new Error(`官网打包缺少正式发布文件：${requiredFile}`)
  }
}

await mkdir(publicReleaseDir, { recursive: true })
await copyFile(releaseArchive, path.join(publicReleaseDir, releaseArchiveName))
await copyFile(releaseNotes, path.join(publicReleaseDir, `${version}.md`))
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
await tar.c(
  {
    cwd: packageDir,
    file: archivePath,
    gzip: true,
    portable: true,
  },
  [stagingName],
)

console.log(`站点发布包已生成：${archivePath}`)
console.log(`官网正式包已同步：${path.join(publicReleaseDir, releaseArchiveName)}`)
