import { Page, Locator } from "@playwright/test";    
import { BasePage } from "../basePage";
import { CURRENT_ENV } from "../../tests/config/env";



export class UsersPage extends BasePage {

    //locators
readonly searchBox= this.page.locator('#searchInput'); 
readonly seaButton= this.page.locator('##searchBtn');   
readonly clearButton= this.page.locator('.button.button-clear');
readonly filterOptions= this.page.locator('#filter');

}