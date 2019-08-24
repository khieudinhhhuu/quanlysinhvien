/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import Main from './src/main/Main';

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => Main);
