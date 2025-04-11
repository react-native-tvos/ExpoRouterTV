import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from '@bottom-tabs/react-navigation';
import { Platform } from 'react-native';

import TabLayoutJS from './_layout.web';

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator,
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  if (Platform.OS === 'android') {
    return <TabLayoutJS />;
  }
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <Tabs
      tabBarActiveTintColor={colors.tabIconSelected}
      tabBarInactiveTintColor={colors.tabIconDefault}
      tabBarStyle={{ backgroundColor: colors.background }}
      rippleColor={colors.tint}
      translucent
      labeled={true}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/home.png')
              : null,
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/code.png')
              : null,
        }}
      />
      <Tabs.Screen
        name="expo_ui"
        options={{
          title: 'Expo UI',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/code.png')
              : null,
        }}
      />
      <Tabs.Screen
        name="tv_focus"
        options={{
          title: 'TV event demo',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/tv.png')
              : null,
        }}
      />
      <Tabs.Screen
        name="video"
        options={{
          title: 'Video demo',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/video.png')
              : null,
        }}
      />
    </Tabs>
  );
}
