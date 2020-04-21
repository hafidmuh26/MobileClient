import React, { Component } from 'react';
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Picker,
  Icon
} from 'native-base';
import { View } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { save, findById } from '../../../actions/transactionsAction';
import styles from './styles';
import { showError } from '../../../util/toast';

class TransactionScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      id: route.params?.id,
      amount: 0,
      type: 'PURCHASING',
      description: '',
      createDate: '',
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.state;

    if (id) {
      this.props.findById(id);
    }

    this.setState({ error: null })
  }

  componentDidUpdate(prevProps, prevState) {
    const { savedData, savedError, data, error, navigation } = this.props;

    if (prevProps.data !== data) {
      this.setState({ ...data });
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (prevProps.savedData !== savedData) {
      navigation.goBack();
    } else if (savedError && prevProps.savedError !== savedError) {
      showError(savedError);
      this.setState({ error: savedError });
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onValueChange = value => {
    this.setState({
      type: value,
    });
  };

  onSubmit = () => {
    this.props.save(this.state);
    console.log(this.state);

  };

  render() {
    const { navigation, loading, savedError } = this.props;
    const { id, amount, type, description } = this.state;
    const errorData = savedError?.data;

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Transaction'} />
        <Content>
          <Form>
            {id &&
              <Item floatingLabel>
                <Label>ID</Label>
                <Input disabled value={id.toString()} />
              </Item>
            }
            <View>
              <Item floatingLabel error={errorData?.amount}>
                <Label>Amount</Label>
                <Input
                  keyboardType='numeric'
                  value={amount.toString()}
                  onChangeText={value => this.onChange('amount', value)} />
              </Item>
              {errorData?.amount && <Text style={styles.error}>{errorData.amount[0]}</Text>}

              <Item picker style={styles.Picker} error={errorData?.type}>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={type}
                  onValueChange={this.onValueChange}
                >
                  <Picker.Item label="Type" value={null} />
                  <Picker.Item label="PURCHASING" value="PURCHASING" />
                  <Picker.Item label="SELLING" value="SELLING" />
                </Picker>
                {errorData?.type && <Text style={styles.error}>{errorData.type[0]}</Text>}
              </Item>

              <Item floatingLabel error={errorData?.description}>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChangeText={value => this.onChange('description', value)} />
              </Item>
              {errorData?.description && <Text style={styles.error}>{errorData.description[0]}</Text>}
            </View>
            <Button style={styles.button} full onPress={this.onSubmit} disabled={loading}>
              <Text>Save</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedData: state.savedTransaction.data,
  savedError: state.savedTransaction.error,
  data: state.TransactionById.data,
  error: state.TransactionById.error,
  loading: state.TransactionById.loading || state.savedTransaction.loading,

});

const mapDispatchToProps = {
  save,
  findById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TransactionScreen);