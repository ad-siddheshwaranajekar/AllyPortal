import {test, expect} from '@playwright/test';
import {PaymentsPage} from '../../pages/payments/paymentsPage';
import {CURRENT_ENV} from '../../tests/config/env';
import {SideMenuPage} from '../../pages/SideMenuPage';
import {LoginPage} from '../../pages/login/loginPage';  
import {CommonUtils} from '../../utils/commonUtils';
import { log } from 'console';
import  loginData  from '../../testData/loginData.json';
import { RefundTestData } from '../../testData/testDataTypes';  
import refundData from '../../testData/refundData.json';  


const refundTestData: RefundTestData[] = refundData;

 test.describe('Payments Module', () => {
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


     // tests cases start here//


    test('Validate Payments Page Loads Correctly @smoke @regression', async ({page}) => {

        await paymentsPage.validatePaymentsPageLoaded();
    });

 test('Verify Search Functionality @smoke @regression', async ({ page }) => {
  await paymentsPage.validatePaymentsPageLoaded();

  const text = 'reference'; // Example transaction

  // Perform search
  await paymentsPage.searchTransaction(text);

  // Wait for at least one row that matches the search text to appear
  const filteredRow = paymentsPage.resultsRows.filter({ hasText: text }).first();
  await filteredRow.waitFor({ state: 'visible', timeout: 30000 });

  // Validate that search results contain the text
  await paymentsPage.validateSearchResultsContain(text);
});


 test(' Validate Transaction Count is Visible @regression', async ({page}) => {

  await paymentsPage.validatePaymentsPageLoaded();
  await paymentsPage.validateTransactionCountVisible();   
 });

 test(' Validate Payments Table Header Names @regression', async ({page}) => {

  await paymentsPage.validatePaymentsPageLoaded();
  await paymentsPage.validatePaymentSTableHeaderName();   
 }); 


 test(' Validate Items Per Page Options @regression', async ({page}) => {

  await paymentsPage.validatePaymentsPageLoaded();
  await paymentsPage.validateItemsPerPageOptions();   
 });
  test('Validate teh invalid search shows no results @regression', async ({page}) => {

    await paymentsPage.validatePaymentsPageLoaded();
    await page.waitForTimeout(2000); // Wait for any dynamic content to load
    const text = 'invalid-transaction-id-12345'; // Example invalid transaction ID
    await page.waitForTimeout(2000);
    await paymentsPage.searchTransaction(text); 
    await page.waitForTimeout(2000);
    await paymentsPage.validateNoSearchResults(); 
   });

//    test('Validate sorting for Payments Table columns @regression', async ({ page }) => {
//   await paymentsPage.validatePaymentsPageLoaded();
//  await page.waitForTimeout(10000); // Wait for any dynamic content to load
//   await paymentsPage.validateSorting(
//     paymentsPage.headerDBAName,
//     paymentsPage.colDBAName
//   );
// await page.waitForTimeout(10000); 
//   await paymentsPage.validateSorting(
//     paymentsPage.headerDBAName,
//     paymentsPage.colDBAName
//   );
 //
// });
 
  
  
  // test.only("Validate that the Ally is able to see all refund transactions associated with the original transaction ID @regression", async ({ page }) => {
  // const searchText = refundData[0].searchText;
  // const expectedMainStatus = "Refunded";
  // const expectedNestedStatus = "Refund Settled";

  // await paymentsPage.searchTransaction(searchText);

  // await paymentsPage.validateRefundFlow(
  //   searchText,
  //   expectedMainStatus,
  //   expectedNestedStatus
  // );
  //   });

  //await paymentsPage.validateSearchResultStatus(searchResult);

   });



