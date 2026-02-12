import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { Pressable, StyleSheet, Text } from 'react-native';

export const DemoButton = (props: { title: string; onPress: () => void }) => {
  const styles = useButtonStyles();
  return (
    <Pressable
      onPress={() => props.onPress()}
      style={({ pressed, focused }) => [
        styles.button,
        pressed || focused ? { backgroundColor: 'blue' } : {},
      ]}
    >
      <Text style={styles.buttonText}>{props.title}</Text>
    </Pressable>
  );
};

export const useButtonStyles = () => {
  const { scale } = useScreenDimensions();
  return StyleSheet.create({
    button: {
      backgroundColor: 'darkblue',
      margin: scale * 5,
      borderRadius: scale * 10,
      padding: scale * 10,
      alignContent: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: 'white',
      fontSize: scale * 16,
      lineHeight: scale * 20,
    },
  });
};
