import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';

import { AnimatedSplashOverlay } from '@/components/animated-icon';
import { Colors } from '@/constants/theme';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';

export default function RootLayout() {
  const colorScheme = useColorScheme() === 'dark' ? 'dark' : 'light';
  const colors = Colors[colorScheme];
  const { spacing } = useScreenDimensions();
  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AnimatedSplashOverlay />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="about"
          options={{
            // Set the presentation mode to modal for our modal route.
            presentation: 'transparentModal',
            headerShown: false,
            contentStyle: {
              flex: 1,
              backgroundColor: colors.backgroundElement,
              animationDuration: 1000,
              opacity: 0.95,
              width: '70%',
              maxHeight: '80%',
              alignSelf: 'center',
              alignItems: 'center',
              marginTop: spacing.four,
              borderWidth: 2,
              borderColor: colors.textSecondary,
              borderRadius: spacing.four,
            },
          }}
        />
      </Stack>
    </ThemeProvider>
  );
}
