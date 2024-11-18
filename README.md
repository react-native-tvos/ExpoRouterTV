# ExpoRouterTV 👋

This is an [Expo Router](https://docs.expo.dev/router/introduction/) SDK 52 project demonstrating how Expo apps can be built for Apple TV and Android TV.

![Android TV screenshot](https://github.com/user-attachments/assets/6be25b83-b9a5-4c47-bfff-60c4d60cb4c1 "Android TV screenshot")

![Apple TV screenshot](https://github.com/user-attachments/assets/b83056a8-6915-464e-aea4-5dd735094edb "Apple TV screenshot")

Some of the packages used:

- The [React Native TV fork](https://github.com/react-native-tvos/react-native-tvos), which supports both phone (Android and iOS) and TV (Android TV and Apple TV) targets
- The [React Native TV config plugin](https://github.com/react-native-tvos/config-tv/tree/main/packages/config-tv), to allow Expo prebuild to modify the project's native files for TV builds
- The [react-native-bottom-tabs](https://github.com/okwasniewski/react-native-bottom-tabs) package, that provides a fully native tab bar (top bar for Apple TV, bottom bar for Android TV).
- The [react-native-size-matters](https://github.com/nirsky/react-native-size-matters) package, that provides methods and stylesheets for easily scaling the app to different screen sizes.
- The [expo-video](https://docs.expo.dev/versions/latest/sdk/video/) package, providing cross-platform video playback for both mobile and TV devices.

## 🚀 How to use

- `cd` into the project

- TV builds:

```sh
yarn
yarn prebuild:tv # Executes Expo prebuild with TV modifications
yarn ios # Build and run for Apple TV
yarn android # Build and run for Android TV
```

- Mobile builds:

```sh
yarn
yarn prebuild # Executes Expo prebuild without TV modifications
yarn ios # Build and run for iOS
yarn android # Build and run for Android mobile
```

## Development

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

This project includes a [demo](./components/EventHandlingDemo.tsx) showing how to use React Native TV APIs to highlight controls as the user navigates the screen with the remote control.

## TV specific file extensions

This project includes an [example Metro configuration](./metro.config.js) that allows Metro to resolve application source files with TV-specific code, indicated by specific file extensions (`*.ios.tv.tsx`, `*.android.tv.tsx`, `*.tv.tsx`).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/learn): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
