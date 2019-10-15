/**
 * @format
 */

import {AppRegistry} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import App from './App';
import {name as appName} from './app.json';
import stations from './assets/stations.json';

// TrackPlayer.setupPlayer().then(() => {
//   stations.map(station => {
//     var track = {
//       id: station.id.toString(),
//       url: station.url, // Load media from the network
//       title: `${station.name} - ${station.frequency}`,
//       artist: station.ciudad,
//       artwork: station.logoUrl, // Load artwork from the network
//     };
//     TrackPlayer.add(track);
//   });
// });

AppRegistry.registerComponent(appName, () => App);
TrackPlayer.registerPlaybackService(() => require('./service.js'));
