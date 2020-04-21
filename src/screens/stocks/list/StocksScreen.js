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
import { findAll, deleteByid } from '../../../actions/stocksAction';
import styles from './Styles';
import { showError } from '../../../util/toast';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';

function RowStock({ onPress, stock }) {
  return (
    <ListItem style={styles.item} onPress={() => onPress(stock)}>
      <Left>
        <Icon name='archive' type='FontAwesome'/>
      </Left>
      <Body>
        <Text>{stock.item.name}</Text>
      </Body>
      <Right>
        <Icon name="rightcircle" type="AntDesign" />
      </Right>
    </ListItem>
  );
}

class StocksScreen extends Component {
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
    this.props.navigation.navigate('Stock');
  };

  onShowForm = (stock) => {
    this.props.navigation.navigate('Stock', stock ? { id: stock.id } : null)
  }

  onShowSummary = () => {
    this.props.navigation.navigate('StockSum');
  }

  onDelete = (stock) => {
    Alert.alert(
      "Confirmation",
      "Delete this Item?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => this.props.deleteByid(stock.id) }
      ]
    );
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
        <CommonHeader navigation={navigation} title={'Stock List'} />
        <View style={styles.content}>
          <Item style={styles.Search}>
            <Input
              placeholder="Search"
              value={search}
              onChangeText={search => this.setState({ search })}
            />
            <Button transparent onPress={this.onSearch}>
              <Icon name="search" type='FontAwesome5' />
            </Button>
          </Item>
          <SwipeListView
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item: stock }) => <RowStock onPress={this.onShowForm} stock={stock} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenItem} >
                <Button danger onPress={() => this.onDelete(data.stock)}>
                  <Icon name='md-trash' />
                </Button>
              </View>
            )}
            rightOpenValue={-75}
            keyExtractor={stock => stock.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
           <ActionButton buttonColor="#263238">
              <ActionButton.Item buttonColor='#263238' title="Add" onPress={this.onShowForm}>
                <Icon name={'add'} style={styles.actionButtonIcon}/>
              </ActionButton.Item>
              <ActionButton.Item buttonColor='#263238' title="Summary" onPress={this.onShowSummary}>
                <Icon name="bar-graph" type='Entypo' style={styles.actionButtonIcon} />
              </ActionButton.Item>
            </ActionButton>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedData: state.savedStock.data,
  data: state.Stocks.data,
  loading: state.Stocks.loading,
  error: state.Stocks.error,
  deletedData: state.deleteStockById.data,
  deletedError: state.deleteStockById.error
});

const mapDispatchToProps = {
  findAll, deleteByid
};

export default connect(mapStateToProps, mapDispatchToProps)(StocksScreen);