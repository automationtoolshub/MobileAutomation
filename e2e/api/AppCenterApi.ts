// /* eslint-disable @typescript-eslint/no-explicit-any */
// import axios from 'axios'
// import * as path from 'path'
// import * as fs from 'fs'
// import https from 'https'
// import assert from 'assert'
// import { exec } from 'child_process'
// import { ApplicationConstants } from '../constants/ApplicationConstants'
// import { Utility } from '../utility/Utility'
// let downloadResponseData: any
// const buildType = process.env.buildType
// const deviceType = process.env.deviceType
// const password = process.env.password
// export const buildInformation: any = {}
// export class AppCenterApi {
//   public static async getLatestBuildIdFromAppStore() {
//     const url = ApplicationConstants.API.APP_netflix_HOME_BUILD_URL
//     try {
//       const config = {
//         method: 'get',
//         url: url,
//         headers: {
//           'X-API-Token': ApplicationConstants.API.APP_STORE_AUTH_TOKEN,
//         },
//       }
//       const response = await axios(config)
//       assert.strictEqual(response.status, 200)
//       //console.log('===response', response)
//       const responseData = response?.data
//       responseData.sort(
//         (a: any, b: any) =>
//           (new Date(b.uploaded_at).getTime() as number) -
//           (new Date(a.uploaded_at).getTime() as number)
//       )
//       const latestBuildId = responseData[0].id
//       console.log('Get Latest Build ID=====>', latestBuildId)
//       return latestBuildId
//     } catch (error) {
//       console.error('Error Response:', error)
//       throw error
//     }
//   }

//   public static async getLatestDownloadUrlFromAppStore(buildId: number) {
//     const url = ApplicationConstants.API.APP_netflix_HOME_BUILD_URL
//     try {
//       const config = {
//         method: 'get',
//         url: url + String(buildId),
//         headers: {
//           'X-API-Token': ApplicationConstants.API.APP_STORE_AUTH_TOKEN,
//         },
//       }
//       const downloadResponse = await axios(config)
//       assert.strictEqual(downloadResponse.status, 200)
//       downloadResponseData = downloadResponse?.data
//       const downloadUrl = downloadResponseData?.download_url
//       console.log('Download Build API url: ', url)
//       console.log('App Download url =====>', downloadUrl)
//       return downloadUrl
//     } catch (error) {
//       console.error('Error Response:', error)
//       throw error
//     }
//   }

//   public static async getAppOs() {
//     return await downloadResponseData?.app_os
//   }

//   public static async getAppName() {
//     return await downloadResponseData?.app_name
//   }

//   public static async getPackageVersion() {
//     let packageVersion = ''
//     if (ApplicationConstants.getBuildUrl().toUpperCase().includes('IOS')) {
//       packageVersion =
//         (await downloadResponseData?.short_version) +
//         ` (${await downloadResponseData?.version})`
//     } else {
//       packageVersion = await downloadResponseData?.short_version
//     }
//     return packageVersion
//   }

//   public static async getAppPackage() {
//     const packageName = await downloadResponseData?.bundle_identifier
//     console.log('packageName:', packageName)
//     return packageName
//   }

//   public static async downloadFile(downloadUrl: string): Promise<void> {
//     let attempts = 0
//     let response

//     while (attempts < 2) {
//       try {
//         response = await axios({
//           method: 'get',
//           url: downloadUrl,
//           responseType: 'arraybuffer',
//           httpsAgent: new https.Agent({
//             // For self-signed certificates, you could also add
//             rejectUnauthorized: false,
//           }),
//         })

//         // Check if response status is 200
//         if (response.status === 200) {
//           // If response status is 200, break the loop
//           break
//         }
//       } catch (error: any) {
//         // Log any errors that occur
//         console.error(`Attempt ${attempts + 1} failed: ${error.message}`)
//       }
//       // Increment attempts
//       attempts++
//     }

//     if (response && response.headers['content-type']) {
//       const contentType = response.headers['content-type']

//       let fileExtension = ''
//       let outputDir = ''

//       // Determine the file extension based on the content type
//       if (contentType.includes('application/octet-stream')) {
//         fileExtension = '.ipa' // Assuming it's an iOS IPA file
//         outputDir = './app/ios'
//       } else if (
//         contentType.includes('application/vnd.android.package-archive')
//       ) {
//         fileExtension = '.apk' // Assuming it's an Android APK file
//         outputDir = './app/android'
//       } else {
//         throw new Error('Unsupported file type')
//       }

//       // Generate a unique filename
//       const fileName = `netflixHome${fileExtension}`
//       const filePath = path.join(outputDir, fileName)

//       // Write the downloaded file to the specified output directory
//       fs.writeFileSync(filePath, await response.data, 'binary')
//       console.log(`File downloaded and saved: ${filePath}`)
//       fs.chmodSync(filePath, '755')
//       console.log(`Access Permissions provided for: ${filePath}`)
//     } else {
//       throw new Error('No content-type header received')
//     }
//   }

//   public static async generateSignedBuildForIOS() {
//     const projectRoot = process.cwd()
//     if (deviceType?.toUpperCase() == 'IOS') {
//       const appIOSFolderPath = path.join(projectRoot, 'app', 'ios/')
//       console.log('appIOSFolderPath==', appIOSFolderPath)

//       // Change directory to app/ios
//       process.chdir(appIOSFolderPath)

//       let scriptName = ''

//       if (
//         buildType?.toUpperCase() === 'UAT' ||
//         buildType?.toUpperCase() === 'PROD'
//       ) {
//         // Correct syntax for if condition
//         scriptName = './signall_uat.sh'
//       } else if (buildType?.toUpperCase() === 'REGRESSION') {
//         // Correct syntax for else if condition
//         scriptName = './signall_regression.sh'
//       } else if (buildType?.toUpperCase() === 'NIGHTLY') {
//         // Correct syntax for else if condition
//         scriptName = './signall_nightly.sh'
//       }

//       // Construct the command to run the shell script with the arguments
//       // pass the password as environment variable
//       const command = `${scriptName} ${password} ${appIOSFolderPath}`

//       // Execute the command
//       exec(command, (error, stdout, stderr) => {
//         if (error) {
//           console.error(`Error: ${error.message}`)
//           return
//         }
//         if (stderr) {
//           console.error(`stderr: ${stderr}`)
//           return
//         }
//         console.log(`stdout: ${stdout}`)
//       })
//     } else {
//       console.log('Signed Build is not required for Android')
//     }
//     process.chdir(projectRoot)
//   }

//   public static async isApkOrIpaFilesPresent() {
//     // Read the contents of the folder
//     // let folderPath = ''
//     // if (deviceType?.toUpperCase() == 'IOS') {
//     //   folderPath = './app/ios'
//     // }
//     // if (deviceType?.toUpperCase() == 'IOS') {
//     //   folderPath = './app/android'
//     // }
//     // const files = fs.readdirSync(folderPath)
//     // // Check if any of the files end with .apk or .app
//     // const hasApkOrAppFiles = files.some((file) => {
//     //   return file.endsWith('.apk') || file.endsWith('.ipa')
//     // })
//     // console.log('Is Existing APK or IPA file present:', hasApkOrAppFiles)
//     // return hasApkOrAppFiles

//     let folderPath = ''
//     if (deviceType?.toUpperCase() === 'IOS') {
//       folderPath = './app/ios'
//       // Check for IPA files
//       const files = fs.readdirSync(folderPath)
//       const hasIpaFiles = files.some((file) => {
//         return file.endsWith('.ipa')
//       })
//       console.log('Is Existing IPA file present:', hasIpaFiles)
//       return hasIpaFiles
//     } else if (deviceType?.toUpperCase() === 'ANDROID') {
//       folderPath = './app/android'
//       // Check for APK files
//       const files = fs.readdirSync(folderPath)
//       const hasApkFiles = files.some((file) => {
//         return file.endsWith('.apk')
//       })
//       console.log('Is Existing APK file present:', hasApkFiles)
//       return hasApkFiles
//     } else {
//       console.error('Invalid device type provided:', deviceType)
//       return false
//     }
//   }

//   public static async download() {
//     if (!(await this.isApkOrIpaFilesPresent())) {
//       const buildId = await this.getLatestBuildIdFromAppStore()
//       const buildUrl = await this.getLatestDownloadUrlFromAppStore(buildId)
//       //await this.getAppPackage()
//       buildInformation['os'] = await this.getAppOs()
//       buildInformation['appName'] = await this.getAppName()
//       buildInformation['version'] = await this.getPackageVersion()
//       buildInformation['packageName'] = await this.getAppPackage()
//       console.log(`buildInformation:${JSON.stringify(await buildInformation)}`)
//       console.log(buildUrl)
//       await this.downloadFile(buildUrl)
//       await this.generateSignedBuildForIOS()
//       await Utility.createPropertiesFile(await buildInformation)
//     }
//   }
// }

// //AppCenterApi.download()
