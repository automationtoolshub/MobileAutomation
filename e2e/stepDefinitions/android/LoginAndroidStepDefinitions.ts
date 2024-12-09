import { Given, Then, When } from '@wdio/cucumber-framework'
import { LoginAndroid,  } from '../../pages/android/LoginAndroid'

const loginAndroid = new LoginAndroid()

Given(/^Load the Application for android$/, async () => {
	
});


Then(/^Click Get Started button for android$/, async () => {
	await loginAndroid.clickGetStartedButton()
	
});


Then(/^Click Sign in Option for android$/, async () => {
	await loginAndroid.clickSignInOption()
});



Then(/^Enter user "([^"]*)" in the text box for android$/, async (emailAddress:string) => {
	await loginAndroid.enterEmmail(emailAddress)
	await driver.pause(2000)
});



Then(/^Negative Condition for android$/, async () => {
	await loginAndroid.negativeScenario()
});



Then(/^Enter "([^"]*)" in the email or phonumber text box for android$/, async (emailAddress:string) => {
	await loginAndroid.enterEmmailOrPhone(emailAddress)
});
