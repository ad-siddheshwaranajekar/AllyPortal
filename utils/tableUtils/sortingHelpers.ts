export async function sortColumn(page, selector: string) {
  await page.locator(selector).click();
}
