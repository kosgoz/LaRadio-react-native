import React, {useState, Component} from 'react';
import {StyleSheet, View, StatusBar} from 'react-native';
import stations from './assets/stations.json';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import TrackPlayer from 'react-native-track-player';

import PlayerTop from './src/player_top';
import StationsList from './src/stations_list';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStation: stations[0],
      playing: false,
      counter: 4,
    };
  }
  async componentDidMount() {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
      stopWithApp: true,
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_JUMP_FORWARD,
        TrackPlayer.CAPABILITY_JUMP_BACKWARD,
        TrackPlayer.CAPABILITY_STOP,
      ],
    });
    stations.map(station => {
      var track = {
        id: station.id.toString(),
        url: station.url, // Load media from the network
        title: `${station.name} - ${station.frequency}`,
        artist: station.ciudad,
        artwork: station.logoUrl, // Load artwork from the network
      };
      TrackPlayer.add(track);
    });
  }
  playStation = async stationId => {
    TrackPlayer.skip(stationId.toString());
    TrackPlayer.play();
    this.setState({playing: true});
    this.setState({counter: this.state.counter + 1});
    if (this.state.counter >= 4) {
      this.setState({counter: 1});
    }
  };
  nextStation = async () => {
    console.log('Calling nextStation');
    let stationId = this.state.currentStation.id + 1;
    if (stationId <= 12) {
      TrackPlayer.skip(stationId.toString());
      TrackPlayer.play();
      this.setState({
        counter: this.state.counter + 1,
        currentStation: stations[stationId],
      });
      if (this.state.counter >= 4) {
        this.setState({counter: 1});
      }
    }
  };
  previousStation = async () => {
    console.log('Calling previousStation');
    let stationId = this.state.currentStation.id - 1;
    if (stationId >= 0) {
      TrackPlayer.skip(stationId.toString());
      TrackPlayer.play();
      this.setState({
        counter: this.state.counter + 1,
        currentStation: stations[stationId],
      });
      if (this.state.counter >= 4) {
        this.setState({counter: 1});
      }
    }
  };

  render() {
    return (
      <>
        <StatusBar backgroundColor="#b53228" barStyle="light-content" />
        <View style={styles.mainScreen}>
          <PlayerTop
            currentStation={this.state.currentStation}
            playStation={station => this.playStation(station)}
            playing={this.state.playing}
            onChangePlaying={changePlaying =>
              this.setState({playing: changePlaying})
            }
            nextStation={() => this.nextStation()}
            previousStation={() => this.previousStation()}
            counter={this.state.counter}
          />
          <View style={styles.listContent}>
            <StationsList
              stations={stations}
              selectStation={station =>
                this.setState({currentStation: station})
              }
              playStation={station => this.playStation(station)}
              counter={this.state.counter}
            />
          </View>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  listContent: {
    flex: 2,
    backgroundColor: '#fafafa',
  },
  mainScreen: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default App;
