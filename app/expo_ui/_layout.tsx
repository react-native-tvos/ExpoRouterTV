import { Stack } from 'expo-router';

import { demos } from '../(tabs)/expo_ui';
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
