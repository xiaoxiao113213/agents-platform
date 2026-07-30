import { cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises'
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

