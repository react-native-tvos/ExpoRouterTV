import { Stack, useRouter } from 'expo-router';
import { Platform, Pressable } from 'react-native';

import { demos } from '@/constants/ExpoUIDemos';
import { ThemedText } from '@/components/ThemedText';

const hideHeader = Platform.isTV || Platform.OS === 'web';

export default function UIScreensLayout() {
  const router = useRouter();
  return (
    <Stack>
      {demos.map((demo) => (
        <Stack.Screen
          key={demo.route}
          name={demo.route.substring(9)}
          options={{
            headerShown: !hideHeader,
            headerLeft: () =>
              hideHeader ? null : (
                <Pressable onPress={() => router.back()}>
                  <ThemedText type="link">Back</ThemedText>
                </Pressable>
              ),
            title: demo.name,
          }}
        />
      ))}
    </Stack>
  );
}
