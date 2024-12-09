// import report from '@wdio/allure-reporter'

// import { PageObjectIos } from '../pageObject/PageObjectIos'
// import { PageObjectAndroid } from '../pageObject/PageObjectAndroid'
// import { ApplicationConstants } from '../constants/ApplicationConstants'

// export class Common {
//   public static async clickBackArrowForAndroid() {
//     try {
//       const element = await $(
//         PageObjectAndroid.COMMON.BACK_ARROW_BUTTON
//       )
//       await element.waitForDisplayed(ApplicationConstants.TIME_OUT.SHORT)
//       element.click()
//       report.addStep(`Clicked the Back Arrow in the page`)
//     } catch (error) {
//       console.log('Back Button is not available for click')
//     }
//   }

//   public static async clickBackArrowForIos() {
//     try {
//       const element = await $(PageObjectIos.COMMON.BACK_ARROW_BUTTON)
//       await element.waitForDisplayed(ApplicationConstants.TIME_OUT.SHORT)
//       element.click()
//       report.addStep(`Clicked the Back Arrow in the page`)
//     } catch (error) {
//       console.log('Back Button is not available for click')
//     }
//   }

//   public static async clickReturnKeyInTKeyboard() {
//     const element = await $(
//       PageObjectIos.FOOTER.MORE.SUBMIT_FEEDBACK.KEY_BOARD_RETURN_KEY
//     )
//     try {
//       if (await element.isDisplayed()) {
//         await element.click()
//       }
//     } catch (error) {
//       console.log('Keyboard is not displayed')
//     }
//   }

//   public static async clickSubmitButtonForAndroid() {
//     await driver.hideKeyboard()
//     const element = await $(PageObjectAndroid.COMMON.SUBMIT_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     await element.waitForEnabled()
//     expect(await element.isDisplayed()).toEqual(true)
//     await element.click()
//     report.addStep(`Clicked the Back Arrow in the page`)
//   }

//   public static async clickSubmitButtonForIos() {
//     await this.clickReturnKeyInTKeyboard()
//     const element = await $(PageObjectIos.COMMON.SUBMIT_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     expect(await element.isDisplayed()).toEqual(true)
//     await element.click()
//     report.addStep(`Clicked the Submit button`)
//   }

//   public static async clickCancelButtonForAndroid() {
//     const element = await $(PageObjectAndroid.COMMON.CANCEL_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     element.click()
//     report.addStep(`Clicked the Cancel button`)
//   }

//   public static async clickCancelButtonForIos() {
//     await this.clickReturnKeyInTKeyboard()
//     const element = await $(PageObjectIos.COMMON.CANCEL_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     element.click()
//     report.addStep(`Clicked the Cancel button`)
//   }

//   public static async clickSaveButtonForAndroid() {
//     const element = await $(PageObjectAndroid.COMMON.SAVE_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     element.click()
//     report.addStep(`Clicked the Save Button`)
//   }

//   public static async clickSaveButtonForIos() {
//     await this.clickReturnKeyInTKeyboard()
//     const element = await $(PageObjectIos.COMMON.SAVE_BUTTON)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     element.click()
//     report.addStep(`Clicked the Save Button`)
//   }

//   public static async clickAlertCloseButtonForAndroid() {
//     const element = await $(
//       PageObjectAndroid.COMMON.ALERT_CLOSE_BUTTON
//     )
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     element.click()
//     report.addStep(`Clicked the alert close button`)
//   }

//   public static async verifyAlertMessageIsDisplayed() {
//     const element = await $(PageObjectAndroid.COMMON.ALERT_MESSAGE)
//     await element.waitForDisplayed(ApplicationConstants.TIME_OUT.HIGH)
//     expect(await element.isDisplayed()).toEqual(true)
//     report.addStep('Alert message is displayed')
//   }

//   public static async hideKeyBoardForIos() {
//     const element = await $(
//       PageObjectIos.COMMON.KEY_BOARD_DONE_BUTTON
//     )
//     if (await element.isDisplayed()) {
//       await element.click()
//     }
//   }
//}
