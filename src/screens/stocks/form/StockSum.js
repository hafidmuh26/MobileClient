import React, { Component } from 'react';
import {
    Button,
    Container,
    Text,
    ListItem,
    Body,
    View,
    Left,
} from 'native-base';
import { RefreshControl, Alert } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { summary } from '../../../actions/stocksAction';
import styles from './styles';
import { showError } from '../../../util/toast';
import { FlatList } from 'react-native-gesture-handler';

function RowStock({ stock }) {

    return (
        <ListItem>
            <Left>
                <Text>{stock.name}</Text>
            </Left>
            <Left>
                <Text>{stock.quantity}</Text>
            </Left>
            <Left>
                <Text>{stock.description}</Text>
            </Left>
        </ListItem>
    );
}

class StockSum extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            search: '',
        };
    }
    componentDidMount() {
        this.reload();
    }

    componentDidUpdate(prevProps, prevState) {
        const { data, error } = this.props;

        if (prevProps.data !== data) {
            this.setState({ data: data });
        } else if (error && prevProps.error !== error) {
            showError(error);
        }
    }

    reload() {
        this.props.summary();

    }

    onRefresh = () => {
        const { params } = this.state;
        this.setState({ data: [], total: 0, params: { ...params, page: 0 } }, () =>
            this.reload(this.state.params),
        );
    };

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
                <CommonHeader navigation={navigation} title={'Stock Summary'} />
                <ListItem>
                    <Left>
                        <Text>Name</Text>
                    </Left>
                    <Left>
                        <Text>Quantity</Text>
                    </Left>
                    <Left>
                        <Text>Description</Text>
                    </Left>
                </ListItem>
                <View style={styles.content}>
                    <FlatList
                        refreshControl={
                            <RefreshControl refreshing={loading} onRefresh={this.onRefresh} />
                        }
                        data={data}
                        renderItem={({ item }) => <RowStock stock={item} />}
                        keyExtractor={(item, index) => index.toString()}
                    />
                </View>
            </Container>
        );
    }
}

const mapStateToProps = state => ({
    data: state.summary.data,
    loading: state.summary.loading,
    error: state.summary.error,
});

const mapDispatchToProps = {
    summary
};

export default connect(mapStateToProps, mapDispatchToProps)(StockSum);