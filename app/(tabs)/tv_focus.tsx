import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Platform } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { EventHandlingDemo } from '@/components/EventHandlingDemo';

export default function FocusDemoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={scale(200)}
          name="tv-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">TV event handling demo</ThemedText>
      </ThemedView>
      <ThemedText>
        Demo of focus handling and TV remote event handling in{' '}
        <ThemedText type="defaultSemiBold">Pressable</ThemedText> and{' '}
        <ThemedText type="defaultSemiBold">Touchable</ThemedText> components.
      </ThemedText>
      <Collapsible title="How it works">
        <ThemedText>
          • On TV platforms, these components have "onFocus()" and "onBlur()"
          props, in addition to the usual "onPress()". These can be used to
          modify the style of the component when it is navigated to or navigated
          away from by the TV focus engine. In addition, the functional forms of
          the Pressable style prop and the Pressable content, which in React
          Native core take a "pressed" boolean parameter, can also take
          "focused" as a parameter on TV platforms.
        </ThemedText>
        <ThemedText>
          • As you use the arrow keys to navigate around the screen, the demo
          uses the above props to update lists of recent events.
        </ThemedText>
        <ThemedText>
          • In RNTV 0.76.2, the focus, blur, pressIn, and pressOut events of
          Pressable and Touchable components are implemented as core React
          Native events, emitted directly from native code for better
          performance. They can be received by containing views in either the
          capture or bubble phase. This demo shows how information can be
          attached to these events by a Pressable, and then received by a
          containing View's event handler.
        </ThemedText>
      </Collapsible>
      {Platform.isTV ? (
        <EventHandlingDemo />
      ) : (
        <ThemedText>
          Run this on Apple TV or Android TV to see the demo.
        </ThemedText>
      )}
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
