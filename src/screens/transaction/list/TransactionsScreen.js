import React, { Component } from 'react';
import {
  Button,
  Container,
  Text,
  ListItem,
  Body,
  Right,
  Icon,
  Item,
  Input,
  View,
  Left
} from 'native-base';
import { RefreshControl, Alert } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { findAll, deleteByid } from '../../../actions/transactionsAction';
import styles from './Styles';
import { showError } from '../../../util/toast';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActionButton from 'react-native-action-button';

function RowTransaction({ onPress, transaction }) {
  return (
    <ListItem style={styles.transaction} onPress={() => onPress(transaction)}>
      <Left>
        <Icon name='calculator' type='FontAwesome5'/>
      </Left>
      <Left>
      <Text>{transaction.type} {transaction.createdDate}</Text>
      </Left>      
      <Right>
        <Icon name="rightcircle" type="AntDesign" />
      </Right>
    </ListItem>
  );
}

class TransactionsScreen extends Component {
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
    this.props.navigation.navigate('Transaction');
  };

  onShowForm = (transaction) => {
    this.props.navigation.navigate('Transaction', transaction ? { id: transaction.id } : null)
  }

  onShowSummary = () => {
    this.props.navigation.navigate('TransactionSum');
  }

  onDelete = (transaction) => {
    
    
    Alert.alert(
      "Confirmation",
      "Delete this Transaction?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => this.props.deleteByid(transaction.id) }
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
        <CommonHeader navigation={navigation} title={'Transaction List'} />
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
            renderItem={({ item: transaction }) => <RowTransaction onPress={this.onShowForm} transaction={transaction} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenItem} >
                <Button danger onPress={() => this.onDelete(data.item)}>
                  <Icon name='md-trash' />
                </Button>
              </View>
            )}
            rightOpenValue={-75}
            keyExtractor={transaction => transaction.id.toString()}
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
  savedData: state.savedTransaction.data,
  data: state.Transactions.data,
  loading: state.Transactions.loading,
  error: state.Transactions.error,
  deletedData: state.deleteTransactionById.data,
  deletedError: state.deleteTransactionById.error
});

const mapDispatchToProps = {
  findAll, deleteByid
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionsScreen);