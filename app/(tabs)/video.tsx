import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import VideoTest from '@/components/VideoTest';

export default function VideoDemoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Ionicons
          size={scale(200)}
          name="videocam-outline"
          style={styles.headerImage}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Video demo</ThemedText>
      </ThemedView>
      <VideoTest />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: scale(30),
    left: 0,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: scale(8),
  },
});
