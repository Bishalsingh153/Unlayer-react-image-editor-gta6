import { chromium } from 'playwright'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outDir = path.join(root, 'screenshots')
const baseUrl = process.env.PREVIEW_URL ?? 'http://127.0.0.1:4173'

await mkdir(outDir, { recursive: true })

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })

await page.goto(baseUrl, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: path.join(outDir, '01-case-report.png'), fullPage: true })

await page.locator('.choose-photo__preset').first().click()
await page.waitForTimeout(400)
await page.screenshot({ path: path.join(outDir, '02-photo-selected.png'), fullPage: true })

await page.getByRole('button', { name: /start editing/i }).click()
await page.waitForTimeout(2500)
await page.screenshot({ path: path.join(outDir, '03-image-editor.png'), fullPage: true })

// Save from editor — advance to poster
const saveButton = page.locator('button', { hasText: /^save$/i }).first()
if (await saveButton.count()) {
  await saveButton.click()
  await page.waitForTimeout(1500)
  await page.screenshot({ path: path.join(outDir, '04-wanted-poster.png'), fullPage: true })
}

await browser.close()
console.log('Screenshots saved to', outDir)
