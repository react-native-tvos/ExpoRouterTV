/**
 * Below are text styles used in the app, primarily in the ThemedText component.
 */

import { TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';

export const textStyles = function (linkColor: string): {
  [key: string]: TextStyle & { fontSize: number; lineHeight: number };
} {
  return {
    default: {
      fontSize: scale(10),
      lineHeight: scale(12),
    },
    defaultSemiBold: {
      fontSize: scale(10),
      lineHeight: scale(12),
      fontWeight: '600',
    },
    title: {
      fontSize: scale(16),
      fontWeight: 'bold',
      lineHeight: scale(20),
    },
    subtitle: {
      fontSize: scale(12),
      lineHeight: scale(15),
      fontWeight: 'bold',
    },
    link: {
      lineHeight: scale(8),
      fontSize: scale(10),
      color: linkColor,
    },
    small: {
      lineHeight: scale(5),
      fontSize: scale(4),
    },
  };
};
