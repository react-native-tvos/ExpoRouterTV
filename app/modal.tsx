import Ionicons from '@expo/vector-icons/Ionicons';
import { Link } from 'expo-router';
import { StyleSheet, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

import { reactNativeInfo } from '@/constants/ReactNativeInfo';

function VersionText({
  name,
  value,
}: {
  name: string;
  value: string | boolean;
}) {
  return (
    <ThemedView style={{ flexDirection: 'row', gap: scale(3) }}>
      <ThemedText type="defaultSemiBold">{name}:</ThemedText>
      <ThemedText type="default">{`${value}`}</ThemedText>
    </ThemedView>
  );
}

export default function Modal() {
  const { expoVersion, rnVersion, routerVersion, newArchitecture, uiVersion } =
    reactNativeInfo;
  const data = [
    {
      name: 'expo',
      value: expoVersion,
    },
    {
      name: 'expo-router',
      value: routerVersion,
    },
    {
      name: '@expo/ui',
      value: uiVersion,
    },
    {
      name: 'react-native-tvos',
      value: rnVersion,
    },
    {
      name: 'Using new architecture',
      value: newArchitecture,
    },
  ];

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
      <ThemedView style={{ gap: scale(3) }}>
        <ThemedText type="title">About this demo</ThemedText>
        {data.map((item) => (
          <VersionText key={item.name} {...item} />
        ))}
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
