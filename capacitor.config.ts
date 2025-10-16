import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.vercel.balloonbash',
  appName: 'balloonbash',
  webDir: 'dist',
  server: {
    url: 'https://balloonbash.vercel.app',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#87CEEB',
      androidSplashResourceName: 'splash',
      iosSplashResourceName: 'splash',
      showSpinner: false,
    }
  },
  android: {    
    icon: 'public/icon.png',
    // Icons should be placed in android/app/src/main/res directory
  },
  ios: {
    icon: 'public/icon.png',
    // Icons should be placed in ios/App/App/Assets.xcassets/AppIcon.appiconset
  }
};




// const config: CapacitorConfig = {
//   appId: 'app.lovable.41d50005e0db4089a50f7a77e65a0d8c',
//   appName: 'balloon-bliss-bash',
//   webDir: 'dist',
//   server: {
//     url: 'https://41d50005-e0db-4089-a50f-7a77e65a0d8c.lovableproject.com?forceHideBadge=true',
//     cleartext: true
//   },
//   plugins: {
//     SplashScreen: {
//       launchShowDuration: 2000,
//       backgroundColor: '#87CEEB',
//       androidSplashResourceName: 'splash',
//       iosSplashResourceName: 'splash',
//       showSpinner: false,
//     }
//   },
//   android: {
//     icon: 'public/icon.png',
//   },
//   ios: {
//     icon: 'public/icon.png',
//   }
// ,
//   android: {    
//     icon: 'public/icon.png',
//     // Icons should be placed in android/app/src/main/res directory
//   },
//   ios: {
//     icon: 'public/icon.png',
//     // Icons should be placed in ios/App/App/Assets.xcassets/AppIcon.appiconset
//   }
// };

export default config;
