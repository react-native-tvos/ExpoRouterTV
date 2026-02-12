import { Pressable, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { ThemedText } from './themed-text';

export const DemoButton = (props: { title: string; onPress: () => void }) => {
  const styles = useButtonStyles();
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={({ pressed, focused }) => [
        pressed || focused ? { opacity: 0.5 } : {},
      ]}
    >
      <LinearGradient colors={['#3c9ffe', '#0274df']} style={styles.button}>
        <ThemedText style={styles.buttonText}>{props.title}</ThemedText>
      </LinearGradient>
    </Pressable>
  );
};

export const useButtonStyles = () => {
  const { spacing, width } = useScreenDimensions();
  return StyleSheet.create({
    button: {
      borderRadius: spacing.three,
      margin: spacing.two,
      padding: spacing.one * 1.5,
      width: width * 0.12,
    },
    buttonText: {
      color: 'white',
    },
  });
};
