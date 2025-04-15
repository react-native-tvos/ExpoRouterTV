import { BottomSheet } from '@expo/ui/BottomSheet';
import { Button } from '@expo/ui/Button';
import * as React from 'react';
import { ScrollView, Text } from 'react-native';
import Animated, { LinearTransition } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';

export default function SectionScreen() {
  const [isOpened, setIsOpened] = React.useState<boolean>(false);
  const [height, setHeight] = React.useState<number>(scale(100));

  return (
    <ScrollView>
      <Button
        style={{ width: scale(100) }}
        onPress={() => setIsOpened((h) => !h)}
      >
        Toggle
      </Button>
      <Text style={{ fontSize: scale(10), margin: scale(30) }}>
        isOpened: {isOpened ? 'yes' : 'no'}
      </Text>
      <BottomSheet isOpened={isOpened} onIsOpenedChange={(e) => setIsOpened(e)}>
        <Animated.View
          layout={LinearTransition.duration(300)}
          style={{
            height,
            padding: scale(20),
            backgroundColor: 'blue',
            alignSelf: 'flex-end',
          }}
        >
          <Button
            onPress={() =>
              setHeight((h) => (h > scale(100) ? scale(10) : scale(h + 10)))
            }
          >
            Increase height
          </Button>
        </Animated.View>
      </BottomSheet>
    </ScrollView>
  );
}

SectionScreen.navigationOptions = {
  title: 'Section',
};
