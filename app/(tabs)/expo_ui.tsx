import Ionicons from '@expo/vector-icons/Ionicons';
import { Href, useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Pressable, Platform } from 'react-native';
import { scale, moderateScale } from 'react-native-size-matters';

import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { demos } from '@/constants/ExpoUIDemos';

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
      <ScrollView>
        {demos.map(
          (demo) =>
            demo.platforms.includes(Platform.OS) && (
              <Pressable
                style={({ pressed, focused }) => ({
                  opacity: pressed || focused ? 0.6 : 1.0,
                  margin: scale(2),
                })}
                key={demo.name}
                onPress={() => {
                  router.push(demo.route as Href);
                }}
              >
                <ThemedText
                  style={{
                    fontSize: moderateScale(20),
                    lineHeight: moderateScale(27),
                  }}
                  type="link"
                >
                  {demo.name}
                </ThemedText>
              </Pressable>
            ),
        )}
      </ScrollView>
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
