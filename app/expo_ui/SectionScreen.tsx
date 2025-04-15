import { Button } from '@expo/ui/Button';
import { Picker } from '@expo/ui/Picker';
import { Section } from '@expo/ui/Section';
import { Slider } from '@expo/ui/Slider';
import { Switch } from '@expo/ui/Switch';
import * as React from 'react';
import { Text } from 'react-native';
import { scale } from 'react-native-size-matters';

export default function SectionScreen() {
  const [selectedIndex, setSelectedIndex] = React.useState<number | null>(null);
  const options = ['$', '$$', '$$$', '$$$$'];
  const [sliderValue, setSliderValue] = React.useState<number>(0.5);
  const [switchValue, setSwitchValue] = React.useState<boolean>(true);

  return (
    <Section title="My form Section" style={{ flex: 1 }}>
      <Text style={{ fontSize: scale(17) }}>Some text!</Text>
      <Button onPress={() => alert('Clicked!')}>I'm a button</Button>
      <Switch
        value={switchValue}
        label="This is a switch"
        onValueChange={setSwitchValue}
      />
      <Picker
        label="Menu picker"
        options={options}
        selectedIndex={selectedIndex}
        onOptionSelected={({ nativeEvent: { index } }) => {
          setSelectedIndex(index);
        }}
        variant="menu"
      />
      <Slider value={sliderValue} onValueChange={setSliderValue} />
    </Section>
  );
}

SectionScreen.navigationOptions = {
  title: 'Section',
};
