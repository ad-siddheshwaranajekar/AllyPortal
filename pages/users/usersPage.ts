import { Page, Locator, expect } from "@playwright/test";    
import { BasePage } from "../basePage";
import { CURRENT_ENV } from "../../tests/config/env";
import { SideMenuPage } from "../SideMenuPage";
import { LoginPage } from "../login/loginPage";
import { AddUserPage } from "./addUserPage";
import { CommonUtils } from "../../utils/commonUtils";
import { generateUser } from "../../utils/testDataGenerator";       
 import { TableUtil } from "../../utils/tableUtils/tableUtil";




export class UsersPage extends BasePage {
    readonly page: Page;
    readonly tableUtil: TableUtil;  
    constructor(page: Page) {
        super(page);
        this.page = page;
        this.tableUtil = new TableUtil(page); 
    }

    //locators
readonly searchBox= this.page.locator('#searchInput'); 
readonly seaButton= this.page.locator('##searchBtn');   
readonly clearButton= this.page.locator('.button.button-clear');
readonly filterOptions= this.page.locator('#filter');

}