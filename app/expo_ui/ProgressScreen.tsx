import { CircularProgress, LinearProgress } from '@expo/ui/Progress';
import * as React from 'react';
import { Platform } from 'react-native';
import { scale } from 'react-native-size-matters';

import { Page, Section } from '@/components/UI/Page';

export default function ProgressScreen() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => (progress + 0.05) % 1);
    }, 500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <Page>
      <Section title="Indeterminate progress" gap={scale(16)}>
        <CircularProgress />
        <LinearProgress />
      </Section>
      <Section title="Determinate progress" gap={scale(16)}>
        <CircularProgress progress={progress} />
        <LinearProgress progress={progress} />
      </Section>
      <Section title="Color" gap={scale(16)}>
        <CircularProgress progress={progress} color="red" />
        <LinearProgress progress={progress} color="red" />
      </Section>
      {Platform.OS === 'android' && (
        <Section title="Track color" gap={scale(16)}>
          <CircularProgress elementColors={{ trackColor: '#cccccc' }} />
          <LinearProgress elementColors={{ trackColor: '#cccccc' }} />
        </Section>
      )}
    </Page>
  );
}

ProgressScreen.navigationOptions = {
  title: 'Progress',
};
