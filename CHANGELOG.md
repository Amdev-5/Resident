## [1.9.0] 2023-05-15

## Updated dependencies

-Expo sdk updated from 45 to 48
-react update from 17 to 18
-react native version updated 0.68 to 0.71.7 
-Other packages updated according to expo sdk.
-expo-app-loading package is deprecated. Added a new package expo-splash-screen. For this,App.js file

## [1.8.0] 2022-07-19

### Updated dependencies

- Fixed the dual header shown issue.
- Updated @react-native-masked-view/masked-view@0.2.4 to @react-native-masked-view/masked-view@0.2.6
- Updated expo@^42.0.0 to expo@^45.0.0
- Updated expo-app-loading@~1.1.2 to expo-app-loading@~2.0.0
- Updated expo-expo-asset@~8.3.2 to expo-asset@~8.5.0
- Updated expo-font@~9.2.1 to expo-font@~10.1.0
- Updated expo-module-core@^0.2.0 to expo-module-core@~0.9.2
- Updated expo-linear-gradient@~9.2.0 to expo-linear-gradient@~11.3.0
- Updated react@16.13.1 to react@17.0.2
- Updated react-native@42.0.0 to react@0.68.2
- Updated react-native-gesture-handler@^1.10.3 to react-native-gesture-handler@~2.2.1
- Updated react-native-reanimated@~2.2.0 to react-native-reanimated@~2.8.0
- Updated react-native-safe-area-context@3.2.0 to react-native-safe-area-context@4.2.4
- Updated react-native-screens@~3.4.0 to react-native-screens@~3.11.1
- Updated dev dependencies
- Updated babel-preset-expo@8.3.0 to babel-preset-expo@~9.1.0
- Updated Babel Config
- Added a new plugin of react-native-reanimated/plugin

## [1.7.0] 2022- 04- 26

### Updated dependencies

- dependencies updated
- expo module core added
- expo-linear-gradient added
- stackNavigator and drawerNavigation changes ( color scheme set )
- expo updated
- syntax update in header Shown

## [1.6.0] 2020 - 11 - 04

### Updated dependencies

- updated `@react-navigation/drawer@5.8.1` to `@react-navigation/drawer@5.12.4`
- updated `@react-navigation/native@5.5.0` to `@react-navigation/native@5.9.3`
- updated `@react-navigation/stack@5.4.1` to `@react-navigation/stack@5.14.3`
- updated `expo SDK@39` to `expo SDK@40`
- updated `expo-asset@8.2.0` to `expo-asset@8.2.1`
- updated `expo-font@8.3.0` to `expo-font@8.4.0`
- updated `react-native SDK@39` to `react-native SDK@40`
- updated `react-native-gesture-handler@1.7.0` to `react-native-gesture-handler@1.8.0`
- updated `react-native-safe-area-context@3.1.4` to `react-native-safe-area-context@3.1.9`
- updated `react-native-screens@2.10.1` to `react-native-screens@2.15.2`
- added `expo-app-loading@1.01`

### Updated files

- `useNativeDriver` warning solved for `Tabs.js` and `Gallery.js`
- updated `App.js` to work with the new package included `expo-app-loading`
- implemented `SafeAreaView` inside the `Onboarding.js` screen
- `keyboardVerticalOffset` value changed for `Chat.js`

## [1.5.0] 2020 - 11 - 04

### Updated dependencies

- updated `expo-asset@8.1.5` to `expo-asset@8.2.0`
- updated `expo-font@8.1.0` to `expo-font@8.3.0`
- updated `react-native-gesture-handler@1.6.0` to `react-native-gesture-handler@1.7.0`
- updated `react-native-reanimated@1.7.0` to `react-native-reanimated@1.13.0`
- updated `react-native-screens@2.2.0` to `react-native-screens@2.10.1`
- updated `react-native-safe-area-context@0.7.3` to `react-native-safe-area-context@3.1.4`
- updated `@react-native-community/maksed-view@0.1.6` to `@react-native-community/maksed-view@0.1.10`
- updated `react-native SDK@37.0.0` to `react-native SDK@39.0.0`
- updated `react@16.9.0` to `react@16.13.1`
- updated `babel-preset-expo@8.2.1` to `babel-preset-expo@8.3.0`
- updated `expo SDK@37.0.0` to `expo SDK@39.0.0`
- updated `galio-framework@0.6.3` to `galio-framework@0.7.1`
- changed the git source for react-native-modal-dropdown

### Updated files

- Cart.js - fixing styles for Buttons after updated galio framework
- Elements.js - layout fixed by adding width to ScrollView
- Product.js - chat button styling fixed and animated warning removed
- Header.js - fixed goBack looping problem by unfocusing the input when the screen first renders

## [1.4.0] 2020 - 06 - 04

### Updated dependencies

- updated `expo-asset@8.0.0` to `expo-asset@8.1.5`
- updated `expo-font@8.0.0` to `expo-font@8.1.0`
- updated `react-native-gesture-handler@1.5.0` to `react-native-gesture-handler@1.6.0`
- updated `react-native-reanimated@1.4.0` to `react-native-reanimated@1.7.0`
- updated `react-native-screens@2.0.0-alpha.12` to `react-native-screens@2.2.0`
- updated `react-native-safe-area-context@0.6.0` to `react-native-safe-area-context@0.7.3`
- updated `@react-native-community/masked-view@0.1.5` to `@react-native-community/masked-view@0.1.6`
- updated `react-native SDK@36.0.0` to `react-native SDK@37.0.0`
- updated `babel-preset-expo@7.0.0` to `babel-preset-expo@8.2.1`
- updated `Expo @36.0.0` to `Expo @37.0.0`
- updated `@react-navigation/native@5.0.0` to `@react-navigation/native@5.5.0`
- updated `@react-navigation/stack@5.0.0` to `@react-navigation/stack@5.4.1`
- updated `@react-navigation/compat@5.0.0` to `@react-navigation/compat@5.1.25`
- updated `@react-navigation/bottom-tabs@5.0.0` to `@react-navigation/bottom-tabs@5.5.1`

### Updated files

- moved `assets/font/argon.json` to `assets/config/argon.json` in order to make sure there wouldn't be any issue with the build for Android
- fixed issue in Cart where button navigated to a broken route

## [1.3.0] 2020 - 03 - 04

### Removed dependencies

- removed `react-navigation@3.11.0`

### Added dependencies

- added `@react-navigation/compat@5.0.0`
- added `@react-navigation/drawer@5.0.0`
- added `@react-navigation/native@5.0.0`
- added `@react-navigation/stack@5.0.0`
- added `@react-native-community/masked-view@0.1.5`
- added `react-native-reanimated@1.4.0`
- added `react-native-safe-area-context@0.6.0`
- added `react-native-screeens@2.0.0-alpha.12`

### Updated dependencies

- updated `expo@35.0.0` to `expo@36.0.1`
- updated `expo-asset@7.0.0` to `expo-asset@8.0.0`
- updated `expo-font@7.0.0` to `expo-font@8.0.0`
- updated `expo-cli@2.4.0` to `expo-cli@3.11.7`
- updated `expo-linear-gradient@7.0.0` to `expo-linear-gradient@8.0.0`
- updated `react@16.8.3` to `react@16.9.0`
- updated `babel-preset-expo@7.0.0` to `babel-preset-expo@8.0.0`

### Updated files

- changed the whole routing from `Screens.js` because `react-navigation@5.0.0` has a new dynamic API
- changed `Menu.js` for a new Drawer custom component
- changed `DrawerItem.js` for a new type of `<DrawerCustomItem />`
- changed props and variables so that the new `react-navigation` API could work with the following files: `Beauty.js`, `Header.js`, `Product.js`, `Gallery.js`, `Pro.js`, `Product.js`, `Settings.js`, `Register.js`

## [1.2.0] 2019-11-06

### Updated dependencies

- `expo@33.0.3` to `expo@35.0.0`
- `expo-font@6.0.1` to `expo-font@7.0.0`
- `expo-asset@6.0.0` to `expo-asset@7.0.0`
- `react-native SDK@34.0.0` to `react-native SDK@35.0.0`
- `galio-framework@0.6.1` to `galio-framework@0.6.3`

### Updated files

- fixed left Header button used for navigation
- the back button is now bigger

## [1.1.0] 2019-09-18

### Updated dependencies

- `expo@33.0.0` to `expo@34.0.3`
- `expo-font@5.0.1` to `expo-font@6.0.1`
- `expo-asset@5.0.1` to `expo-asset@6.0.0`
- `react-native SDK@33.0.0` to `react-native SDK@34.0.0`
- added `react-native-gesture-handler@1.3.0`
- `galio-framework@0.5.3` to `galio-framework@0.6.1`

## [1.0.0] 2019-08-07

### Initial Release
