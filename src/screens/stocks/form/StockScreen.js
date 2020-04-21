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
} from 'native-base';
import { View } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { save, findById } from '../../../actions/stocksAction';
import styles from './styles';
import { showError } from '../../../util/toast';

class StockScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      id: route.params?.id,
      item: {},
      quantity: 0,
      unit: {},
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findById(id);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { savedData, savedError, data, error, navigation, itemsData, unitsData } = this.props;


    if (prevProps.data !== data) {
      this.setState({...data });
    } else if (error && prevProps.error !== error) {
      showError(error);
    } else if (prevProps.savedData !== savedData) {
      navigation.goBack();
    } else if (savedError && prevProps.savedError !== savedError) {
      showError(savedError);
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.props.save(this.state);
  };

  onOpenItem = () => {
    this.props.navigation.navigate('ItemOptions', {
      callbackValue: this.itemOptions,
    });
  };

  itemOptions = (item) => {
    this.setState({ item: item });
  };

  onOpenUnit = () => {
    this.props.navigation.navigate('UnitOptions', {
      callbackValue: this.unitOptions,
    });
  };

  unitOptions = (unit) => {
    this.setState({ unit: unit });
  };

  render() {
    const { navigation, loading, savedError } = this.props;
    const { id, item, quantity, unit } = this.state;
    const errorData = savedError?.data;

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Stock'} />
        <Content>
          <Form>
            {id &&
              <Item floatingLabel>
                <Label>ID</Label>
                <Input disabled value={id.toString()} />
              </Item>
            }
            <View>
              <View style={styles.fieldItem}>
                <Item floatingLabel error={errorData?.item != null}>
                  <Label>Item</Label>
                  <Input style={styles.input} value={item.name} disabled={true} />
                </Item>
                {errorData?.item && (
                  <Text style={styles.error}>{errorData.item[0]}</Text>
                )}
                <Button light onPress={this.onOpenItem}>
                  <Text>Item List</Text>
                </Button>
              </View>

              <Item floatingLabel error={errorData?.quantity != null}>
                <Label>Quantity</Label>
                <Input
                  value={quantity.toString()}
                  keyboardType='numeric'
                  onChangeText={value => this.onChange('quantity', value)} />
              </Item>
              {errorData?.quantity && <Text style={styles.error}>{errorData.quantity[0]}</Text>}

              <View>
                <Item floatingLabel error={errorData?.unit != null}>
                  <Label>Unit</Label>
                  <Input
                    style={styles.input}
                    value={unit.description}
                    disabled={true}
                  />
                </Item>
                {errorData?.unit && (
                  <Text style={styles.error}>{errorData.unit[0]}</Text>
                )}
                <Button light onPress={this.onOpenUnit}>
                  <Text>Unit List</Text>
                </Button>
              </View>
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
  savedData: state.savedStock.data,
  savedError: state.savedStock.error,
  data: state.StockById.data,
  error: state.StockById.error,
  loading: state.StockById.loading || state.savedStock.loading,
});

const mapDispatchToProps = {
  save,
  findById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(StockScreen);