// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/

import Ionicons from '@expo/vector-icons/Ionicons';
import { type IconProps } from '@expo/vector-icons/build/createIconSet';
import { type ComponentProps } from 'react';
import { scale } from 'react-native-size-matters';

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof Ionicons>['name']>) {
  return (
    <Ionicons
      size={scale(25)}
      style={[{ marginTop: scale(-10), marginLeft: scale(-20) }, style]}
      {...rest}
    />
  );
}
