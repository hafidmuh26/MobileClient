import {LoginScreen} from '../screens/login';
import {MainScreen} from '../screens/main';
import ItemScreen from '../screens/items/form/ItemScreen';
import UnitScreen from '../screens/units/form/UnitScreen';
import StockScreen from '../screens/stocks/form/StockScreen';
import StockSum from '../screens/stocks/form/StockSum';
import TransactionScreen from '../screens/transaction/form/TransactionScreen';
import TransactionSum from '../screens/transaction/form/TransactionSum';

import {UnitOptions, ItemOptions} from '../screens/stocks';

export const stackRoutes = [
  {
    name: 'Login',
    component: LoginScreen,
  },
  {
    name: 'Main',
    component: MainScreen,
  },
  {
    name: 'Item',
    component: ItemScreen,
  },
  {
    name: 'Unit',
    component: UnitScreen,
  },
  {
    name: 'Stock',
    component: StockScreen,
  },
  {
    name: 'StockSum',
    component: StockSum,
  },
  {
    name: 'Transaction',
    component: TransactionScreen,
  },
  {
    name: 'TransactionSum',
    component: TransactionSum,
  },
  {
    name: 'ItemOptions',
    component: ItemOptions,
  },
  {
    name: 'UnitOptions',
    component: UnitOptions,
  },
];

export default stackRoutes;

