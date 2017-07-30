import {Notifications} from 'expo';
import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigator} from 'react-navigation';

import ListUsersScreen from '../modules/auth/ListUsers.screen';
import AddGemScreen from '../modules/gem/AddGem.screen';
import SettingsScreen from '../modules/settings/Settings.screen';
import IntroExampleScreen from '../modules/intro/IntroExample.screen';
import HomeScreen from '../modules/home/Home.screen';
import BottomNavigationGem from './BottomNavigationGem.component';
import TopNavigationGem from './TopNavigationGem.component';

const RootStackNavigator = ({initialRouteName, screenProps}) => {
    initialRouteName = 'Main';
    const stackNavigatorConfigs = {
        initialRouteName,
        cardStyle: {
            shadowColor: 'white',
        },
        navigationOptions: {
            header: {
                style: {
                    elevation: 0,       //remove shadow on Android
                    shadowOpacity: 0,   //remove shadow on iOS
                }
            }
        }
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
        }
    };

    const CustomNavigator = StackNavigator(routeConfigs, stackNavigatorConfigs);
    console.log(initialRouteName);
    return <View style={{flex:1}}>
        <TopNavigationGem/>
        <CustomNavigator screenProps={screenProps}/>
        <BottomNavigationGem/>
    </View>;
//
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
