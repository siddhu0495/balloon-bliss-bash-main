import { useEffect, useState } from 'react';
import { AdMob, BannerAdOptions, BannerAdSize, BannerAdPosition, RewardAdOptions } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

export const useAdMob = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isNative, setIsNative] = useState(false);

  useEffect(() => {
    const initializeAdMob = async () => {
      if (Capacitor.isNativePlatform()) {
        try {
          await AdMob.initialize();
          setIsInitialized(true);
          setIsNative(true);
          console.log('AdMob initialized successfully');
        } catch (error) {
          console.error('Failed to initialize AdMob:', error);
        }
      }
    };

    initializeAdMob();
  }, []);

  const showBannerAd = async () => {
    if (!isInitialized || !isNative) {
      console.log('AdMob not available on web platform');
      return;
    }

    try {
      const options: BannerAdOptions = {
        adId: 'ca-app-pub-3940256099942544~6300978111', // Test ad unit ID
        // adId: 'ca-app-pub-3940256099942544/6300978111', // Test ad unit ID
        // adId: 'ca-app-pub-9276592567894109/6495340366', // Test ad unit ID
        adSize: BannerAdSize.BANNER,
        position: BannerAdPosition.BOTTOM_CENTER,
        margin: 0,
        isTesting: true, // Set to false for production
      };

      await AdMob.showBanner(options);
      console.log('Banner ad shown');
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  };

  const hideBannerAd = async () => {
    if (!isInitialized || !isNative) return;

    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden');
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  };

  const showInterstitialAd = async () => {
    if (!isInitialized || !isNative) {
      console.log('AdMob not available on web platform');
      return;
    }

    try {
      await AdMob.prepareInterstitial({
        adId: 'ca-app-pub-3940256099942544/1033173712', // Test ad unit ID
        // adId: 'ca-app-pub-9276592567894109/6495340366', // Test ad unit ID
      });
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown');
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  };

  const showRewardAd = async (): Promise<boolean> => {
    if (!isInitialized || !isNative) {
      console.log('AdMob not available on web platform');
      return false;
    }

    try {
      const options: RewardAdOptions = {
        // adId: 'ca-app-pub-3940256099942544/5224354917', // Test ad unit ID
        adId: 'ca-app-pub-9276592567894109/4775064588',   // Original ad unit ID
        isTesting: true, // Set to false for production
      };

      await AdMob.prepareRewardVideoAd(options);
      const result = await AdMob.showRewardVideoAd();
      console.log('Reward ad shown, rewarded:', result);
      return true;
    } catch (error) {
      console.error('Failed to show reward ad:', error);
      return false;
    }
  };

  return {
    isInitialized,
    isNative,
    showBannerAd,
    hideBannerAd,
    showInterstitialAd,
    showRewardAd,
  };
};
