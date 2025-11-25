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

 
  test.describe('Payments Module', () => {

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


      //tests cases start here//


    test('Validate Payments Page Loads Correctly @smoke @regression', async ({page}) => {

        await paymentsPage.validatePaymentsPageLoaded();
    });

 test(' Verify Search Functionality @smoke @regression', async ({page}) => {

  await paymentsPage.validatePaymentsPageLoaded();
  await page.waitForTimeout(2000); // Wait for any dynamic content to load
  const text = 'c39140e1-fc9c-4177-8b60-4b0332a79348'; // Example transaction ID 
  await page.waitForTimeout(2000);
  await paymentsPage.searchTransaction(text); 
await page.waitForTimeout(2000);
  await paymentsPage.validateSearchResultsContain(text);
    
 });




  });

}); 