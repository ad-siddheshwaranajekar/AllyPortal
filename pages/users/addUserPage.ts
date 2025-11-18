import { Page, expect } from "@playwright/test";
import { BasePage } from "../basePage";
import { CURRENT_ENV } from "../../tests/config/env";   

export class AddUserPage extends BasePage {

    //locators
    readonly url: string;
    readonly firstNameInput= this.page.locator("//div[contains(@class,'button-green') and contains(., 'Add User')]");
}