import { test, expect, request } from '@playwright/test';
import paymentTestData from '../../testData/Payments/paymentTestdate.json';
import { PaymentWidgetPage } from '../../pages/payments/PaymentWidgetPage';

test('Create Payment Token → Open Payment Widget', async ({ page }) => {

  const apiContext = await request.newContext({
    baseURL: paymentTestData.baseURL,
    extraHTTPHeaders: {
      ...paymentTestData.headers,
      'Content-Type': paymentTestData.contentType
    }
  });

  // Generate dynamic title
  const dynamicTitle = `PlaywrightTitle_${Date.now()}`;

  // Generate random amount between 200 and 500
  const randomAmount = Math.floor(Math.random() * (500 - 200 + 1)) + 200;

  // Clone requestBody and override title and amount
  const requestBody = {
    ...paymentTestData.requestBody,
    title: dynamicTitle,
    amount: randomAmount
  };

  console.log('🔹 Request Body:\n', JSON.stringify(requestBody, null, 2));

  const response = await apiContext.post('', { data: requestBody });

  // Hardcoded 201 check
  expect(response.status()).toBe(201);

  const data = await response.json();
  const paymentToken = data.paymentToken;

  const finalURL = `${paymentTestData.paymentWidgetURL}${paymentToken}`;
  await page.goto(finalURL);

  const paymentWidgetPage = new PaymentWidgetPage(page);
  await paymentWidgetPage.verifyPageLoaded();
  
 // await page.waitForSelector('text=Payment', { timeout: 15000 });

  console.log(' Payment Token:', paymentToken);
  console.log(' Amount:', randomAmount);
  console.log(' Opening Widget:', finalURL);
  console.log('✅ Payment widget opened successfully');
});
