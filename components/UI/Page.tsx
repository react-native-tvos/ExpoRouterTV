import * as React from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useThemeColor } from '@/hooks/useThemeColor';
import { scale } from 'react-native-size-matters';

export function Page({ children }: PropsWithChildren) {
  const styles = useStyles();
  return (
    <View style={styles.page}>
      <SafeAreaView style={styles.page}>{children}</SafeAreaView>
    </View>
  );
}

const ScrollPage = ({ children }: PropsWithChildren) => {
  const styles = useStyles();
  return (
    <Page>
      <ScrollView style={[styles.page, styles.scrollPage]}>
        {children}
      </ScrollView>
    </Page>
  );
};

type SectionProps = PropsWithChildren<{
  title: string;
  row?: boolean;
  gap?: number;
}>;

const Section = ({ title, children, row, gap }: SectionProps) => (
  <ThemedView style={styles.section}>
    <ThemedText type="title">{title}</ThemedText>
    <ThemedView style={{ flexDirection: row ? 'row' : 'column', gap }}>
      {children}
    </ThemedView>
  </ThemedView>
);

const useStyles = () => {
  const backgroundColor = useThemeColor({}, 'background');
  return StyleSheet.create({
    page: {
      paddingHorizontal: scale(12),
      paddingBottom: scale(12),
      backgroundColor,
      flex: 1,
      width: '100%',
    },
    scrollPage: {
      flex: 1,
      backgroundColor,
    },
    section: {
      borderBottomColor: 'rgba(0,0,0,0.1)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      paddingBottom: scale(8),
    },
    sectionHeader: {
      marginTop: scale(8),
    },
  });
};
const styles = StyleSheet.create({
  page: {
    paddingHorizontal: scale(12),
    paddingBottom: scale(12),
  },
  scrollPage: {
    flex: 1,
  },
  section: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: scale(8),
  },
  sectionHeader: {
    marginTop: scale(8),
  },
});

export { ScrollPage, Section };
