import React from 'react';
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
import { RefreshControl, FlatList } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { findAll } from '../../../actions/itemsAction';
import styles from './styles';
import { showError } from '../../../util/toast';

function RowItem({ onPress, item }) {
  return (
    <ListItem style={styles.item} onPress={() => onPress(item)}>
        <Left>
        <Icon
          style={styles.icon}
          name="checkbox-blank-circle"
          type="MaterialCommunityIcons"
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
class ItemOptions extends React.Component {
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
    const { data, error, } = this.props;

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
    } else if (error && prevProps.error !== error) {
      showError(error);
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

  onShowForm = (item) => {
    this.props.route.params.callbackValue(item);
    this.props.navigation.goBack();
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
              <Icon name="search" type='FontAwesome5' />
            </Button>
          </Item>
          <FlatList
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
            }
            data={data}
            renderItem={({ item }) => <RowItem onPress={this.onShowForm} item={item} />}

            keyExtractor={item => item.id.toString()}
            onEndReached={this.onEndReached}
            onEndReachedThreshold={0.5}
          />

        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  data: state.Items.data,
  loading: state.Items.loading,
  error: state.Items.error,
});

const mapDispatchToProps = {
  findAll
};

export default connect(mapStateToProps, mapDispatchToProps)(ItemOptions);