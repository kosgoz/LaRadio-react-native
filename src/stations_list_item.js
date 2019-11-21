import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableWithoutFeedback,
  Image,
} from 'react-native';
import {Card} from 'react-native-paper';
import {AdMobInterstitial} from 'react-native-admob';

const StationsListItem = ({
  stations,
  city,
  selectStation,
  playStation,
  counter,
}) => {
  return (
    <View>
      <View>
        <Text style={styles.textTitle}>{city}</Text>
      </View>
      <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={stations}
        renderItem={({item}) => (
          <TouchableWithoutFeedback
            onPress={() => {
              if (counter === 4) {
                // Display an interstitial
                AdMobInterstitial.setAdUnitID(
                  'ca-app-pub-6174585484194945/1170909428',
                );
                //AdMobInterstitial.setTestDevices([AdMobInterstitial.simulatorId]);
                AdMobInterstitial.requestAd().then(() => {
                  AdMobInterstitial.showAd();
                });
              }
              selectStation(item);
              playStation(item.id);
            }}>
            <Card style={styles.card} elevation={4}>
              <Image source={{uri: item.logoUrl}} style={styles.imageStyle} />
            </Card>
          </TouchableWithoutFeedback>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageStyle: {
    width: 110,
    height: 110,
  },
  card: {
    marginLeft: 8,
    marginRight: 8,
    marginTop: 16,
    marginBottom: 16,
  },
  textTitle: {
    marginLeft: 8,
    marginTop: 16,
    fontSize: 16,
    color: '#808080',
  },
});

export default StationsListItem;
