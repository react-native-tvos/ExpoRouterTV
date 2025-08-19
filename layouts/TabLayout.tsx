import { NativeTabs, Label } from 'expo-router/unstable-native-tabs';
import { Platform } from 'react-native';

import WebTabLayout from './TabLayout.web';

export default function TabLayout() {
  if (Platform.OS === 'android' && Platform.isTV) {
    return <WebTabLayout />;
  }
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="explore">
        <Label>Explore</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="tv_focus">
        <Label>TV demo</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="video">
        <Label>Video demo</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
