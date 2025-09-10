import { scale } from 'react-native-size-matters';
import { StyleSheet, View } from 'react-native';

export const ProgressBar = (props: any) => {
  const styles = useProgressBarStyles();
  const progressBarStyles = {
    container: styles.progressContainer,
    left: [styles.progressLeft, { flex: props?.fractionComplete || 0.0 }],
    right: [
      styles.progressRight,
      { flex: 1.0 - props?.fractionComplete || 1.0 },
    ],
  };
  return (
    <View style={progressBarStyles.container}>
      <View style={progressBarStyles.left} />
      <View style={progressBarStyles.right} />
    </View>
  );
};

export const fractionCompleteFromPosition = (
  position: number | undefined,
  duration: number | undefined,
) => {
  return duration !== undefined ? (position ?? 0) / duration : 0;
};

const useProgressBarStyles = () => {
  const vidHeight = scale(200);
  const vidWidth = 2 * vidHeight;
  return StyleSheet.create({
    progressContainer: {
      flexDirection: 'row',
      width: vidWidth,
      height: scale(5),
      margin: 0,
    },
    progressLeft: {
      backgroundColor: 'blue',
      borderTopRightRadius: scale(5),
      borderBottomRightRadius: scale(5),
      flexDirection: 'row',
      height: '100%',
    },
    progressRight: {
      flexDirection: 'row',
      height: '100%',
    },
  });
};
