import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { expoVersion, rnVersion } from '@/constants/react-native-info';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

function PackageInfo({ name, version }: { name: string; version: string }) {
  const styles = useAboutStyles();
  return (
    <ThemedView style={styles.packageInfo}>
      <ThemedText type="small">{name}</ThemedText>
      <ThemedView style={{ flex: 1 }} />
      <ThemedText type="smallBold">{version}</ThemedText>
    </ThemedView>
  );
}

export default function AboutScreen() {
  const styles = useAboutStyles();
  const router = useRouter();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="subtitle">About</ThemedText>
      <ThemedText>This is a demo Expo Router app with adaptive layout for mobile, tablet, TV, and web.</ThemedText>
      <PackageInfo name="Expo" version={expoVersion} />
      <PackageInfo name="React Native TV" version={rnVersion} />
      <Pressable
        onPress={() => {
          if (router.canDismiss()) {
            console.log('Dismiss');
            router.dismiss();
          } else if (router.canGoBack()) {
            console.log('Back');
            router.back();
          } else {
            console.log('Navigate');
            router.navigate('/');
          }
        }}
      >
        {({ focused, hovered, pressed }) => (
          <ThemedView
            style={[
              styles.dismissButton,
              pressed || focused || hovered ? styles.pressed : null,
            ]}
          >
            <ThemedText
              type="link"
              style={
                (focused || pressed || hovered) && styles.dismissTextFocused
              }
            >
              Dismiss
            </ThemedText>
          </ThemedView>
        )}
      </Pressable>
    </ThemedView>
  );
}

const useAboutStyles = () => {
  const { spacing } = useScreenDimensions();
  const theme = useTheme();
  return StyleSheet.create({
    container: {
      width: '100%',
      flex: 1,
      padding: spacing.four,
      gap: spacing.three,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.backgroundElement,
    },
    pressed: {
      backgroundColor: theme.tint,
    },
    packageInfo: {
      width: '40%',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'baseline',
      gap: spacing.three,
      backgroundColor: theme.backgroundElement,
    },
    dismissButton: {
      flexDirection: 'row',
      paddingHorizontal: spacing.four,
      paddingVertical: spacing.two,
      borderRadius: spacing.five,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dismissTextFocused: {
      color: theme.background,
    },
  });
};
