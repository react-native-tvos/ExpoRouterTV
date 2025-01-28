import { Image, StyleSheet, Pressable, TVFocusGuideView } from 'react-native';
import { Link } from 'expo-router';
import { scale } from 'react-native-size-matters';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Switch, Slider, Button, Picker, Section } from '@expo/ui';
import { useState } from 'react';

export default function HomeScreen() {
  const [switchValue, setSwitchValue] = useState(false);
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <TVFocusGuideView autoFocus style={styles.container}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Welcome to @expo/ui!</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Button</ThemedText>
          <Button
            text="Test button"
            onPress={() => console.log('Button press')}
          />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Switch</ThemedText>
          <ThemedView style={{ flexDirection: 'row' }}>
            <ThemedView style={{ flex: 1 }} />
            <Switch
              checked={switchValue}
              variant="checkbox"
              onCheckedChanged={() => setSwitchValue(!switchValue)}
            />
            <ThemedView style={{ flex: 1 }} />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Picker</ThemedText>
          <Picker
            options={['one', 'two', 'three']}
            selectedIndex={1}
            variant="segmented"
          />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Slider</ThemedText>
          <Slider />
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText>Section</ThemedText>
          <Section title="Test section">
            <ThemedText>Section contents</ThemedText>
          </Section>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal" asChild>
            <Pressable>
              {({ focused }) => {
                return (
                  <ThemedText
                    type="defaultSemiBold"
                    style={{ opacity: focused ? 0.6 : 1.0 }}
                  >
                    About this demo
                  </ThemedText>
                );
              }}
            </Pressable>
          </Link>
        </ThemedView>
      </TVFocusGuideView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  stepContainer: {
    width: '100%',
    gap: scale(4),
    marginBottom: scale(8),
    padding: scale(2),
    minHeight: scale(50),
  },
  reactLogo: {
    height: scale(75),
    width: scale(150),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
