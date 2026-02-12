import { StyleSheet } from 'react-native';

import AudioTest from '@/components/audio-test';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import VideoTest from '@/components/video-test';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';
import { TVFocusGuideView } from '@/components/tv-focus-guide';

export default function VideoDemoScreen() {
  const styles = useVideoDemoScreenStyles();
  const theme = useTheme();
  const { spacing } = useScreenDimensions();
  const contentPlatformStyle = {
    paddingTop: 0,
    paddingBottom: spacing.six,
  };

  return (
    <ThemedView
      style={[
        styles.contentContainer,
        contentPlatformStyle,
        { backgroundColor: theme.background },
      ]}
    >
      <TVFocusGuideView autoFocus style={styles.innerContainer}>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Audio demo</ThemedText>
          <AudioTest />
        </ThemedView>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="subtitle">Video demo</ThemedText>
          <VideoTest />
        </ThemedView>
      </TVFocusGuideView>
    </ThemedView>
  );
}

const useVideoDemoScreenStyles = function () {
  const { width, height, spacing } = useScreenDimensions();
  const theme = useTheme();
  return StyleSheet.create({
    contentContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
      paddingHorizontal: spacing.four,
      paddingTop: spacing.three,
      width,
      height,
    },
    innerContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      width: width * 0.9,
      gap: spacing.two,
    },
    titleContainer: {
      width: '100%',
      flexDirection: 'row',
      gap: spacing.two,
      justifyContent: 'center',
      marginBottom: spacing.three,
    },
    sectionsWrapper: {},
  });
};
