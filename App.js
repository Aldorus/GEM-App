import React from 'react';
import {AsyncStorage, StyleSheet, View} from 'react-native';
import {AppLoading} from 'expo';
import {FontAwesome} from '@expo/vector-icons';
import RootNavigation from './navigation/RootNavigation';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';

console.disableYellowBox = true;

export default class AppContainer extends React.Component {
    asyncStorageChecked = false;
    assetsLoaded = false;
    state = {
        appIsReady: false
    };

    componentWillMount() {
        this.loadAssetsAsync();
        this.getCurrentUser();
    }

    setAsyncStorageChecked = () => {
        console.log('storage ok');
        this.asyncStorageChecked = true;
        this.setAppToReady();
    };

    setAssetsLoaded = () => {
        console.log('asset ok');
        this.assetsLoaded = true;
        this.setAppToReady();
    };

    setAppToReady = () => {
        if (this.assetsLoaded && this.asyncStorageChecked) {
            console.log('everything ok');
            this.setState({
                appIsReady: true
            });
        }
    };

    loadAssetsAsync() {
        cacheAssetsAsync({
            images: [require('./assets/images/expo-wordmark.png')],
            fonts: [
                FontAwesome.font,
                {'celia': require('./assets/fonts/Celias_Regular.ttf')},
                {'celia-bold': require('./assets/fonts/Celias_Bold.ttf')},
                {'celia-light': require('./assets/fonts/Celias_Light.ttf')},
                {'celia-medium': require('./assets/fonts/Celias_Medium.ttf')}
            ],
        }).then(this.setAssetsLoaded);
    }

    getCurrentUser = () => {
        AsyncStorage.getItem('current_user').then((user) => {
            this.user = user;
            this.setAsyncStorageChecked();
        });
    };

    render() {
        if (this.state.appIsReady) {
            const nextScreen = (!this.user) ? 'Login' : 'Main';
            return (<RootNavigation forceScreen={nextScreen}/>);
        }
        return <AppLoading/>;
    }
}
