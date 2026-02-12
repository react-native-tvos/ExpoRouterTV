import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, useColorScheme } from 'react-native';

import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';

import { expoVersion } from '@/constants/react-native-info';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

export function WebBadge() {
  const scheme = useColorScheme();
  const theme = useTheme();
  const styles = useBadgeStyles();
  return (
    <Link href="/about" asChild>
      <Pressable>
        {({ focused, pressed, hovered }) => (
          <ThemedView
            style={[
              styles.container,
              styles.pressable,
              (focused || pressed || hovered) && {
                backgroundColor: theme.tint,
              },
            ]}
          >
            <ThemedText
              type="code"
              themeColor="textSecondary"
              style={[
                styles.versionText,
                (focused || pressed || hovered) && styles.versionTextFocused,
              ]}
            >
              v{expoVersion}
            </ThemedText>
            <Image
              source={
                scheme === 'dark'
                  ? require('@/assets/images/expo-badge-white.png')
                  : require('@/assets/images/expo-badge.png')
              }
              style={styles.badgeImage}
            />
          </ThemedView>
        )}
      </Pressable>
    </Link>
  );
}

const useBadgeStyles = () => {
  const { spacing, scale } = useScreenDimensions();
  const theme = useTheme();
  return StyleSheet.create({
    pressable: {
      paddingHorizontal: spacing.four,
      paddingVertical: spacing.two,
      borderRadius: spacing.five,
    },
    container: {
      padding: spacing.three,
      alignItems: 'center',
      gap: spacing.two,
    },
    versionText: {
      textAlign: 'center',
    },
    versionTextFocused: {
      color: theme.background,
    },
    badgeImage: {
      width: 123 * scale,
      aspectRatio: 123 / 24,
    },
  });
};
