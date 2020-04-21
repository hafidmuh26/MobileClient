import React, { Component } from 'react';
import { Container, Content, Text, ListItem, Left, Body, Icon } from 'native-base';
import Styles from './Styles';

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
        label: 'Stock',
        target: 'Stock'
    },
    {
        icon: 'calculator',
        type: 'Entypo',
        label: 'Transaction',
        target: 'Transaction'
    },
    {
        icon: 'profile',
        type: 'AntDesign',
        label: 'About',
        target: 'About'
    },
];


function BottomMenu({navigation, menu}) {
    return (
        <ListItem icon onPress={() => navigation.navigate(menu.target)} >
            <Left>
                <Icon name={menu.icon} type={menu.type} />
            </Left>
            <Body>
                <Text>{menu.label}</Text>
            </Body>
        </ListItem>
    )
}

class CommonBottom extends Component {

    render() {
        const { navigation } = this.props;

        return (
            <Container>
                <Content>
                    {menus.map((menu, index) =>
                        <BottomMenu
                            key={index}
                            navigation={navigation}
                            menu={menu} />
                    )}
                </Content>
            </Container>
        );
    }
}

export default CommonBottom;
