import { useState } from 'react';
import {
  Platform,
  Pressable,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useScreenDimensions } from '@/hooks/use-screen-dimensions';
import { useTheme } from '@/hooks/use-theme';

const useTVEventHandler = Platform.isTV
  ? require('react-native').useTVEventHandler
  : (_: any) => {};

/**
 * Demo of event handling on TV and web.
 * On TV, the buttons will respond to focus, blur, and press events.
 * On web, the buttons will respond to focus, blur, press, and hover events.
 */
export function EventHandlingDemo() {
  const [remoteEventLog, setRemoteEventLog] = useState<string[]>([]);
  const [pressableEventLog, setPressableEventLog] = useState<string[]>([]);

  const logWithAppendedEntry = (log: string[], entry: string) => {
    const limit = 10;
    const newEventLog = log.slice(log.length === limit ? 1 : 0, limit);
    newEventLog.push(entry);
    return newEventLog;
  };

  const updatePressableLog = (entry: string) => {
    setPressableEventLog((log) => logWithAppendedEntry(log, entry));
  };

  useTVEventHandler((event: any) => {
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
    <ThemedView style={styles.container}>
      <ThemedView style={styles.logContainer}>
        {Platform.isTV && (
          <View>
            <ThemedText type="smallBold">TV remote events</ThemedText>
            <ThemedText style={styles.logText}>
              {remoteEventLog.join('\n')}
            </ThemedText>
          </View>
        )}
        <View>
          <ThemedText type="smallBold">Native events</ThemedText>
          <ThemedText style={styles.logText}>
            {pressableEventLog.join('\n')}
          </ThemedText>
        </View>
      </ThemedView>
      <ThemedView>
        <PressableButton title="Pressable" log={updatePressableLog} />
        <TouchableOpacityButton
          title="TouchableOpacity"
          log={updatePressableLog}
        />
        <TouchableHighlightButton
          title="TouchableHighlight"
          log={updatePressableLog}
        />
        {Platform.OS === 'android' ? (
          <TouchableNativeFeedbackButton
            title="TouchableNativeFeedback"
            log={updatePressableLog}
          />
        ) : null}
      </ThemedView>
    </ThemedView>
  );
}

const PressableButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <Pressable
      onFocus={() => props.log(`${props.title} onFocus`)}
      onBlur={() => props.log(`${props.title} onBlur`)}
      onHoverIn={() => props.log(`${props.title} onHoverIn`)}
      onHoverOut={() => props.log(`${props.title} onHoverOut`)}
      onPress={() => props.log(`${props.title} onPress`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
      style={({ pressed, focused, hovered }) =>
        pressed || focused || hovered
          ? { ...styles.pressable, ...styles.pressableFocused }
          : styles.pressable
      }
    >
      {({ focused, hovered, pressed }) => {
        return (
          <ThemedText style={styles.pressableText}>
            {pressed
              ? `${props.title} pressed`
              : focused
                ? `${props.title} focused`
                : hovered
                  ? `${props.title} hovered`
                  : props.title}
          </ThemedText>
        );
      }}
    </Pressable>
  );
};

const TouchableOpacityButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.pressable}
      onFocus={() => props.log(`${props.title} onFocus`)}
      onBlur={() => props.log(`${props.title} onBlur`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <ThemedText style={styles.pressableText}>{props.title}</ThemedText>
    </TouchableOpacity>
  );
};

const TouchableHighlightButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();
  const theme = useTheme();
  const underlayColor = theme.tint;

  return (
    <TouchableHighlight
      style={styles.pressable}
      underlayColor={underlayColor}
      onFocus={(event) => props.log(`${props.title} onFocus`)}
      onBlur={(event) => props.log(`${props.title} onBlur`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <ThemedText style={styles.pressableText}>{props.title}</ThemedText>
    </TouchableHighlight>
  );
};

const TouchableNativeFeedbackButton = (props: {
  title: string;
  log: (entry: string) => void;
}) => {
  const styles = useDemoStyles();

  return (
    <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      onPress={() => props.log(`${props.title} onPress`)}
      onPressIn={() => props.log(`${props.title} onPressIn`)}
      onPressOut={() => props.log(`${props.title} onPressOut`)}
      onLongPress={() => props.log(`${props.title} onLongPress`)}
    >
      <View style={styles.pressable}>
        <ThemedText style={styles.pressableText}>{props.title}</ThemedText>
      </View>
    </TouchableNativeFeedback>
  );
};

const useDemoStyles = function () {
  const { height, width, spacing } = useScreenDimensions();
  const theme = useTheme();
  const highlightColor = theme.tint;
  const backgroundColor = theme.background;
  const tintColor = theme.tint;
  const textColor = theme.text;
  return StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      width: width * 0.8,
    },
    logContainer: {
      flexDirection: 'row',
      padding: spacing.one,
      margin: spacing.one,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    logText: {
      maxHeight: height * 0.5,
      width: width * 0.2,
      fontSize: spacing.two * 1.2,
      margin: spacing.one,
      lineHeight: spacing.two * 1.5,
      alignSelf: 'flex-start',
      justifyContent: 'flex-start',
    },
    pressable: {
      borderColor: highlightColor,
      backgroundColor: textColor,
      borderWidth: 1,
      borderRadius: spacing.three,
      margin: spacing.two,
      padding: spacing.one * 1.5,
    },
    pressableFocused: {
      backgroundColor: tintColor,
    },
    pressableText: {
      color: backgroundColor,
    },
  });
};
