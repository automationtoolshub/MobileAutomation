/* eslint-disable @typescript-eslint/no-explicit-any */
import { After, Before } from '@wdio/cucumber-framework'
import { ApplicationConstants } from '../constants/ApplicationConstants'
import { Utility } from '../utility/Utility'
//import { CharlesProxy } from '../utility/CharlesProxy'
const deviceType = process.env.deviceType==null||process.env.deviceType==undefined?'ANDROID':''

After(async () => {
  try {
    if (deviceType?.toUpperCase() == ApplicationConstants.DEVICE_TYPE.IOS) {
        console.log('Terminate the app at end of each test case')
        await driver.terminateApp(
          ApplicationConstants.MOBILE_APP.IOS.APP_PACKAGE
        )
        console.log('successfully Terminate the app at end of each test case')
      
    }
    if (deviceType?.toUpperCase() == ApplicationConstants.DEVICE_TYPE.ANDROID) {
        await Utility.clearAndroidAppData(
          ApplicationConstants.getAppPackageForAndroid()
        )
        console.log('Terminate the app at end of each test case')
        await driver.terminateApp(
          ApplicationConstants.MOBILE_APP.ANDROID.APP_PACKAGE
        )
        console.log('successfully Terminate the app at end of each test case')
      
    }
  } catch (error: any) {
    console.error('Error occurred in After hook:', error)
  }
})

Before(async () => {
  if (deviceType?.toUpperCase() == ApplicationConstants.DEVICE_TYPE.IOS) {
    console.log('started launching ios app')
    await driver.execute('mobile: launchApp', {
      bundleId: ApplicationConstants.MOBILE_APP.IOS.APP_PACKAGE,
    })
    console.log('Successfully launched iOS app')
  }
  if (deviceType?.toUpperCase() === ApplicationConstants.DEVICE_TYPE.ANDROID) {
    console.log('started launching Android app')
    await driver.execute('mobile: activateApp', {
      appId: ApplicationConstants.MOBILE_APP.ANDROID.APP_PACKAGE,
    })
    console.log('Successfully launched Android app')
  }
})
