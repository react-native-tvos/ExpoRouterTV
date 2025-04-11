import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/useColorScheme';
import { TVEventControl } from 'react-native';

export default function UIScreensLayout() {
  return (
    <Stack>
      <Stack.Screen name="ButtonScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ColorPickerScreen" options={{ headerShown: false }} />
      <Stack.Screen name="PickerScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ProgressScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SectionScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SwitchScreen" options={{ headerShown: false }} />
      <Stack.Screen name="TextInputScreen" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}
