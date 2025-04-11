import * as React from 'react';
import { PropsWithChildren } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { ThemedText } from '../ThemedText';
import { ThemedView } from '../ThemedView';

export function Page({ children }: PropsWithChildren) {
  return <View style={styles.page}>{children}</View>;
}

const ScrollPage = ({ children }: PropsWithChildren) => (
  <ScrollView style={[styles.page, styles.scrollPage]}>{children}</ScrollView>
);

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

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  scrollPage: {
    flex: 1,
  },
  section: {
    borderBottomColor: 'rgba(0,0,0,0.1)',
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingBottom: 8,
  },
  sectionHeader: {
    marginTop: 8,
  },
});

export { ScrollPage, Section };
