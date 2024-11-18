import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { reactNativeInfo } from '@/constants/ReactNativeInfo';

export default function Modal() {
  const { rnVersion, routerVersion, hermesVersion, uiManager } =
    reactNativeInfo;
  // If the page was reloaded or navigated to directly, then the modal should be presented as
  // a full screen page. You may need to change the UI to account for this.
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#A1CEDC' }}
      headerImage={
        <Ionicons
          size={scale(120)}
          name="logo-react"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView>
        <ThemedText type="title">About this demo</ThemedText>
        <ThemedText type="small">{`expo-router: ${routerVersion}`}</ThemedText>
        <ThemedText type="small">{`react-native-tvos: ${rnVersion}`}</ThemedText>
        <ThemedText type="small">{`Hermes bytecode version: ${JSON.stringify(
          hermesVersion,
          null,
          2,
        )}`}</ThemedText>
        <ThemedText type="small">{`${
          uiManager === 'Fabric' ? 'Fabric enabled' : ''
        }`}</ThemedText>
      </ThemedView>
      {/* Use `../` as a simple way to navigate to the root. This is not analogous to "goBack". */}
      <Link href="../" asChild>
        <Pressable>
          {({ focused }) => (
            <ThemedText style={{ opacity: focused ? 0.6 : 1.0 }}>
              Dismiss
            </ThemedText>
          )}
        </Pressable>
      </Link>
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
  headerImage: {
    color: '#1D3D47',
    bottom: 0,
    left: scale(10),
    position: 'absolute',
  },
});
