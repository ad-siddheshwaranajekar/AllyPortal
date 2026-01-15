import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login/loginPage';
import { ProfilePage } from '../../pages/allyProfile/ProfilePage';
import { generateUser } from '../../utils/testDataGenerator';




  test.describe(`Profile Page - Ally 1`, () => {
    let loginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      profilePage = new ProfilePage(page);

      await loginPage.navigate();
      await loginPage.loginAsAlly('1');
    });

    test('Verify logged ally details @smoke @regression', async () => {
      const profileValue = await profilePage.profileMenu.innerText();
      expect(profileValue).toBeTruthy();
      await profilePage.clickProfile();
    });

    test('Verify Profile page loads & User details visible @smoke @regression', async () => {
      await profilePage.clickProfile();
      const details = await profilePage.getUserDetails();

      expect(details['Username']).toBeTruthy();
      expect(details['Email']).toContain('@');
      expect(details['Phone']).toBeTruthy();
      expect(details['Address']).toBeTruthy();
    });

    test('Verify Actions section (Edit User + Change Password) @regression', async () => {
      await profilePage.clickProfile();
      await profilePage.verifyActionsSection();
    });

    test('Validate Change Password page navigation @smoke @regression', async ({ page }) => {
      await profilePage.clickProfile();
      await profilePage.clickChangePassword();

      await expect(page.getByRole('heading', { name: 'Change Password' })).toBeVisible();
      await expect(page).toHaveURL(/change-password/i);
    });
  });
  test.describe(`Profile Page - Ally 2`, () => {
    let loginPage;
    let profilePage: ProfilePage;

    test.beforeEach(async ({ page }) => {
      loginPage = new LoginPage(page);
      profilePage = new ProfilePage(page);

      await loginPage.navigate();
      await loginPage.loginAsAlly('2');
    });

    test('Verify user can update email @regression', async () => {
      const user = generateUser();

      await profilePage.clickProfile();
      await profilePage.clickEditUser();
      await profilePage.updateEmail(user.email);
      await profilePage.saveChanges();

      await expect(profilePage.successAlert).toBeVisible();
    });

    test('Verify validation for invalid email @regression', async () => {
      await profilePage.clickProfile();
      await profilePage.clickEditUser();
      await profilePage.updateEmail('invalidEmail@123');
      await profilePage.saveChanges();

      await profilePage.verifyInvalidEmailError();
    });

    test('Verify logout navigates to login page', async ({ page }) => {
      await profilePage.clickLogout();
      await expect(page).toHaveURL(/#\/login/);
    });
  });
