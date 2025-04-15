import { Stack } from 'expo-router';

import { demos } from '@/constants/ExpoUIDemos';

export default function UIScreensLayout() {
  return (
    <Stack>
      {demos.map((demo) => (
        <Stack.Screen
          key={demo.route}
          name={demo.route.substring(9)}
          options={{ headerShown: false }}
        />
      ))}
    </Stack>
  );
}
