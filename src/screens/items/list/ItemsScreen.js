import React, { Component } from 'react';
import {
  Button,
  Container,
  Text,
  ListItem,
  Thumbnail,
  Left,
  Body,
  Right,
  Icon,
  Item,
  Input,
  View,
  Fab,
} from 'native-base';
import { RefreshControl, Alert } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { findAll, deleteByid } from '../../../actions/itemsAction';
import styles from './Styles';
import { showError, showSuccess } from '../../../util/toast';
import { SwipeListView } from 'react-native-swipe-list-view';

function RowItem({ onPress, item }) {
  return (
    <ListItem style={styles.item} onPress={() => onPress(item)}>
      <Left>
        <Thumbnail
          square
          source={require('../../../../assert/images/beras.jpg')}
        />
      </Left>
      <Body>
        <Text>{item.name}</Text>
      </Body>
      <Right>
        <Icon name="rightcircle" type="AntDesign" />
      </Right>
    </ListItem>
  );
}

class ItemsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      total: 0,
      search: '',
      params: {
        search: '',
        sort: 'asc',
        page: 0,
        size: 10
      },
    };
  }
  componentDidMount() {
    this.reload(this.state.params);
  }

  componentDidUpdate(prevProps, prevState) {
    const { savedData, data, error, deletedData, deletedError } = this.props;

    if (prevProps.data !== data) {
      this.setState({
        data: [...this.state.data, ...data.list],
        total: data.total,
        search: this.state.params.search,
        params: {
          ...this.state.params,
          page: data.page,
        },
      });
    } else if (prevProps.deletedData !== deletedData || prevProps.savedData !== savedData) {
      this.onRefresh();
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (deletedError && prevProps.deletedError !== deletedError) {
      showError(deletedError);
    }
  }

  reload({ search, sort = 'asc', page = 0 } = {}) {
    this.props.findAll({ search: { name: search }, sort, page });
  }

  onRefresh = () => {
    const { params } = this.state;
    this.setState({ data: [], total: 0, params: { ...params, page: 0 } }, () =>
      this.reload(this.state.params),
    );
  };

  onAdd = () => {
    this.props.navigation.navigate('Item');
  };

  onShowForm = (item) => {
    this.props.navigation.navigate('Item', item ? { id: item.id } : null)
  }

  onDelete = (item) => {
    Alert.alert(
      "Confirmation",
      "Delete this Item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => this.props.deleteByid(item.id) }
      ]
    );
  }

  onFormResult = (result) => {
    console.log('#RESULT', result);

  }

  onEndReached = () => {
    const { data, total, params } = this.state;
    if (data.length < total) {
      this.reload({
        ...params,
        page: params.page + 1,
      });
    }
  };

  onSearch = () => {
    const { search, params } = this.state;
    this.setState(
      { data: [], total: 0, params: { ...params, search: search, page: 0, size: 10 } },
      () => this.reload(this.state.params),
    );
  };

  render() {
    const { navigation, loading } = this.props;
    const { data, search } = this.state;

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Item List'} />
        <View style={styles.content}>
          <Item style={styles.Search}>
            <Input
              placeholder="Search"
              value={search}
              onChangeText={search => this.setState({ search })}
            />
            <Button transparent onPress={this.onSearch}>
              <Icon name="search" type='FontAwesome5'/>
            </Button>
          </Item>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => <RowItem onPress={this.onShowForm} item={item} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenItem} >
                <Button danger onPress={() => this.onDelete(data.item)}>
                  <Icon name='md-trash' />
                </Button>
              </View>
            )}
            rightOpenValue={-75}
            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
          <Fab onPress={this.onShowForm} style={styles.Fab}>
            <Icon name={'add'} />
          </Fab>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedData: state.savedItem.data,
  data: state.Items.data,
  loading: state.Items.loading,
  error: state.Items.error,
  deletedData: state.deleteItemById.data,
  deletedError: state.deleteItemById.error
});

const mapDispatchToProps = {
  findAll, deleteByid
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemsScreen);