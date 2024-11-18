import { textStyles } from '@/constants/TextStyles';
import { useThemeColor } from './useThemeColor';

export function useTextStyles() {
  const linkColor = useThemeColor({}, 'link');
  return textStyles(linkColor);
}
