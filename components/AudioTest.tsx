import { scale } from 'react-native-size-matters';
import {
  AudioPlayerOptions,
  AudioSource,
  AudioStatus,
  useAudioPlayer,
  useAudioPlayerStatus,
} from 'expo-audio';
import { Platform, StyleSheet, View } from 'react-native';
import { DemoButton } from './DemoButton';
import { fractionCompleteFromPosition, ProgressBar } from './ProgressBar';

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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.barContainer}>
          <ProgressBar fractionComplete={fractionComplete} />
        </View>
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
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: Platform.isTV ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    barContainer: {
      borderWidth: scale(1),
      borderColor: 'black',
      width: scale(400),
    },
    buttons: {
      justifyContent: 'center',
      alignItems: Platform.isTV ? 'flex-start' : 'center',
    },
  });
};
