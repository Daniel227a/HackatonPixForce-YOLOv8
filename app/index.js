/**
 * @format
 */
import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
// import Navigator from './teste';

import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Navigator);