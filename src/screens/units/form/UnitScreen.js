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
import { save, findUnitById } from '../../../actions/unitsAction';
import styles from '../form/styles';
import { showError } from '../../../util/toast';

class UnitScreen extends Component {
  constructor(props) {
    super(props);

    const { route } = this.props;

    this.state = {
      id: route.params?.id,
      name: '',
      description: '',
    };
  }

  componentDidMount() {
    const { id } = this.state;
    if (id) {
      this.props.findUnitById(this.state.id);
    }
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
    const { id, name, description } = this.state;
    const errorData = savedError?.data || {};

    return (
      <Container>
        <CommonHeader navigation={navigation} title={'Unit'} />
        <Content>
          <Form>
            {id &&
              <Item floatingLabel>
                <Label>ID</Label>
                <Input disabled value={id.toString()} />
              </Item>
            }
            <View>
              <Item floatingLabel error={errorData?.name != null}>
                <Label>Name</Label>
                <Input
                  value={name}
                  onChangeText={value => this.onChange('name', value)} />
              </Item>
              {errorData?.name && <Text style={styles.error}>{errorData.name[0]}</Text>}
              <Item floatingLabel error={errorData?.description != null}>
                <Label>Description</Label>
                <Input
                  value={description}
                  onChangeText={value => this.onChange('description', value)} />
              </Item>
              {errorData?.description && <Text style={styles.error}>{errorData.description[0]}</Text>}
            </View>
          </Form>
          <Button style={styles.button} full onPress={this.onSubmit} disabled={loading}>
              <Text>Save</Text>
            </Button> 
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  savedData: state.savedUnit.data,
  savedError: state.savedUnit.error,
  data: state.UnitById.data,
  error: state.UnitById.error,
  loading: state.UnitById.loading || state.savedUnit.loading,
});

const mapDispatchToProps = {
  save,
  findUnitById,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UnitScreen);