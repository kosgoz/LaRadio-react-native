import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import TrackPlayer from 'react-native-track-player';

// primary color #F44336
// subTitle #FAB0AC
class PlayerTop extends Component {
  togglePlayPause = () => {
    return this.props.playing ? this.pauseButton() : this.playButton();
  };
  playButton = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.playStation(this.props.currentStation.id);
          this.props.onChangePlaying(true);
        }}>
        <Image source={require('../assets/play.png')} style={styles.iconPlay} />
      </TouchableNativeFeedback>
    );
  };
  pauseButton = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          TrackPlayer.stop();
          this.props.onChangePlaying(false);
        }}>
        <Image
          source={require('../assets/pause.png')}
          style={styles.iconPlay}
        />
      </TouchableNativeFeedback>
    );
  };
  renderPreviousIcon = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.previousStation();
        }}>
        <Image
          source={require('../assets/skip_previous.png')}
          style={{height: 32, width: 32}}
        />
      </TouchableNativeFeedback>
    );
  };
  renderNextIcon = () => {
    return (
      <TouchableNativeFeedback
        onPress={() => {
          this.props.nextStation();
        }}>
        <Image
          source={require('../assets/skip_next.png')}
          style={{height: 32, width: 32}}
        />
      </TouchableNativeFeedback>
    );
  };
  render() {
    const {currentStation} = this.props;
    return (
      <View style={styles.main}>
        <Text style={styles.textTitle}>{`${currentStation.frequency} FM`}</Text>
        <Text style={styles.textSubTitle}>
          {`${currentStation.name} - ${currentStation.ciudad}`}
        </Text>
        <View style={styles.playerControl}>
          {this.renderPreviousIcon()}
          {this.togglePlayPause()}
          {this.renderNextIcon()}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F44336',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textTitle: {
    fontSize: 36,
    color: '#ffffff',
  },
  textSubTitle: {
    fontSize: 18,
    color: '#FAB0AC',
  },
  playerControl: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconPlay: {
    marginLeft: 16,
    marginRight: 16,
    height: 50,
    width: 50,
  },
});

export default PlayerTop;
