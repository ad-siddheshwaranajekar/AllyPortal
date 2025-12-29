import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';
import { AddUserPage } from '../../pages/users/addUserPage';
import { generateUser } from '../../utils/testDataGenerator';
import { SideMenuPage } from '../../pages/SideMenuPage';
import { CommonUtils } from '../../utils/commonUtils';

const user = generateUser();

test.describe('Add ally users tests', () => {
  let loginPage: LoginPage;
  let addUserPage: AddUserPage;
  let sideMenuPage: SideMenuPage;
  let commonUtils: CommonUtils;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    addUserPage = new AddUserPage(page);
    sideMenuPage = new SideMenuPage(page);
    commonUtils = new CommonUtils(page);

    // Navigate to login and log in
    await loginPage.navigate();
    await loginPage.login(process.env.USERNAME!, process.env.PASSWORD!);

   
  });

  test('Verify that an Ally can create a Basic Auth Ally user', async ({ page }) => {
    await addUserPage.AddUserBtn.click();
    await expect(addUserPage.AddUserTxt).toBeVisible();

    await addUserPage.userNameTxt.fill(user.username);
    await addUserPage.basicAuthBtn.click();
    await addUserPage.firstNameInputBox.fill(user.firstName);
    await addUserPage.lastNameInputBox.fill(user.lastName);
    await addUserPage.phoneNumberInputBox.fill("8234560789");
    await addUserPage.emailInputBox.fill(user.email);
    await addUserPage.saveButton.click();

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
   await addUserPage.phoneNumberInputBox.fill("9876543210");
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
