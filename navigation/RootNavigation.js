import {Notifications} from 'expo';
import React from 'react';
import {View} from 'react-native';
import {StackNavigator} from 'react-navigation';

import ListUsersScreen from '../modules/auth/ListUsers.screen';
import AddGemScreen from '../modules/gem/AddGem.screen';
import SettingsScreen from '../modules/settings/Settings.screen';
import IntroExampleScreen from '../modules/intro/IntroExample.screen';
import HomeScreen from '../modules/home/Home.screen';
import ListSaveScreen from '../modules/save/ListSave.screen';
import {TransitionEngine} from '../utilities/transitions/TransitionEngine';

const RootStackNavigator = ({initialRouteName}) => {
    const stackNavigatorConfigs = {
        initialRouteName,
        cardStyle: {
            shadowColor: 'transparent'
        },
        transitionConfig: TransitionEngine
    };

    const routeConfigs = {
        Login: {
            screen: ListUsersScreen
        },
        Intro: {
            screen: IntroExampleScreen
        },
        Main: {
            screen: HomeScreen
        },
        AddGem: {
            screen: AddGemScreen
        },
        Settings: {
            screen: SettingsScreen
        },
        ListSave: {
            screen: ListSaveScreen
        }
    };

    const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
    return <View style={{flex: 1}}>
        <CustomNavigator/>
    </View>;
};

export default class RootNavigator extends React.Component {
    componentDidMount() {
        this.notificationSubscription = this.registerForPushNotifications();
    }

    componentWillUnmount() {
        if (this.notificationSubscription) {
            this.notificationSubscription.remove();
        }
    }

    registerForPushNotifications() {
        // Send our push token over to our backend so we can receive notifications
        // You can comment the following line out if you want to stop receiving
        // a notification every time you open the app. Check out the source
        // for this function in api/registerForPushNotificationsAsync.js
        // registerForPushNotificationsAsync();

        // Watch for incoming notifications
        this.notificationSubscription = Notifications.addListener(
            this.handleNotification
        );
    }

    handleNotification = ({origin, data}) => {
        console.log(
            `Push notification ${origin} with data: ${JSON.stringify(data)}`
        );

    };

    render() {
        return <RootStackNavigator initialRouteName={this.props.forceScreen}/>;
    }
}
