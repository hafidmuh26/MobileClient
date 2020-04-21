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
} from 'native-base';
import { View } from 'react-native';
import CommonHeader from '../../../components/CommonHeader';
import { connect } from 'react-redux';
import { save, findItemById } from '../../../actions/itemsAction';
import styles from './styles';
import { showError } from '../../../util/toast';

class ItemScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      id: route.params?.id,
      name: '',
      error: null
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findItemById(this.state.id);
    }

    this.setState({error: null})
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
      this.setState({error: savedError});
    }
  }

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onSubmit = () => {
    this.props.save(this.state);
  };

  render() {
    const { navigation, loading, savedError } = this.props;
    const { id, name, error } = this.state;
    const errorData = error?.data || {};

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Item'} />
        <Content>
          <Form>
            {id &&
              <Item floatingLabel>
                <Label>ID</Label>
                <Input disabled value={id.toString()} />
              </Item>
            }
            <View>
              <Item floatingLabel>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChangeText={value => this.onChange('name', value)} />
              </Item>
              {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
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
  savedData: state.savedItem.data,
  savedError: state.savedItem.error,
  data: state.ItemById.data,
  error: state.ItemById.error,
  loading: state.ItemById.loading || state.savedItem.loading,
});

const mapDispatchToProps = {
  save,
  findItemById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ItemScreen);