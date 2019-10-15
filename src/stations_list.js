import React, {Component} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import StationsListItem from './stations_list_item';

class StationsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: ['Santiago', 'Santo Domingo', 'Puerto Rico'],
    };
  }
  sectionList = () => {
    const {stations, counter, playStation, selectStation} = this.props;
    return (
      <FlatList
        data={this.state.cities}
        renderItem={({item}) => (
          <StationsListItem
            stations={stations.filter(s => item.includes(s.ciudad))}
            selectStation={selectStation}
            playStation={playStation}
            city={item}
            counter={counter}
          />
        )}
        keyExtractor={(item, index) => item}
      />
    );
  };
  render() {
    return <View>{this.sectionList()}</View>;
  }
}

const styles = StyleSheet.create({
  header: {
    fontSize: 32,
  },
});

export default StationsList;
