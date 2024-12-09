import axios from 'axios'
import fs from 'fs'
import { exec, execSync } from 'child_process'
import report from '@wdio/allure-reporter'
import fsExtra from 'fs-extra'

export class CharlesProxy {
  public static async getIpAddress() {
    try {
      const ipAddress = execSync('ipconfig getifaddr en0').toString().trim()
      console.log(`ipAddress ${ipAddress}`)
      return ipAddress || ''
    } catch (error) {
      console.error('Error retrieving IP address:', error)
      return ''
    }
  }

  public static async clearProxyForAndroid() {
    //const command = 'adb shell settings delete global http_proxy'
    const command = 'adb shell settings put global http_proxy :0'
    exec(command, (error) => {
      if (error) {
        console.error('Error clearing proxy:', error)
      } else {
        console.log('Proxy cleared successfully')
      }
    })
  }

  public static async configureProxyForAndroid(ipAddress: string) {
    const port = '8888'
    const command = `adb shell settings put global http_proxy ${ipAddress}:${port}`
    exec(command, (error) => {
      if (error) {
        console.error('Error setting proxy:', error)
      } else {
        console.log(`Proxy set to ${ipAddress}:${port}`)
      }
    })
  }

  public static async startCharles() {
    const command = 'charles --headless'
    exec(command, (error) => {
      if (error) {
        console.error('Error Start Charles proxy:', error)
      } else {
        console.log('Start Charles successfully')
      }
    })
  }

  // public static async stopCharles() {
  //   const command = 'pkill charles'
  //   exec(command, (error) => {
  //     if (error) {
  //       console.error('Error Stop Charles proxy:', error)
  //     } else {
  //       console.log('Stopped Charles successfully')
  //     }
  //   })
  // }

  // public static async clearCharles() {
  //   const command = 'charles -clear'
  //   exec(command, (error) => {
  //     if (error) {
  //       console.error('Error clearing proxy:', error)
  //     } else {
  //       console.log('Proxy cleared successfully')
  //     }
  //   })
  // }

  // public static async exportSession() {
  //   const logDir = './charlesLog'
  //   const logFileName = `session.chls`
  //   const filePath = `${logDir}/${logFileName}`
  //   fsExtra.removeSync(logDir)
  //   if (!fs.existsSync(filePath)) {
  //     fs.mkdirSync('filePath') // Create logs directory if it doesn't exist
  //   }
  //   const command = `charles -export ${filePath}`
  //   exec(command, (error) => {
  //     if (error) {
  //       console.error('Error Exporting Charles session...:', error)
  //     } else {
  //       console.log('Exporting Charles session...')
  //     }
  //   })
  // }

  // // Start recording
  // public static async startRecording(ipAddress: string) {
  //   try {
  //     const response = await axios.post(
  //       `http://${ipAddress}:8888/recording/start`
  //     )
  //     console.log('Charles Proxy recording started:', response.data)
  //   } catch (error) {
  //     console.error('Error starting Charles Proxy recording:', error)
  //   }
  // }

  // // Stop recording
  // public static async stopRecording(ipAddress: string) {
  //   try {
  //     const response = await axios.post(
  //       `http://${ipAddress}:8888/recording/stop`
  //     )
  //     console.log('Charles Proxy recording stopped:', response.data)
  //   } catch (error) {
  //     console.error('Error stopping Charles Proxy recording:', error)
  //   }
  // }

  // // Export session
  // public static async exportSession(ipAddress: string) {
  //   const logDir = './charlesLog'
  //   const logFileName = `session.chls`
  //   const filePath = `${logDir}/${logFileName}`
  //   fsExtra.removeSync(logDir)
  //   if (!fs.existsSync(filePath)) {
  //     fs.mkdirSync('filePath') // Create logs directory if it doesn't exist
  //   }
  //   try {
  //     const response = await axios.get(
  //       `http://${ipAddress}:8888/session/export`,
  //       {
  //         responseType: 'arraybuffer',
  //       }
  //     )
  //     console.log(
  //       `Charles Proxy session exported to: ${filePath}`,
  //       response.data
  //     )
  //     const logContent = fs.readFileSync(filePath, 'utf8') // Read the file content

  //     // Assuming you have a report object to attach files
  //     report.addAttachment(
  //       'Charles_Logs',
  //       logContent,
  //       'application/octet-stream'
  //     )
  //     console.log('exported successfully')
  //   } catch (error) {
  //     console.error('Error exporting Charles Proxy session:', error)
  //   }
  // }
}
