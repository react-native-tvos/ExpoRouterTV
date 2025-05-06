import React from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { withLayoutContext } from 'expo-router';
import { createNativeBottomTabNavigator } from 'react-native-bottom-tabs/react-navigation';
import { Platform } from 'react-native';

export const Tabs = withLayoutContext(
  createNativeBottomTabNavigator().Navigator,
);

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  return (
    <Tabs
      tabBarActiveTintColor={colors.tabIconSelected}
      tabBarInactiveTintColor={colors.tabIconDefault}
      barTintColor={colors.background}
      rippleColor={colors.tint}
      labeled={true}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'TV event demo',
          tabBarIcon: () =>
            Platform.OS === 'android'
              ? require('@/assets/bar_icons/tv.png')
              : null,
        }}
      />
    </Tabs>
  );
}
