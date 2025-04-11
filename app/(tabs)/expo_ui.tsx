import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform, Pressable } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventHandlingDemo } from '@/components/EventHandlingDemo';
import { Href, useRouter } from 'expo-router';

const demos = [
  {
    name: 'List',
    route: '/expo_ui/ListScreen',
  },
  {
    name: 'Picker',
    route: '/expo_ui/PickerScreen',
  },
  {
    name: 'Color Picker',
    route: '/expo_ui/ColorPickerScreen',
  },
  {
    name: 'Progress',
    route: '/expo_ui/ProgressScreen',
  },
  {
    name: 'Slider',
    route: '/expo_ui/SliderScreen',
  },
  {
    name: 'Switch',
    route: '/expo_ui/SwitchScreen',
  },
  {
    name: 'Text Input',
    route: '/expo_ui/TextInputScreen',
  },
  {
    name: 'Section',
    route: '/expo_ui/SectionScreen',
  },
];

export default function UIDemoScreen() {
  const router = useRouter();
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={scale(200)}
          name="chevron-forward-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Expo UI demo</ThemedText>
      </ThemedView>
      <ThemedText>Demos of Expo UI components</ThemedText>
      {demos.map((demo) => (
        <Pressable
          onPress={() => {
            router.push(demo.route as Href);
          }}
        >
          <ThemedText type="link">{demo.route}</ThemedText>
          <ThemedText>{demo.name}</ThemedText>
        </Pressable>
      ))}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: scale(-30),
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: scale(8),
  },
});
