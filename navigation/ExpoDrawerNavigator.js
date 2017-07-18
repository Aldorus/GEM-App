/**
 * @flow
 */

import React from 'react';
import {Platform} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import HomeScreen from '../modules/home/Home.screen';
import LinksScreen from '../screens/LinksScreen';
import ExpoDrawerContent from './ExpoDrawerContent';

export default DrawerNavigator({
    Home: {
        screen: HomeScreen
    },
    Links: {
        screen: LinksScreen
    }
}, {
    initialRouteName: 'Home',
    contentComponent: ({navigation}) => <ExpoDrawerContent navigation={navigation}/>,
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
});
