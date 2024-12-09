/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs'
import { ChildProcess, execSync, spawn } from 'child_process'
import path from 'path'
import report from '@wdio/allure-reporter'
import { exec } from 'child_process'
import fsExtra from 'fs-extra'
import moment from 'moment'
import { ApplicationConstants } from '../constants/ApplicationConstants'

const deviceType = process.env.deviceType
export let logProcess: ChildProcess | null = null
export class Utility {
  public static async waitForElement(element: any) {
    await driver.waitUntil(
      async () => {
        return await element.isDisplayed()
      },
      {
        timeout: 10000,
      }
    )
  }

  public static async scrollToVerticalElementForAndroidByText(
    elementText: string
  ) {
    const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollTextIntoView("${elementText}")`
    await $(`android=${selector}`)
    report.addStep(`Successfully scrolled to ${elementText}`)
  }

  public static async scrollToHorizontalForAndroidByDirection(
    direction: string
  ) {
    console.log(direction)
  }

  public static async scrollToVerticalForAndroidByNumberOfSwipes(
    noOfSwipes: number
  ) {
    const selector = `new UiScrollable(new UiSelector().scrollable(true)).scrollToEnd(${noOfSwipes})`
    await $(`android=${selector}`)
  }

  public static async scrollVerticalToEndForIOS() {
    try {
      const { height, width } = await driver.getWindowRect()

      // Calculate start and end coordinates for the swipe
      const startX = width * 0.5
      const startY = height * 0.8
      const endY = height * 0.2

      // Perform swipe using touchPerform
      await driver.touchPerform([
        { action: 'press', options: { x: startX, y: startY } },
        { action: 'wait', options: { ms: 500 } }, // Optional wait time
        { action: 'moveTo', options: { x: startX, y: endY } },
        { action: 'release' },
      ])
    } finally {
      console.log('Scroll is not working')
      await driver.scroll()
    }
  }

  public static async scrollHorizontalForIOS1(elementSelector: string) {
    const startXPercent = 0.2 // Swipe start position as a percentage of section width
    const endXPercent = 0.8 // Swipe end position as a percentage of section width
    const y = 100 // Vertical position within the section (in pixels)
    const duration = 1000 // Duration of the swipe gesture in milliseconds

    const sectionElement = await $(elementSelector)
    const sectionLocation = await sectionElement.getLocation()
    const sectionSize = await sectionElement.getSize()
    const sectionWidth = sectionSize.width

    // Calculate the start and end coordinates within the section
    const startX = sectionLocation.x + sectionWidth * startXPercent
    const endX = sectionLocation.x + sectionWidth * endXPercent

    // Perform the swipe gesture within the section
    await browser.execute('mobile:gesture', {
      touchCount: 1,
      duration: duration,
      x: [startX, endX], // Combine start and end X coordinates into an array
      y: [y + sectionLocation.y, y + sectionLocation.y], // Adjust Y-coordinate to be relative to the screen and combine
      element: null, // For absolute coordinates
      type: 'drag',
    })
  }

  shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  // Function to run methods for one hour
  runMethodsForOneHour(arrayOfMethods: any) {
    const startTime = Date.now()
    const endTime = startTime + 60 * 60 * 1000 // 1 hour in milliseconds

    while (Date.now() < endTime) {
      this.shuffleArray(arrayOfMethods) // Shuffle the array before each iteration
      for (const method of arrayOfMethods) {
        method() // Execute each method in the shuffled array
      }
    }
  }

  public async getAppFileName() {
    try {
      // Read the directory
      let filePath = ''
      let isApkOrIpa: any
      let files = []
      if (deviceType?.toUpperCase() == 'ANDROID') {
        filePath = './app/android'
        files = fs.readdirSync(filePath)
        isApkOrIpa = files.filter((file: string) => file.endsWith('.apk'))
      } else {
        filePath = './app/ios'
        files = fs.readdirSync(filePath)
        isApkOrIpa = files.filter((file: string) => file.endsWith('.ipa'))
      }

      // If no APK files found, return null
      if (isApkOrIpa.length === 0) {
        return 'No files'
      }
      // Sort the APK files based on their version numbers
      isApkOrIpa.sort((a: any, b: any) => {
        // Extract version numbers from filenames (assuming format is X.Y.Z.apk)
        const versionA = (a.match(/\d+\.\d+\.\d+/) || [''])[0]
        const versionB = (b.match(/\d+\.\d+\.\d+/) || [''])[0]

        // Compare version numbers
        return versionB.localeCompare(versionA, undefined, { numeric: true })
      })
      console.log('apkFiles[0]', isApkOrIpa[0])
      // Return the name of the latest version APK file
      return isApkOrIpa[0]
    } catch (error) {
      console.error(
        'Error occurred while getting latest APK or IPA file:',
        error
      )
      return 'Error while getting files'
    }
  }

  public async getAppPackageForApk() {
    try {
      const latestApkFileName = await this.getAppFileName()
      if (!latestApkFileName) {
        console.error('No APK file found.')
        return 'N/A'
      }

      const latestApkFilePath = path.join(
        process.cwd(),
        'app/android',
        latestApkFileName
      )
      console.log('Apk File Path:', latestApkFilePath)

      if (!fs.existsSync(latestApkFilePath)) {
        console.error(`APK file not found at path: ${latestApkFilePath}`)
        return 'N/A'
      }

      // Execute the aapt command to dump the package name
      const output = execSync(
        `aapt dump badging ${latestApkFilePath} | grep package | awk '{print $2}' | sed s/name=//g | sed s/\\'//g`
      ).toString()

      // Extract the package name from the output
      const packageName = output.trim()
      console.log('Android app package name===>', packageName)
      return packageName
    } catch (error) {
      console.error('Error extracting package name from APK:', error)
      return 'N/A'
    }
  }

  public static async scrollHorizontalForIOS(
    elementSelector: string,
    direction: 'left' | 'right'
  ): Promise<void> {
    try {
      const element = await $(elementSelector)
      const elementId = element.elementId
      // Find the center of the container element
      const { x, y, width, height } = await element.getElementRect(elementId)

      // Determine the start and end positions based on direction
      const startX = direction === 'left' ? x + width * 0.8 : x + width * 0.2
      const endX = direction === 'left' ? x + width * 0.2 : x + width * 0.8
      const startY = y + height / 2

      // Perform the swipe action
      await driver.touchPerform([
        {
          action: 'press',
          options: { x: startX, y: startY },
        },
        {
          action: 'wait',
          options: { ms: 100 }, // Optional: Adjust as needed
        },
        {
          action: 'moveTo',
          options: { x: endX, y: startY },
        },
        {
          action: 'release',
        },
      ])
    } catch (error: any) {
      console.log('Horizontal scroll failed:')
      console.log(error.message)
      // Handle failure or cleanup if needed
    }
  }

  public static async scrollToBottomAgreementPageForIos() {
    const start = { x: 150, y: 700 } // Example start coordinates
    const end = { x: 150, y: 10 } // Example end coordinates
    const scrollDuration = 500 // Duration for each scroll

    // Define the number of scrolls you want to perform
    const numberOfScrolls = 18
    for (let i = 0; i < numberOfScrolls; i++) {
      console.log('no of iteration====', i)
      await driver
        .action('pointer')
        .move(start.x, start.y)
        .down()
        .move({ duration: scrollDuration, x: end.x, y: end.y })
        .perform()
    }
    // await driver.setTimeout({ implicit: 60000 })
    await driver.pause(1000) // Add a pause to ensure the swipe is completed
  }

  public static async swipeIntoViewIOS(
    xpath: string,
    maxScrolls = 25,
    amount = 0
  ): Promise<void> {
    // If the element is not displayed and we haven't scrolled the max amount of scrolls
    // then scroll and execute the method again
    //const element = $(`-ios predicate string:label LIKE + ${text}`)
    const element = await $(xpath)
    // If the element is already displayed, no need to swipe
    if (await element.isDisplayed()) {
      console.log('Element is visible and swipe action is not required')
      return
    }
    if (!(await element.isDisplayed()) && amount <= maxScrolls) {
      await driver.execute('mobile:swipe', { direction: 'up' })
      await driver.pause(1000)
      await this.swipeIntoViewIOS(xpath, maxScrolls, amount + 1)
      console.log('amount + 1==', amount + 1)
    } else if (amount > maxScrolls) {
      // If the element is still not visible after the max amount of scroll, let it fail
      throw new Error(
        `The element '${xpath}' could not be found or is not visible.`
      )
    }
  }

  public static async swipeIntoHorizontalIOS(
    xpath: string,
    maxScrolls = 25,
    amount = 0
  ): Promise<void> {
    // If the element is not displayed and we haven't scrolled the max amount of scrolls
    // then scroll and execute the method again
    //const element = $(`-ios predicate string:label LIKE + ${text}`)
    const element = await $(xpath)
    // If the element is already displayed, no need to swipe
    if (await element.isDisplayed()) {
      console.log('Element is visible and swipe action is not required')
      return
    }
    if (!(await element.isDisplayed()) && amount <= maxScrolls) {
      await driver.execute('mobile:swipe', { direction: 'right' })
      await driver.pause(1000)
      await this.swipeIntoViewIOS(xpath, maxScrolls, amount + 1)
      console.log('amount + 1==', amount + 1)
    } else if (amount > maxScrolls) {
      // If the element is still not visible after the max amount of scroll, let it fail
      throw new Error(
        `The element '${xpath}' could not be found or is not visible.`
      )
    }
  }
  public static async swipeIntoViewAndroid(partialText: string) {
    //pass the partial text
    const elementSelector = `new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().textContains("${partialText}"))`
    await $(`android=${elementSelector}`)
  }

  public static async swipeIntoHorizontalAndroid() {
    //const elementSelector = `new UiScrollable(new UiSelector().scrollable(true)).setAsHorizontalList().scrollForward()`
    const elementSelector = `new UiScrollable(new UiSelector().resourceId("com.netflix.homeapp.nightly:id/quickActionContainer")).setAsHorizontalList().scrollForward()`
    await $(`android=${elementSelector}`)
  }

  public static async clearAndroidLogs() {
    if (driver.isAndroid) {
      try {
        execSync('adb logcat -c')
        console.log('ADB logs cleared.')
      } catch (error) {
        console.error('Error clearing ADB logs:', error)
      }
    }
  }

  public static async attachAndroidDebugLogs(packageName: string) {
    if (driver.isAndroid) {
      try {
        const logDir = './logs'
        const currentTime = moment().format('YYYY-MM-DDHH:mm:ss')

        const logFileName = `android_logs_${currentTime}.txt`
        const logFilePath = `${logDir}/${logFileName}` // Adjust path as needed

        // Create the directory if it doesn't exist
        if (!fs.existsSync(logDir)) {
          fs.mkdirSync(logDir, { recursive: true })
        }
        const adbCommand = `adb logcat -d | grep "${packageName}" > ${logFilePath}`
        execSync(adbCommand)
        console.log(`ADB logs captured to: ${logFilePath}`)

        // Attach log file to Allure report
        report.addAttachment(
          'ADB Logs',
          fs.readFileSync(logFilePath),
          'text/plain'
        )
      } catch (error) {
        console.error('Error capturing ADB logs:', error)
      }
    } else {
      console.log('This is not Android application')
    }
  }

  public static async attachDebugLogs() {
    let packageName = ''
    if (driver.isAndroid) {
      packageName = ApplicationConstants.MOBILE_APP.ANDROID.APP_PACKAGE
      await this.attachAndroidDebugLogs(packageName)
    }
    if (driver.isIOS) {
      packageName = ApplicationConstants.MOBILE_APP.IOS.APP_PACKAGE
      await this.attachIosDebugLogs()
    }
  }
  public static async clearIosLogs() {
    if (driver.isIOS) {
      try {
        // Return a promise to handle the asynchronous exec call
        await new Promise<void>((resolve, reject) => {
          exec('killall -9 idevicesyslog', (error) => {
            if (error) {
              reject(new Error('Error clearing iOS logs: ' + error.message))
            } else {
              console.log('iOS logs cleared.')
              resolve()
            }
          })
        })
      } catch (error: any) {
        console.error(error.message) // Handle error in the catch block
      }
    }
  }

  public static startRecordingIosLogging() {
    console.log('Started system log for Ios')
    const logDir = './logs'
    const logFileName = `iosLog.txt`
    const logFilePath = `${logDir}/${logFileName}`
    // Ensure the logs directory exists
    fsExtra.removeSync(logDir)
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
      console.log('Creating iosLog folder in the root directory')
    }
    console.log(`file path ${logFilePath}`)
    logProcess = spawn('idevicesyslog', { stdio: ['ignore', 'pipe', 'pipe'] })

    logProcess?.stdout?.on('data', (data) => {
      fs.appendFileSync(logFilePath, data) // Append log output to the file
    })

    logProcess?.stderr?.on('data', (data) => {
      console.error(`stderr: ${data}`) // Handle any errors
    })

    return new Promise<void>((resolve, reject) => {
      logProcess?.on('spawn', () => {
        console.log('Log process initialized:', logProcess?.pid)
        console.log(`Started capturing logs to ${logFilePath}`)
        resolve() // Resolve the promise when the process starts
      })

      logProcess?.on('error', (error) => {
        console.error('Failed to start log process:', error)
        reject(error) // Reject the promise on error
      })

      logProcess?.on('exit', (code) => {
        console.log(`Log process exited with code: ${code}`)
      })
    })
  }

  public static async stopRecordingIosLogging() {
    if (driver.isIOS) {
      if (logProcess) {
        logProcess.kill('SIGINT') // Gracefully stop the logging process
        console.log('Stopped iOS logging process.')
        logProcess = null // Reset the log process
      } else {
        console.log('No logging process to stop.')
      }
    } else {
      console.log('This is not an iOS application')
    }
  }

  public static async attachIosDebugLogs() {
    await this.stopRecordingIosLogging()
    await new Promise((resolve) => setTimeout(resolve, 1000))
    if (driver.isIOS) {
      try {
        const logDir = './logs'
        const logFileName = `iosLog.txt`
        const fileName = `${logDir}/${logFileName}`
        const logContent = fs.readFileSync(fileName, 'utf8')
        report.addAttachment('iOS_Debug_Logs', logContent, 'text/plain')
      } catch (error) {
        console.error('Error capturing iOS logs:', error)
      }
    } else {
      console.log('This is not iOS application')
    }
  }

  public static killAppiumServer(port: number) {
    try {
      console.log(`Killing existing Appium server Port(${port})...`)
      execSync(`lsof -ti:${port} | xargs kill`) // -ti:port - listout and filter specific port and kill
      console.log(`Appium server Port(${port})killed successfully.`)
    } catch (error) {
      console.error(`Error killing Appium server Port(${port}):`, error)
    }
  }

  public static checkAppiumProcesses() {
    try {
      // Execute command to check for running Appium processes
      const appiumProcesses = execSync('pgrep -f "appium"')
        .toString()
        .trim()
        .split('\n')
      console.log('appium Process:', appiumProcesses)
      return appiumProcesses.length > 0
    } catch (error: any) {
      console.error(
        'Error checking for running Appium processes:',
        error.stderr ? error.stderr.toString() : error
      )
      return false
    }
  }

  public static async killAllAppiumServer() {
    try {
      console.log('Checking for running Appium processes...')
      if (this.checkAppiumProcesses()) {
        console.log('Killing all existing Appium server instances...')
        execSync('pkill -f "appium"', { stdio: 'inherit' })
        console.log('All Appium server instances killed successfully.')
      } else {
        console.log('No running Appium processes found.')
      }
    } catch (error: any) {
      console.error(
        'Error killing Appium server instances:',
        error.stderr ? error.stderr.toString() : error
      )
    }
  }

  public static async killAllAppiumServerByPort(port: number) {
    try {
      console.log('Checking for running Appium processes on port:', port)

      // Check for Appium processes on the specified port
      const processInfo = execSync(`lsof -i :${port}`, {
        stdio: 'pipe',
      }).toString()

      if (processInfo.includes('appium')) {
        console.log('Killing Appium server instances running on port:', port)
        const pidMatch = processInfo.match(/(\d+)/)
        if (pidMatch) {
          const pid = pidMatch[1]
          execSync(`kill -9 ${pid}`, { stdio: 'inherit' })
          console.log(`Appium server on port ${port} killed successfully.`)
        } else {
          console.log('No Appium process found for the specified port.')
        }
      } else {
        console.log('No running Appium processes found on the specified port.')
      }
    } catch (error: any) {
      console.error(
        'Error killing Appium server instances:',
        error.stderr ? error.stderr.toString() : error
      )
    }
  }

  public static async isAndroidApplicationInstalled(
    packageName: string,
    deviceUdid?: string
  ) {
    try {
      // Use ADB command to check if the application is installed for android apps
      const adbCommand = deviceUdid
        ? `adb -s ${deviceUdid} shell pm list packages | grep "${packageName}"`
        : `adb shell pm list packages | grep "${packageName}"`
      const result = execSync(adbCommand).toString()
      return result.includes(packageName)
    } catch (error) {
      console.error(
        'Failed to uninstall the application. It might not be installed.'
      )
      return false
    }
  }

  public static async uninstallAndroidApplication(
    packageName: string,
    deviceUdid?: string
  ) {
    if (deviceType?.toUpperCase() == 'ANDROID') {
      if (await this.isAndroidApplicationInstalled(packageName, deviceUdid)) {
        console.log('deviceUUID: ', deviceUdid)
        try {
          // Use ADB command to uninstall the application for android
          const adbUninstallCommand = deviceUdid
            ? `adb -s ${deviceUdid} uninstall ${packageName}`
            : `adb uninstall ${packageName}`
          execSync(adbUninstallCommand)
          console.log('Application uninstalled successfully.')
        } catch (error: any) {
          console.error('Error occurred while uninstalling application:', error)
        }
      }
    }
  }

  public static async uninstallIosApplication(
    bundleIdentifier: string,
    deviceUdid: string
  ) {
    if (deviceType?.toUpperCase() == 'IOS') {
      // Construct the command to list installed applications
      const listCommand = `ideviceinstaller -u ${deviceUdid} -l`

      // Execute the command to list installed applications
      exec(listCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error: ${error.message}`)
          return
        }
        if (stderr) {
          console.error(`stderr: ${stderr}`)
          return
        }

        // Check if the bundle identifier of the app is present in the output
        if (stdout.includes(bundleIdentifier)) {
          console.log(
            `App with bundle identifier '${bundleIdentifier}' is present on the device.`
          )
          // If the app is present, construct the command to uninstall it
          const uninstallCommand = `ideviceinstaller -u ${deviceUdid} -U ${bundleIdentifier}`
          // Execute the command to uninstall the app
          exec(uninstallCommand, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error: ${error.message}`)
              return
            }
            if (stderr) {
              console.error(`stderr: ${stderr}`)
              return
            }
            console.log(`stdout: ${stdout}`)
          })
        } else {
          console.log(
            `App with bundle identifier '${bundleIdentifier}' is not present on the device.`
          )
        }
      })
    }
  }

  public static async clearAndroidAppData(packageName: string) {
    const command = `adb shell pm clear ${packageName}`

    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error clearing app data: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`Error output: ${stderr}`)
        return
      }
      console.log(`App data cleared successfully for Android: ${stdout}`)
    })
  }

  public static async clearIosAppData(packageName: string) {
    //await driver.execute('mobile: clearAppData', { bundleId: packageName })
    try {
      await driver.execute('mobile: resetApp', { bundleId: packageName })
      console.log('App data cleared successfully for iOS')
    } catch (error) {
      console.log(`Error while clearing app data for iOS: ${error}`)
    }
  }

  //to prevent invalid session id: invalid session id while running androd apps
  public static async uninstallUIAutomator2AppsFromMobile(deviceUdid: string) {
    if (deviceType?.toUpperCase() == 'ANDROID') {
      console.log(`Device UUID:${deviceUdid}`)
      const uiAutomator2PackageName = [
        'io.appium.uiautomator2.server',
        'io.appium.uiautomator2.server.test',
      ]
      for (const packageName of uiAutomator2PackageName) {
        try {
          execSync(`adb -s ${deviceUdid} uninstall ${packageName}`)
          console.log(`Uninstalled ${packageName} successfully.`)
        } catch (error: any) {
          console.error(`Failed to uninstall ${packageName}: ${error.message}`)
        }
      }
    }
  }

  public static async writeJsonFile(data: any) {
    // Convert the array to JSON format
    const jsonData = JSON.stringify(data, null, 2) // null and 2 are optional for pretty formatting

    // Specify the folder path
    const folderPath = path.join(process.cwd(), 'output') // Create a folder named 'myFolder' in the root directory

    // Create the folder if it doesn't exist
    if (fs.existsSync(folderPath)) {
      fsExtra.removeSync(folderPath)
    }

    // Create the folder
    fs.mkdirSync(folderPath)

    // Specify the file path
    const filePath = path.join(folderPath, 'speedTest.json')

    // Write the JSON data to the file
    fs.writeFile(filePath, jsonData, (err) => {
      if (err) {
        console.error('Error creating JSON file:', err)
      } else {
        console.log('JSON file has been created under', folderPath)
      }
    })
  }
  //data should be array of Object
  public static async writeJsonFileForSSOMonitoring(
    data: any,
    fileName: string
  ) {
    // Specify the folder path
    const folderPath = path.join(process.cwd(), 'output') // Create a folder named 'output' in the root directory

    try {
      // Ensure the folder exists, create it if not
      await fsExtra.ensureDir(folderPath)

      // Specify the file path
      const filePath = path.join(folderPath, fileName)

      let existingData = []
      if (fs.existsSync(filePath)) {
        // Read existing JSON data from the file
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        existingData = JSON.parse(fileContent)
      }

      // Append new data to the existing array
      existingData.push(...data)

      // Convert the array to JSON format
      const jsonData = JSON.stringify(existingData, null, 2) // null and 2 are optional for pretty formatting

      // Write the JSON data back to the file
      await fs.promises.writeFile(filePath, jsonData, 'utf8')

      console.log(`Data has been appended to ${filePath}`)
    } catch (err) {
      console.error('Error appending data to JSON file:', err)
    }
  }

  public static async writeJsonFileForSpeedTest(data: any, fileName: string) {
    // Specify the folder path
    const folderPath = path.join(process.cwd(), 'output') // Create a folder named 'output' in the root directory

    try {
      // Ensure the folder exists, create it if not
      await fsExtra.ensureDir(folderPath)

      // Specify the file path
      const filePath = path.join(folderPath, fileName)

      let existingData = []
      if (fs.existsSync(filePath)) {
        // Read existing JSON data from the file
        const fileContent = await fs.promises.readFile(filePath, 'utf8')
        existingData = JSON.parse(fileContent)
      }

      // Append new data to the existing array
      existingData.push(...data)

      // Convert the array to JSON format
      const jsonData = JSON.stringify(existingData, null, 2) // null and 2 are optional for pretty formatting

      // Write the JSON data back to the file
      await fs.promises.writeFile(filePath, jsonData, 'utf8')

      console.log(`Data has been appended to ${filePath}`)
    } catch (err) {
      console.error('Error appending data to JSON file:', err)
    }
  }

  public static async waitAppiumSession(
    duration: number,
    timeUnit: string
  ): Promise<void> {
    let durationInMilliSec: number

    // Convert time unit to milliseconds
    switch (timeUnit.toUpperCase().trim()) {
      case 'MINUTES':
        durationInMilliSec = duration * 60 * 1000 // Convert minutes to milliseconds
        break
      case 'HOURS':
        durationInMilliSec = duration * 60 * 60 * 1000 // Convert hours to milliseconds
        break
      default:
        throw new Error(
          'Invalid time unit specified. Please use "minutes" or "hours".'
        )
    }

    // Log the initial duration for debugging
    console.log('Duration in milliseconds:', durationInMilliSec)

    // Calculate the number of iterations
    const iterations = Math.ceil(durationInMilliSec / 1000) // Assuming checking every second

    // Loop to log current activity at specified intervals
    for (let i = 0; i < iterations; i++) {
      try {
        let context: string
        if (driver.isAndroid) {
          context = await driver.getCurrentActivity()
        } else if (driver.isIOS) {
          const iOScontext: any = await driver.getContext() // Use driver.getContext() for iOS
          context = iOScontext.toString()
        } else {
          throw new Error('Unsupported platform')
        }
        console.log(
          'Current context (iteration ' + (i + 1) + '/' + iterations + '):',
          context
        )
      } catch (error) {
        console.error('Error getting current context:', error)
      }
      await driver.pause(1000) // Pause for 1 second (adjust as needed)
    }
  }

  public static async createPropertiesFile(buildInfo: any): Promise<void> {
    try {
      // Define the content for the .properties file
      const propertiesContent = `OS=${buildInfo.os}\nAppName=${buildInfo.appName}\nVersion=${buildInfo.version}\nPackageName=${buildInfo.packageName}`
      console.log('propertiesContent:', propertiesContent)

      // Define the path to the properties file inside the allure-results folder
      const allureResultsDir = path.join(
        process.cwd(),
        'reports/allure-results'
      )
      const outputFilePath = path.join(
        allureResultsDir,
        'environment.properties'
      )
      // Ensure the allure-results directory exists
      if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir, { recursive: true })
      }

      // Write the properties content to the file
      fs.writeFileSync(outputFilePath, propertiesContent, 'utf8')

      console.log(`Properties file created at ${outputFilePath}`)
    } catch (error: any) {
      console.error(`Error creating properties file: ${error.message}`)
    }
  }

  public static async createPropertiesFileForProdApps(
    deviceType: any
  ): Promise<void> {
    try {
      let packageName = ''
      let version = ''
      if (deviceType?.toUpperCase().trim() == 'ANDROID') {
        packageName = ApplicationConstants.getAppPackageForAndroid()
        version = execSync('./getProdApkVersion.sh').toString().trim()
      } else if (deviceType?.toUpperCase().trim() == 'IOS') {
        packageName = ApplicationConstants.getAppPackageForIOS()
        version = execSync('./getProdIosVersion.sh').toString().trim()
      } else {
        throw new Error(`Unsupported device type: ${deviceType}`)
      }
      // Define the content for the .properties file
      const propertiesContent = `OS=${deviceType?.toUpperCase()}\nAppName=${ApplicationConstants.APP_NAME}\nVersion=${version}\nPackageName=${packageName}`
      console.log('propertiesContent:', propertiesContent)

      // Define the path to the properties file inside the allure-results folder
      const allureResultsDir = path.join(
        process.cwd(),
        'reports/allure-results'
      )
      const outputFilePath = path.join(
        allureResultsDir,
        'environment.properties'
      )
      // Ensure the allure-results directory exists
      if (!fs.existsSync(allureResultsDir)) {
        fs.mkdirSync(allureResultsDir, { recursive: true })
      }

      // Write the properties content to the file
      fs.writeFileSync(outputFilePath, propertiesContent, 'utf8')

      console.log(`Properties file created at ${outputFilePath}`)
    } catch (error: any) {
      console.error(`Error creating properties file: ${error.message}`)
    }
  }

  public static async isElementVisible(elem: any) {
    const exists = await elem.isExisting() // Check if the element exists in the DOM

    if (!exists) {
      return false // If the element does not exist, it is not visible
    }
    const displayed = await elem.isDisplayed() // Check if the element is displayed (visible)
    return displayed // If the element exists and is displayed, return true; else false
  }
}
