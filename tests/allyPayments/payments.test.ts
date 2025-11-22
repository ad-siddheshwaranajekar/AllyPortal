import {test, expect} from '@playwright/test';
import {PaymentsPage} from '../../pages/payments/paymentsPage';
import {CURRENT_ENV} from '../../tests/config/env';
import {SideMenuPage} from '../../pages/SideMenuPage';
import {LoginPage} from '../../pages/login/loginPage';  
import {CommonUtils} from '../../utils/commonUtils';


test.describe('Ally Payments Page Tests', () => {
  let loginPage: LoginPage;
  let sideMenuPage: SideMenuPage;
  let paymentsPage: PaymentsPage;
  let commonUtils: CommonUtils; 
    test.beforeEach(async ({page}) => { 
    loginPage = new LoginPage(page);    
    sideMenuPage = new SideMenuPage(page);
    paymentsPage = new PaymentsPage(page);
    commonUtils = new CommonUtils(page);    
    // Login and navigate to Payments page
    await loginPage.navigateTo(CURRENT_ENV);
    await loginPage.loginAsAlly();
    await sideMenuPage.openPayments();
    });


    test('Validate Payments Page Loads Correctly', async ({page}) => {

        await paymentsPage.validatePaymentsPageLoaded();
    });
}); 