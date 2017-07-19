/**
 * @flow
 */

import React from 'react';
import {Platform} from 'react-native';
import {DrawerNavigator} from 'react-navigation';
import HomeScreen from '../modules/home/Home.screen';
import ExpoDrawerContent from './ExpoDrawerContent';

export default DrawerNavigator({
    Home: {
        screen: HomeScreen
    }
}, {
    initialRouteName: 'Home',
    contentComponent: ({navigation}) => {
        return <ExpoDrawerContent navigation={navigation}/>;
    },
    mode: Platform.OS === 'ios' ? 'modal' : 'card'
});
