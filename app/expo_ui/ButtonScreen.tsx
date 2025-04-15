import { Button } from '@expo/ui/Button';
import * as React from 'react';
import { Platform, ScrollView, SectionList, StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Page, Section } from '@/components/UI/Page';

const sections = [
  {
    title: 'Default',
    data: [{ title: 'Default' }],
  },
  {
    title: 'System Styles',
    data: [
      { title: 'Default', variant: 'default' },
      { title: 'Bordered', variant: 'bordered' },
      { title: 'Borderless', variant: 'borderless' },
      {
        title: 'Bordered Prominent',
        variant: 'borderedProminent',
        platforms: ['ios'],
      },
      { title: 'Plain', variant: 'plain', platforms: ['ios'] },
      { title: 'Outlined', variant: 'outlined', platforms: ['android'] },
      { title: 'Elevated', variant: 'elevated', platforms: ['android'] },
    ],
  },
  { title: 'Disabled', data: [{ title: 'Disabled', disabled: true }] },
  {
    title: 'Button Roles',
    data: [
      { title: 'Default', role: 'default' },
      { title: 'Cancel', role: 'cancel' },
      { title: 'Destructive', role: 'destructive' },
    ],
  },
  {
    title: 'Button Images',
    data: [
      {
        title: 'Folder',
        variant: 'bordered',
        systemImage: { ios: 'folder', android: 'filled.AccountBox' },
      },
      {
        title: 'Tortoise',
        variant: 'elevated',
        systemImage: { ios: 'tortoise', android: 'filled.Warning' },
      },
      {
        title: 'Trash',
        variant: 'borderless',
        systemImage: { ios: 'trash', android: 'outlined.Delete' },
        elementColors: { contentColor: '#FF6347' },
      },
      {
        title: 'Heart',
        systemImage: { ios: 'heart', android: 'outlined.Favorite' },
      },
    ],
  },
  {
    title: 'Android Custom Colored Buttons',
    data: [
      {
        title: 'Blue',
        elementColors: {
          containerColor: '#007BFF',
          contentColor: '#FF6347',
        },
        platforms: ['android'],
      },

      {
        title: 'Red',
        elementColors: {
          containerColor: '#FF6347',
          contentColor: '#007BFF',
        },
        platforms: ['android'],
      },
    ],
  },
  {
    title: 'Tinted Buttons',
    data: [{ title: 'Red', color: '#f00f0f' }],
  },
];

const renderRow = ({ item }: { item: any }) => {
  if (item.platforms && !item.platforms.includes(Platform.OS)) {
    return null;
  }
  return (
    <Button
      key={item.title}
      style={styles.button}
      variant={item.variant}
      disabled={item.disabled}
      role={item.role}
      systemImage={item.systemImage}
      elementColors={item.elementColors}
      color={item.color}
    >
      {item.title}
    </Button>
  );
};

const renderSectionHeader = ({ section }: { section: { title: string } }) => (
  <Section title={section.title} />
);

export default function UIScreen() {
  return (
    <Page>
      <SectionList
        sections={sections}
        renderItem={renderRow}
        renderSectionHeader={renderSectionHeader}
      />
    </Page>
  );
}

const styles = StyleSheet.create({
  button: {
    width: Platform.isTV || Platform.OS === 'web' ? scale(500) : scale(150),
    margin: scale(5),
    overflow: 'visible',
  },
  stretch: {
    alignSelf: 'stretch',
  },
  columnWrapper: {
    justifyContent: 'space-around',
    alignContent: 'space-around',
  },
});
