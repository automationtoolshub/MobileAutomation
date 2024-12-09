**netflixHome - Mobile Automation**

This Repository is created for testing the netflixHome Mobile App.

**Prerequisite**

1. Install Visual Studio Code IDE
2. Type node -v command to verify the node version
3. If node is not installed run the following command brew install node (After install just ensure Node version and it should be >16)

**Steps for running Scripts**

1. clone the project from master branch
2. npm install (run this command from where package.json is present)
3. Connect your physical mobile devices (Enable Usb debugging in phone settings )
4. npm run android or npm run ios (Ex: if you run this command via terminal including env variables Ex: deviceType=android buildType=uat npm run androidLocal . More info refer the scripts block in package.json )
5. npm run report (To Generate cucumber report)
6. npm run allure (To Generate allure report)
7. Once run the step 5 command, browser will opene with the following pattern http://<some ip address?:<portnumber> (Ex: http://192.168.0.11:55749/)
8. Just change the url as http://localhost:55749 to view the report.

**Appium WebDriverIO Folder Structure**

1. **e2e\pageObject** - Keeping all page object realted files for each UI page
2. **e2e\page** - keeping functions for each UI page
3. **e2e\stepDefinitions** - keep all step definition files which are generated from feature file
4. **e2e\Constants** - To maintain all constant variables like url,label text, button text, etc..
5. **e2e\features** - To write use cases in Gherkin language and save the file in .feature extension
6. **e2e\utility** - Written common function
7. **e2e\testData** - To maintain test data
8. **e2e\api** - To maintain api related files
9. **e2e\jenkins** - To maintain jenkins pipeline jobs
10. **e2e\config\wdio.config.android.ts** - This file is present in the root directory. Webdriver IO will take this configuration file if run the following command **wdio run ./config/wdio.conf_android.ts --cucumberOpts.tags='@smoke'**
11. **wdio.config.android.ts** - This file is present in the root directory. Webdriver IO will take this configuration file if run the following command **wdio run ./wdio.conf_ios.ts --cucumberOpts.tags='@smoke'**

**TestData**

1. While running local machine, we are placing the data.json file under e2e/testData folder. But we are not checking this file in Bitbucket due to security reason.
2. data.json file will be stored in Jenkins portal (under Credentials section). This file automatically downloaded and placed under e2e/testData folder while running jobs in Jenkins.
3. If you want to modify test data then every time latest files should be loaded to Jenkins portal


**Local Setup for Android and IOS App Testing**

**Appium Setup**

1.  Install Appium Desktop
2.  Install Appium Inspector

**Android Device Setup**

1.  Install Android Studio - It has Android device Manager, this will allow to create Android Emulator (Visual android device). Once this is installed then setup ANDROID_HOME path variable
2.  Appium Inspector - In the  Appium server tab, just specified the below capabilities and change port number as 4274 then click start session.
    {
    "platformName": "Android",
    "deviceName": "Pixel 7”,
    "platformVersion": "11.0",
    "automationName": "UIAutomator2",
    "app": "apk file path",
    "appium:adbExecTimeout": 120000
    }
    some case, we have provide the package and activity name
    {
    "platformName": "Android",
    "appium:deviceName": "Pixel 7",
    "appium:platformVersion": "11.0",
    "appium:automationName": "UIAutomator2",
    "appium:app": "apk file path",
    "appium:adbExecTimeout": 120000,
    "appium:appPackage": "com.netflix.sample.nightly",
    "appium:appActivity": "com.netflix.sample.app.dashboard.DashboardActivity"
    }

3.  This will open the .apk application in virtual device then you can inspect element.

4.  uiautomator2 driver Install - Run the following command npx appium driver install uiautomator2
5.  Appium-doctor - Run Appium doctor command npx appium-doctor —android and verify that all are installed properly.
6.  UIAutomator  - It will provide UI selector library and able to identify webelements
    https://developer.android.com/reference/androidx/test/uiautomator/UiSelector

7.  Package and Activity - Package name is referring appPackage name (‘com.google.android.youtube’). Activity is referring to certain screen, Main Activity. (It is kind of Deep link, you can navigate to specific page instead of going sequentially)
8.  In Appium inspector too, click Action tab, you will see start activity, current activity, current package
    If you click current activity, it will show the activity name as “.app.AlertDialogSample” and current package is displayed as ”io.appium.android.apis”
9.  wdio.conf.ts - Mention android capabilities under capabilities in the wido config file
10. Run test case using webdriverIO - Run the following command npx wdio run ./wdio.conf.ts . Before running the command ensure that specific desired capability virtual device is opened
11. Web View - if click contact us option, this will redirect to browser to open the content. For automate this page you can find the current context (Appium inspector, click Actions then select Context drop down then click get current context button and extract the data
12. driver.getContext() - get the current context information
13. driver.getContexts() - get all context information
14. driver.swithContext(‘WEBVIEW_chrome’) - passing specific web contextdriver.swithContext(‘NATIVE APP’) - again switching back to native

**Commands**

1. **appium -p 4724** - start Appium server using port 4724 (you can changes port number based on what was mentioned in the appium inspector)
2. **killall adb** - To kill all adb instances
3. **adb devices** - List out all connected devices in the machine

**IOS Device Setup**

1. Install Xcode - This will allow to create simulator (virtual IOS devices) - This will be available in App Store
2. Xcode command line tools - you can install using the following command xcode-select --install
3. Carthage - Need to install Carthage using the following command brew install Carthage
4. Xcuitest - Install Xcuites driver using the following command “npx appium driver install xcuitest”
5. Appium-doctor - Run Appium doctor command npx appium-doctor —ios and verify that all are installed properly.
6. Appium Inspector - In the  Appium server tab, just specified the below capabilities and change port number as 4274 then click start session.
7. Open Xcode app, then click window from the menu bar and click Device and simulators t{
     "platformName": "ios",
     "deviceName": "iPhone 14",
     "platformVersion": "16”.4,
     "automationName": "XCUITest",
     "app": "/Users/manoka5/Documents/Workspace/MobileAutomation/app/android/ApiDemos-debug.app”
   }
8. wdio.conf.ts - Mention android capabilities under capabilities in the wido config file
9. Run test case using webdriverIO - Run the following command npx wdio run ./wdio.conf.ts .unlike android this will automatically open the device and open the appropriate application
10. Web View - if click contact us option, this will redirect to browser to open the content. For automate this page you can find the current context (Appium inspector, click Actions then select Context drop down then click get current context button and extract the data
    driver.getContext() - get the current context information
    driver.getContexts() - get all context information
    driver.swithContext(‘WEBVIEW_chrome’) - passing specific web context
    driver.swithContext(‘NATIVE APP’) - again switching back to native

**Commands**

1.  **xcrun xctrace list devices** - list of all connected iOS devices

**Appium Issues and Resolution**

1.**Unable to launch WebDriverAgent. Original error: xcodebuild failed with code 70.**
a. Open Appium inspector and ensure that able to connect specific device, if it works then try to run script again
b. if option a is not working, then follow below steps
1.Login with a acccount
2.npm uninstall -g appium
3.npm install -g Appium
4.open webdriveragent from the below path /Users/<userName>/.appium/node_modules/appium-xcuitest-driver/node_modules/appium-webdriveragent and do the sigining process and build project
