import React, { Component } from 'react';
import { Container, Content, Text, ListItem, Left, Body, Icon } from 'native-base';
import { ImageBackground } from 'react-native';
import styles from './Style';

const menus = [
    {
        icon: 'home',
        label: 'Home',
        target: 'Home'
    },
    {
        icon: 'shopping-bag',
        label: 'Items',
        target: 'Items',
        type: 'Entypo'
    },
    {
        icon: 'cloudscale',
        type: 'FontAwesome5',
        label: 'Units',
        target: 'Units'
    },
    {
        icon: 'archive',
        type: 'Entypo',
        label: 'Stocks',
        target: 'Stocks'
    },
    {
        icon: 'calculator',
        type: 'Entypo',
        label: 'Transactions',
        target: 'Transactions'
    }
];


function DrawerMenu({navigation, menu}) {
    return (
        <ListItem icon onPress={() => navigation.navigate(menu.target)} style={styles.Menus}>
            <Left>
                <Icon name={menu.icon} type={menu.type} />
            </Left>
            <Body>
                <Text>{menu.label}</Text>
            </Body>
        </ListItem>
    )
}

class CommonDrawer extends Component {

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <Content>
                    <ImageBackground 
                        source={require('../../../assert/images/drawer.jpg')} 
                        style={styles.images}
                       >
                    </ImageBackground>
                    {menus.map((menu, index) =>
                        <DrawerMenu
                            key={index}
                            navigation={navigation}
                            menu={menu} />
                    )}
                </Content>
            </Container>
        );
    }
}

export default CommonDrawer;
