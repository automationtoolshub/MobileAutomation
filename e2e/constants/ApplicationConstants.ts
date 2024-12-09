const deviceType = process.env.deviceType
const buildType = process.env.buildType
export class ApplicationConstants {
  public static APP_NAME = 'sample Home App'
  public static getAppPackageForIOS() {
    if (buildType === null || buildType === undefined) {
      return 'UAT'
    }
    if (buildType?.toUpperCase() === 'REGRESSION') {
      return 'com.sample.Sampleapp.reg'
    } else if (buildType?.toUpperCase() === 'UAT') {
      return 'com.sample.Sampleapp.UAT'
    } else if (buildType?.toUpperCase() === 'NIGHTLY') {
      return 'com.sample.Sampleapp.nightly'
    } else if (buildType?.toUpperCase() === 'PROD') {
      return 'com.sample.homeapp'
    } else {
      return `Unsupported build type for iOS: ${buildType}`
    }
  }

  public static getAppPackageForAndroid() {
    if (buildType === null || buildType === undefined) {
      return 'com.netflix.mediaclient'
    }
    if (buildType?.toUpperCase() === 'REGRESSION') {
      return 'com.netflix.mediaclient'
    } else if (buildType?.toUpperCase() === 'UAT') {
      return 'com.netflix.mediaclient'
    } else if (buildType?.toUpperCase() === 'NIGHTLY') {
      return 'com.netflix.mediaclient'
    } else if (buildType?.toUpperCase() === 'PROD') {
      return 'com.netflix.mediaclient'
    } else {
      return `com.netflix.mediaclient`
    }
  }

  public static getBuildUrl() {
    deviceType==null ||  deviceType==undefined ? 'ANDROID':deviceType
    switch (deviceType?.toUpperCase()) {
      case 'ANDROID':
        switch (buildType?.toUpperCase()) {
          case 'REGRESSION':
            return 'Sample-Regression-Android'
          case 'UAT':
            return 'Sample-UAT-Android'
          case 'NIGHTLY':
            return 'Sample-Nightly-Android'
          case 'PROD':
            return 'Sample-Store-Android'
          default:
            return 'Unsupported buildType for Android: ' + buildType
        }
      case 'IOS':
        switch (buildType?.toUpperCase()) {
          case 'REGRESSION':
            return 'Sample-Regression-iOS'
          case 'UAT':
            return 'Sample-UAT-iOS'
          case 'NIGHTLY':
            return 'Sample-iOS'
          case 'PROD':
            return 'Sample-Store-iOS'
          default:
            return 'Unsupported buildType for iOS: ' + buildType
        }
      default:
        return 'Unsupported deviceType: ' + deviceType
    }
  }
  public static DEVICE_TYPE = class {
    public static IOS = 'IOS'
    public static ANDROID = 'ANDROID'
  }
  public static MOBILE_APP = class {
    public static IOS = class {
      public static APP_PACKAGE = ApplicationConstants.getAppPackageForIOS()
      public static APP_ACTIVITY = ''
    }
    public static ANDROID = class {
      public static APP_ACTIVITY =
        'com.netflix.mediaclient.ui.launch.UIWebViewActivity'
      public static APP_PACKAGE = ApplicationConstants.getAppPackageForAndroid() //'com.sample.homeapp'
    }
  }
  public static TIME_OUT = class {
    static SHORT = {
      timeout: 5000, // 5 seconds
    }

    static MEDIUM = {
      timeout: 15000, // 15 seconds
    }

    static HIGH = {
      timeout: 60000, // 60 seconds
    }
    static MAX = {
      timeout: 120000, // 1200 seconds
    }
    static EXTREME = {
      timeout: 180000, // 1200 seconds
    }
  }
}
