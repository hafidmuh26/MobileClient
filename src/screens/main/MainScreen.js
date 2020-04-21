import React, { Component } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CommonDrawer from '../../components/CommonDrawer/CommonDrawer';
import drawerRoutes from '../../configs/drawerRoutes';

const Drawer = createDrawerNavigator();

function DrawerContent(props) {
  return (
    <CommonDrawer {...props} />
  );
}

class MainScreen extends Component {

  render() {

    return (
      <Drawer.Navigator
        backBehavior='initialRoute'
        drawerContent={DrawerContent}
        screenOptions={{
          unmountOnBlur: true
        }}>
        {drawerRoutes.map((route, index) =>
          <Drawer.Screen
            key={index}
            name={route.name}
            component={route.component}
          />
        )}
      </Drawer.Navigator>
    );
  }
}

export default MainScreen;
