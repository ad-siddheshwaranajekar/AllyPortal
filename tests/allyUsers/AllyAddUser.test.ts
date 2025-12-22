import { test, expect } from '@playwright/test';
import { AddUserPage } from '../../pages/users/addUserPage';
import { CommonUtils } from '../../utils/commonUtils';
import { generateUser } from '../../utils/testDataGenerator';

// Generate test data
const user = generateUser();

test.describe('Add ally users tests', () => {
  let addUserPage: AddUserPage;
  let commonUtils: CommonUtils;

  test.beforeEach(async ({ page }) => {
    addUserPage = new AddUserPage(page);
    commonUtils = new CommonUtils(page);

    // ✅ Page is already logged in via storageState in playwright.config.ts
    await page.goto('/#/ally/users');

    // Wait for stable element to ensure page is loaded
    await page.waitForSelector('div.header', { timeout: 15000 });
  });

  test.only('Verify that an Ally can create a Basic Auth Ally user', async ({ page }) => {
    await addUserPage.AddUserBtn.click();
    await expect(addUserPage.AddUserTxt).toBeVisible({ timeout: 15000 });

    // Fill form
    await addUserPage.userNameTxt.fill(user.username);
    await addUserPage.basicAuthBtn.click();
    await addUserPage.firstNameInputBox.fill(user.firstName);
    await addUserPage.lastNameInputBox.fill(user.lastName);
    await addUserPage.phoneNumberInputBox.fill(user.phone);
    await addUserPage.emailInputBox.fill(user.email);

    await addUserPage.saveButton.click();

    // ✅ Wait for toast safely
    const successToast = page.locator('.toast-message', { hasText: 'User added successfully' });
    await expect(successToast).toBeVisible({ timeout: 15000 });
  });




  // Optionally check text
  //await expect(successToast).toHaveText(/User added successfully/i, { timeout: 15000 });



//   test("Verify that an Ally can create a Basic Auth Ally user. @smoke @regression", async ({ page }) => {
//     await addUserPage.AddUserBtn.click();
//     await expect(addUserPage.AddUserTxt).toBeVisible({ timeout: 15000 });

//     await addUserPage.userNameTxt.fill(user.username);
//     await addUserPage.basicAuthBtn.click();
//     await addUserPage.firstNameInputBox.fill(user.firstName);
//     await addUserPage.lastNameInputBox.fill(user.lastName);
//     await addUserPage.phoneNumberInputBox.fill(user.phone);
//     await addUserPage.emailInputBox.fill(user.email);
//     await page.waitForTimeout(1000);
//     await addUserPage.saveButton.click();
//     await page.waitForTimeout(1000);
//     await page.waitForSelector('.toast-message', { timeout: 15000 });
//     await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 });
//     //await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 });
//     await page.waitForTimeout(1000);
//   });

    test("Verify that an Ally can create a API Key Ally user.@smoke @regression", async ({ page }) => {
    await addUserPage.AddUserBtn.click();
    await expect(addUserPage.AddUserTxt).toBeVisible({ timeout: 15000 });
    await addUserPage.userNameTxt.fill(user.username);
    await addUserPage.apiKeyBtn.click();
   // await addUserPage.firstNameInputBox.fill(user.firstName);
   // await addUserPage.lastNameInputBox.fill(user.lastName);
   // await addUserPage.phoneNumberInputBox.fill(user.phone);
    await addUserPage.emailInputBox.fill(user.email);
    await page.waitForTimeout(1000);
    await addUserPage.saveButton.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('.toast-message', { timeout: 15000 });
    await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 });
    
    //await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 });
     await page.waitForTimeout(1000);
  });
   test("Verify that an Ally can create a Basic Auth + API Key Ally user. @smoke @regression", async ({ page }) => {
    await addUserPage.AddUserBtn.click();
    await expect(addUserPage.AddUserTxt).toBeVisible({ timeout: 15000 });
    await addUserPage.userNameTxt.fill(user.username);
    await addUserPage.basicAuthBtn.click();
    await page.waitForTimeout(1000);
    await addUserPage.apiKeyBtn.click();
   await addUserPage.firstNameInputBox.fill(user.firstName);
   await addUserPage.lastNameInputBox.fill(user.lastName);
   await addUserPage.phoneNumberInputBox.fill(user.phone);
    await addUserPage.emailInputBox.fill(user.email);
    await page.waitForTimeout(1000);
    await addUserPage.saveButton.click();
    await page.waitForTimeout(1000);
    await page.waitForSelector('.toast-message', { timeout: 15000 });
    await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 }); 

    //await expect(addUserPage.successAlert).toBeVisible({ timeout: 15000 });
     await page.waitForTimeout(1000);
  });

  test("Verify that a validation error appears when creating a user with an existing username.@smoke @regression", async ({ page }) => {
    await addUserPage.AddUserBtn.click();
    await expect(addUserPage.AddUserTxt).toBeVisible({ timeout: 15000 });
    await addUserPage.userNameTxt.fill("Genesis24");//existing user
    await addUserPage.apiKeyBtn.click();
 
    await addUserPage.emailInputBox.fill(user.email);
    await page.waitForTimeout(1000);
    await addUserPage.saveButton.click();
   
await page.waitForSelector(".toast-message", { timeout: 15000 });

await expect(addUserPage.errorAlert).toBeVisible();




  });
});
