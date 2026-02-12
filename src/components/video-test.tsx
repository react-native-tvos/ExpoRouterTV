import { useVideoPlayer, VideoView, VideoPlayerStatus } from 'expo-video';
import { useEffect, useRef, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { useInterval } from '@/hooks/use-interval';
import { ProgressBar } from '@/components/progress-bar';
import { DemoButton } from '@/components/demo-button';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { videoDimensions } from '@/constants/video-dimensions';
import { ThemedView } from './themed-view';

const videoSource =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

export default function VideoTest() {
  const styles = useVideoStyles();
  const ref: any = useRef<VideoView>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoStatus, setVideoStatus] = useState<VideoPlayerStatus>('idle');
  const [fractionComplete, setFractionComplete] = useState(0);

  const fractionCompleteFromPosition = (
    position: number | undefined,
    duration: number | undefined,
  ) => {
    return duration !== undefined ? (position ?? 0) / duration : 0;
  };

  const player = useVideoPlayer(videoSource, (player) => {
    player.addListener('statusChange', (payload) => {
      setVideoStatus(payload.status);
      console.log(`video status = ${payload.status}`);
    });
  });

  useEffect(() => {
    if (player.playing) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }
  }, [player.playing]);

  useEffect(() => {
    if (videoStatus === 'readyToPlay') {
      // Autoplay on start
      //      player.play();
    }
  }, [videoStatus]);

  useInterval(() => {
    setFractionComplete(
      fractionCompleteFromPosition(player.currentTime, player.duration),
    );
  }, 1000);

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.videoStyle}>
        {videoStatus === 'readyToPlay' || Platform.OS === 'android' ? (
          <VideoView
            ref={ref}
            style={styles.videoStyle}
            player={player}
            nativeControls
            contentFit="fill"
            showsTimecodes
            fullscreenOptions={{
              enable: true,
            }}
            allowsPictureInPicture
            contentPosition={{ dx: 0, dy: 0 }}
          />
        ) : (
          <View style={styles.videoStyle} />
        )}
        <ProgressBar fractionComplete={fractionComplete} />
      </ThemedView>
      <ThemedView style={styles.buttons}>
        <DemoButton
          title="Rewind"
          onPress={() => {
            player.currentTime = 0;
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title="Back 5 sec"
          onPress={() => {
            player.seekBy(-5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title={isPlaying ? 'Pause' : 'Play'}
          onPress={() => {
            if (player.playing) {
              player.pause();
            } else {
              player.play();
            }
          }}
        />
        <DemoButton
          title="Forward 5 sec"
          onPress={() => {
            player.seekBy(5);
            setFractionComplete(
              fractionCompleteFromPosition(player.currentTime, player.duration),
            );
          }}
        />
        <DemoButton
          title="Full screen"
          onPress={() => {
            ref.current.enterFullscreen();
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const useVideoStyles = () => {
  const { height, width, landscape, scale } = useScreenDimensions();
  const { videoWidth, videoHeight } = videoDimensions({
    height,
    width,
  });
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: landscape ? 'row' : 'column',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10 * scale,
      width: '90%',
    },
    videoStyle: {
      justifyContent: 'center',
      alignItems: 'center',
      width: videoWidth,
      height: videoHeight,
      margin: scale * 10,
    },
    buttons: {
      marginTop: 10 * scale,
      flexDirection: landscape ? 'column' : 'row',
      justifyContent: 'center',
      alignItems: landscape ? 'flex-end' : 'flex-start',
      width: width * 0.15,
    },
  });
};
