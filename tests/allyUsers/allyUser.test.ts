import { test, expect } from '@playwright/test';

import { LoginPage } from '../../pages/login/loginPage';
import { SideMenuPage } from '../../pages/SideMenuPage';

import { UsersPage } from '../../pages/users/usersPage';

test.describe('Users - Search/Filter/Table', () => {
  let loginPage: LoginPage;
  let sideMenuPage: SideMenuPage;
  let usersPage: UsersPage;
 

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    sideMenuPage = new SideMenuPage(page);
    usersPage = new UsersPage(page);
  

    // Login + navigate to Users page
    await loginPage.navigate();
    await loginPage.loginAsAlly();
    await sideMenuPage.openUsers();

    // Ensure page loade
    await usersPage.validateUsersPageLoaded();
  });

  // ---------------------------------------------
  // 1️⃣ Validate Users page loads
  // ---------------------------------------------
  test('Verify the Users page loads correctly @smoke @regression', async () => {
    await usersPage.validateUsersPageLoaded();
  });

  // ---------------------------------------------
  // 2️⃣ Search by username
  // ---------------------------------------------
  test('Verify that an Ally can search for a user by username @smoke @regression', async () => {
    const username = 'testnew123'; // valid test data
    await usersPage.searchUser(username);
    await usersPage.validateSearchResults(username);
  });

  // ---------------------------------------------
  // 3️⃣ Clear search and reload full list
  // ---------------------------------------------
  test('Verify that an Ally can clear the search field @smoke @regression', async () => {
    const username = 'testnew123';
    await usersPage.searchUser(username);
    await usersPage.validateSearchResults(username);
    await usersPage.clearSearch();
    //await usersPage.validateAllRecordsLoaded();
  });

  // ---------------------------------------------
  // 4️⃣ Items Per Page Options
  // ---------------------------------------------
  // test('Validate Items Per Page Options @regression', async () => {
  //   await usersPage.validateUsersPageLoaded();
  //   await usersPage.validateItemsPerPageOptions();
  // });

  // ---------------------------------------------
  // 5️⃣ Activate an inactive user
  // ---------------------------------------------
  test('Verify that an Ally user can successfully activate an inactive user account', async ({ page }) => {
    // Using the same usersPage instance from beforeEach
    const firstRow = usersPage.firstRow();
    const status = await usersPage.getStatus(firstRow);
    console.log(`Current status: ${status}`);

    if (status === 'Inactive') {
      await usersPage.clickAction(firstRow, 'Activate');
    } else {
      console.log('User is already Active. Skipping.');
    }
  });

  // ---------------------------------------------
  // 6️⃣ Deactivate the first active user
  // ---------------------------------------------
  test('Validate that an Ally can successfully deactivate an active user account', async ({ page }) => {
    await usersPage.validateUsersPageLoaded();
    await usersPage.deactivateFirstActiveUser();
  });
});
