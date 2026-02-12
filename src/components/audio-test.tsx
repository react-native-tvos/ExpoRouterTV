import {
  AudioPlayerOptions,
  AudioSource,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { Platform, StyleSheet, View } from 'react-native';

import { DemoButton } from '@/components/demo-button';
import {
  fractionCompleteFromPosition,
  ProgressBar,
} from '@/components/progress-bar';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { videoDimensions } from '@/constants/video-dimensions';

const source: AudioSource =
  require('@/assets/audio/paza-moduless.mp3') as AudioSource;
const options: AudioPlayerOptions = {
  updateInterval: 1000,
  downloadFirst: false,
};
export default function App() {
  const styles = useAudioStyles();
  const player = useAudioPlayer(source, options);
  const status: AudioStatus = useAudioPlayerStatus(player);
  const fractionComplete = fractionCompleteFromPosition(
    status.currentTime,
    status.duration,
  );
  const isPlaying = status.playing;

  return (
    <View style={styles.container}>
      <View style={styles.barContainer}>
        <ProgressBar fractionComplete={fractionComplete} />
      </View>
      <View style={styles.buttons}>
        <DemoButton
          title={isPlaying ? 'Pause Sound' : 'Play Sound'}
          onPress={() => (isPlaying ? player.pause() : player.play())}
        />
        <DemoButton
          title="Replay Sound"
          onPress={() => {
            player.seekTo(0);
            player.play();
          }}
        />
      </View>
    </View>
  );
}

const useAudioStyles = () => {
  const { scale, width, height, landscape } = useScreenDimensions();
  const { videoWidth } = videoDimensions({ width, height });
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: landscape ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10 * scale,
      width: '90%',
    },
    barContainer: {
      borderWidth: scale,
      borderColor: 'black',
      width: videoWidth,
      margin: scale * 10,
    },
    buttons: {
      marginTop: 10 * scale,
      flexDirection: landscape ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: landscape ? 'flex-end' : 'flex-start',
    },
  });
};
