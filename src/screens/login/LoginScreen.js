import React, { Component } from 'react';
import { Button, Container, Text, Form, Item, Input, View, CardItem, Body } from 'native-base';
import CommonHeader from '../../components/CommonHeader';
import Styles from './Styles';
import { Card } from 'react-native-paper';

class LoginScreen extends Component {
  render() {
    const { navigation } = this.props;
    return (
      <Container style={Styles.Content}>
        <CommonHeader
          navigation={navigation}
          hideLeftButton={true}
          title={'Login'}
        />
        <Card style={Styles.Card}>
          <View>
            <CardItem header>
              <Text style={Styles.font}>Login</Text>
            </CardItem>
            <CardItem >
              <Body>
                <Form style={Styles.Form}>
                  <Item regular style={Styles.Input}>
                    <Input placeholder='Username'/>
                  </Item>
                  <Item regular style={Styles.Input}>
                    <Input placeholder='Password'/>
                  </Item>
                  <Button rounded style={Styles.Button} full onPress={() => navigation.navigate('Main')}>
                    <Text>Login</Text>
                  </Button>
                </Form>
              </Body>
            </CardItem>
          </View>
        </Card>

      </Container>
    );
  }
}

export default LoginScreen;
