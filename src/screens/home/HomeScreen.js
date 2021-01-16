import React, { Component } from 'react';
import { Container, ListItem, Icon } from 'native-base';
import CommonHeader from '../../components/CommonHeader';
import Styles from './Styles';
import { FlatList, Text, View, } from 'react-native';

data: [
  {
    id: 1,
    title: 'Items',
    color: '#ffa5d8',
    members: 8,
    image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
  },
  {
    id: 1,
    title: 'Units',
    color: '#87CEEB',
    members: 6,
    image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
  },
  {
    id: 2,
    title: 'Transactions',
    color: '#87CEEB',
    members: 12,
    image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
  },
  {
    id: 3,
    title: 'Stocks',
    color: '#ffa5d8',
    members: 5,
    image: 'https://img.icons8.com/dusk/70/000000/checklist.png',
  },
];



class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollEnabled: false,
    };
  }

  clickEventListener(item) {
    Alert.Alert(item.title);
  }

  render() {
    const { navigation } = this.props;

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Home'} />
        <FlatList
          style={Styles.list}
          contentContainerStyle={Styles.listContainer}
          scrollEnabled={this.state.scrollEnabled}
          data={this.state.data}
          horizontal={false}
          numColumns={2}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                style={[styles.card, { backgroundColor: item.color }]}
                onPress={() => navigation.navigate(item.title)}>
                <View style={Styles.cardHeader}>
                  <Text style={Styles.title}>{item.title}</Text>
                  <Image
                    style={Styles.icon}
                    source={{
                      uri: 'https://img.icons8.com/ios/40/000000/settings.png',
                    }}
                  />
                </View>
                <Image style={Styles.cardImage} source={{ uri: item.image }} />
                <View style={Styles.cardFooter}>
                  <Text style={Styles.subTitle}>Inventory</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </Container>
    );
  }
}

export default HomeScreen;
