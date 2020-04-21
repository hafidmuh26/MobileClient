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
import { findAll, deleteById } from '../../../actions/unitsAction';
import styles from './Styles';
import { showError } from '../../../util/toast';
import { SwipeListView } from 'react-native-swipe-list-view';

function RowUnit({ onPress, unit }) {
  return (
    <ListItem style={styles.unit} onPress={() => onPress(unit)}>
      <Left>
        <Icon name='scale-bathroom' type='MaterialCommunityIcons'/>
      </Left>
      <Body>
        <Text>{unit.description}</Text>
      </Body>
      <Right>
        <Icon name="rightcircle" type="AntDesign" />
      </Right>
    </ListItem>
  );
}

class UnitsScreen extends Component {
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
        size: 10,
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
    this.props.navigation.navigate('Unit');
  };

  onShowForm = (unit) => {
    this.props.navigation.navigate('Unit', unit ? { id: unit.id } : null)
  }

  onDelete = (unit) => {
    Alert.alert(
      "Confirmation",
      "Delete this Unit?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "OK", onPress: () => this.props.deleteByid(unit.id) }
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
      { data: [], total: 0, params: { ...params, search: search, page: 0 } },
      () => this.reload(this.state.params),
    );
  };

  render() {
    const { navigation, loading } = this.props;
    const { data, search } = this.state;

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Units List'} />
        <View style={styles.content}>
          <Item  style={styles.Search} full>
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
            renderItem={({ item: unit }) => <RowUnit onPress={this.onShowForm} unit={unit} />}
            renderHiddenItem={(data) => (
              <View style={styles.hiddenItem} >
                <Button danger onPress={() => this.onDelete(data.unit)}>
                  <Icon name='md-trash' />
                </Button>
              </View>
            )}
            rightOpenValue={-75}
            keyExtractor={unit => unit.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />
          <Fab onPress={this.onShowForm}  style={styles.Fab}>
            <Icon name={'add'} />
          </Fab>
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedData: state.savedUnit.data,
  data: state.Units.data,
  loading: state.Units.loading,
  error: state.Units.error,
  deletedData: state.deleteUnitById.data,
  deletedError: state.deleteUnitById.error
});

const mapDispatchToProps = {
  findAll, deleteById
};

export default connect(mapStateToProps, mapDispatchToProps)(UnitsScreen);