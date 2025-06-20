import { Image, StyleSheet, Platform, Pressable, TVEventHandler, Text } from 'react-native';
import { useCallback, useRef } from 'react';
import { Link, useRouter } from 'expo-router';
import { scale } from 'react-native-size-matters';
import { useFocusEffect } from '@react-navigation/native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {

  const router = useRouter();
  const subscription = useRef<any>(null);
  useFocusEffect(
    useCallback(() => { 
      console.log(`TVEventHandler.addListener HomeScreen`);
      subscription.current = TVEventHandler.addListener((evt) => {
        console.log(`Home TV Event: ${JSON.stringify(evt)}`);
        // TODO: Handle TV events if needed
      });
      return () => {
        if (subscription.current) {
          console.log(`TVEventHandler.removeListener HomeScreen`);
          subscription.current.remove();
          subscription.current = null;
        }
      };
    }, [])
  );

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
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView>
        <Pressable
          onPress={() => {
            console.log('Navigate to Explore');
            router.push({ pathname: '/explore' }); 
          }}
          style={({ pressed, focused }) => [
            styles.button,
            pressed || focused ? { backgroundColor: 'blue' } : {},
          ]}
        >
          <Text style={styles.buttonText}>To Explore</Text>
        </Pressable>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText>{' '}
          to see changes. Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this
          starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText>{' '}
          to get a fresh <ThemedText type="defaultSemiBold">app</ThemedText>{' '}
          directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
      <ThemedView>
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
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  stepContainer: {
    gap: scale(8),
    marginBottom: scale(8),
  },
  reactLogo: {
    height: scale(75),
    width: scale(150),
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  button: {
    backgroundColor: 'darkblue',
    margin: scale(5),
    borderRadius: scale(2),
    padding: scale(5),
  },
  buttonText: {
    color: 'white',
    fontSize: scale(8),
  },
});
