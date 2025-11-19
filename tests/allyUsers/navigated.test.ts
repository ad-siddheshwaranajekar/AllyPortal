import {Page, test, expect} from '@playwright/test';
import { SideMenuPage } from '../../pages/SideMenuPage';
import { LoginPage } from '../../pages/login/loginPage';
import loginData from '../../testData/loginData.json';  

test.describe('Ally Users Navigation Tests', () => {
  let sideMenuPage: SideMenuPage;
  let loginPage: LoginPage; 


    test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(loginData[0].username, loginData[0].password);
    sideMenuPage = new SideMenuPage(page);
    });
     test('Navigate to Users Page from Side Menu @navigation', async ({ page }) => {
        await sideMenuPage.openUsers();
        await expect(page).toHaveURL(/.*\/users/);
        expect(true).toBeTruthy();
        });


  });