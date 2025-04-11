import {
  StyleSheet,
  Text,
  View,
  TVFocusGuideView,
  useTVEventHandler,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  FocusEvent,
  BlurEvent,
  PressableProps,
  FlatList,
  ScrollView,
} from 'react-native';
import { useState } from 'react';
import { scale } from 'react-native-size-matters';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useThemeColor } from '@/hooks/useThemeColor';

export function EventHandlingDemo() {
  const [remoteEventLog, setRemoteEventLog] = useState<string[]>([]);
  const [pressableEventLog, setPressableEventLog] = useState<string[]>([]);

  const logWithAppendedEntry = (log: string[], entry: string) => {
    const limit = 50;
    const newEventLog = log.slice(log.length === limit ? 1 : 0, limit);
    newEventLog.push(entry);
    return newEventLog;
  };

  const updatePressableLog = (entry: string) => {
    setPressableEventLog((log) => logWithAppendedEntry(log, entry));
  };

  useTVEventHandler((event) => {
    const { eventType, eventKeyAction } = event;
    if (eventType !== 'focus' && eventType !== 'blur') {
      setRemoteEventLog((log) =>
        logWithAppendedEntry(
          log,
          `type=${eventType}, action=${
            eventKeyAction !== undefined ? eventKeyAction : ''
          }`,
        ),
      );
    }
  });

  const styles = useDemoStyles();

  return (
    <TVFocusGuideView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.logContainer}>
          <ScrollView horizontal>
            <View>
              <ThemedText type="defaultSemiBold">
                Remote control events
              </ThemedText>
              <FlatList
                contentContainerStyle={styles.logText}
                data={remoteEventLog}
                renderItem={({ item }) => (
                  <ThemedText style={styles.logText}>{item}</ThemedText>
                )}
              />
            </View>
          </ScrollView>
          <ScrollView horizontal>
            <View>
              <ThemedText type="defaultSemiBold">
                Native focus/blur/press events
              </ThemedText>
              <FlatList
                contentContainerStyle={styles.logText}
                data={pressableEventLog}
                renderItem={({ item }) => (
                  <ThemedText style={styles.logText}>{item}</ThemedText>
                )}
              />
            </View>
          </ScrollView>
        </ThemedView>
        <ThemedView
          style={styles.buttonsContainer}
          onFocus={(event: any) => {
            updatePressableLog(`Bubbled focus event from ${event.title}`);
          }}
          onBlur={(event: any) => {
            updatePressableLog(`Bubbled blur event from ${event.title}`);
          }}
        >
          <ThemedText>View receives bubbled focus/blur events</ThemedText>
          <PressableButton title="Pressable 1" log={updatePressableLog} />
          <PressableButton title="Pressable 2" log={updatePressableLog} />
          <PressableButton
            title="Pressable 3 no bubbling"
            log={updatePressableLog}
            disableFocusAndBlurEventBubbling
          />
          <TouchableOpacityButton
            title="TouchableOpacity"
            log={updatePressableLog}
          />
          <TouchableHighlightButton
            title="TouchableHighlight"
            log={updatePressableLog}
          />
        </ThemedView>
      </ThemedView>
    </TVFocusGuideView>
  );
}

type ButtonEvent = (FocusEvent | BlurEvent) & { title?: string };

type ButtonProps = {
  title: string;
  log: (entry: string) => void;
  disableFocusAndBlurEventBubbling?: boolean;
};

const handleFocusOrBlur = (
  event: ButtonEvent,
  props: ButtonProps,
  type: string,
) => {
  event.title = props.title; // Attach info to the event before it bubbles up
  props.log(`${props.title} ${type}`); // Log the event
  if (props.disableFocusAndBlurEventBubbling) {
    event.stopPropagation();
  }
};

const PressableButton = (props: PressableProps & ButtonProps) => {
  const styles = useDemoStyles();

  return (
    <Pressable
      onFocus={(event) => handleFocusOrBlur(event, props, 'focus')}
      onBlur={(event) => handleFocusOrBlur(event, props, 'blur')}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => props.log(`${props.title} pressIn`)}
      onPressOut={() => props.log(`${props.title} pressOut`)}
      onLongPress={() => props.log(`${props.title} longPress`)}
      style={({ pressed, focused }) =>
        pressed || focused ? styles.pressableFocused : styles.pressable
      }
      {...props}
    >
      {({ focused, pressed }) => {
        return (
          <ThemedText style={styles.pressableText}>
            {pressed
              ? `${props.title} pressed`
              : focused
              ? `${props.title} focused`
              : props.title}
          </ThemedText>
        );
      }}
    </Pressable>
  );
};

const TouchableOpacityButton = (props: ButtonProps) => {
  const styles = useDemoStyles();
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.pressable}
      onFocus={(event) => {
        handleFocusOrBlur(event, props, 'focus');
        setFocused(true);
      }}
      onBlur={(event) => {
        handleFocusOrBlur(event, props, 'blur');
        setFocused(false);
      }}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => {
        props.log(`${props.title} pressIn`);
        setPressed(true);
      }}
      onPressOut={() => {
        props.log(`${props.title} pressOut`);
        setPressed(false);
      }}
      onLongPress={() => props.log(`${props.title} longPress`)}
    >
      <Text style={styles.pressableText}>{`${props.title}${
        pressed ? ' pressed' : focused ? ' focused' : ''
      }`}</Text>
    </TouchableOpacity>
  );
};

const TouchableHighlightButton = (props: ButtonProps) => {
  const styles = useDemoStyles();
  const underlayColor = useThemeColor({}, 'tint');
  const [focused, setFocused] = useState(false);
  const [pressed, setPressed] = useState(false);
  return (
    <TouchableHighlight
      style={styles.pressable}
      underlayColor={underlayColor}
      onFocus={(event) => {
        handleFocusOrBlur(event, props, 'focus');
        setFocused(true);
      }}
      onBlur={(event) => {
        handleFocusOrBlur(event, props, 'blur');
        setFocused(false);
      }}
      onPress={() => props.log(`${props.title} press`)}
      onPressIn={() => {
        props.log(`${props.title} pressIn`);
        setPressed(true);
      }}
      onPressOut={() => {
        props.log(`${props.title} pressOut`);
        setPressed(false);
      }}
      onLongPress={() => props.log(`${props.title} longPress`)}
    >
      <Text style={styles.pressableText}>{`${props.title}${
        pressed ? ' pressed' : focused ? ' focused' : ''
      }`}</Text>
    </TouchableHighlight>
  );
};

const useDemoStyles = function () {
  const highlightColor = useThemeColor({}, 'link');
  const backgroundColor = useThemeColor({}, 'background');
  const tintColor = useThemeColor({}, 'tint');
  const textColor = useThemeColor({}, 'text');
  const buttonContainerBackgroundColor = useThemeColor(
    {},
    'containerBackground',
  );
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    buttonsContainer: {
      flex: 3,
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: buttonContainerBackgroundColor,
      padding: scale(20),
    },
    logContainer: {
      flex: 3,
      flexDirection: 'row',
      padding: scale(5),
      margin: scale(5),
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logText: {
      maxHeight: scale(150),
      width: scale(100),
      fontSize: scale(5),
      lineHeight: scale(7),
      alignItems: 'flex-end',
      justifyContent: 'flex-end',
    },
    pressable: {
      borderColor: highlightColor,
      backgroundColor: textColor,
      borderWidth: 1,
      borderRadius: scale(5),
      margin: scale(5),
    },
    pressableFocused: {
      borderColor: highlightColor,
      backgroundColor: tintColor,
      borderWidth: 1,
      borderRadius: scale(5),
      margin: scale(5),
    },
    pressableText: {
      color: backgroundColor,
      fontSize: scale(8),
      margin: scale(2),
    },
  });
};
