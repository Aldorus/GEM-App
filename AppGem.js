import React from 'react';
import {AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {AppLoading} from 'expo';
import RootNavigation from './navigation/RootNavigation';
import cacheAssetsAsync from './utilities/cacheAssetsAsync';
import * as types from './constants/ActionTypes';

export class AppGem extends React.Component {
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
        this.asyncStorageChecked = true;
        this.setAppToReady();
    };

    setAssetsLoaded = () => {
        this.assetsLoaded = true;
        this.setAppToReady();
    };

    setAppToReady = () => {
        if (this.assetsLoaded && this.asyncStorageChecked) {
            this.setState({
                appIsReady: true
            });
        }
    };

    loadAssetsAsync() {
        cacheAssetsAsync({
            images: [
                require('./assets/images/expo-wordmark.png'),
                require('./assets/icons/add-friend@2x.png'),
                require('./assets/icons/add-gem@2x.png'),
                require('./assets/icons/app-icon.png'),
                require('./assets/icons/back@2x.png'),
                require('./assets/icons/close@2x.png'),
                require('./assets/icons/contextual-menu@2x.png'),
                require('./assets/icons/gem@2x.png'),
                require('./assets/icons/list-gem@2x.png'),
                require('./assets/icons/loading-icon.png'),
                require('./assets/icons/love@2x.png'),
                require('./assets/icons/notification-icon.png'),
                require('./assets/icons/params@2x.png'),
                require('./assets/icons/search@2x.png'),
                require('./assets/icons/share@2x.png')
            ],
            fonts: [
                {'celia': require('./assets/fonts/Celias_Regular.ttf')},
                {'celia-bold': require('./assets/fonts/Celias_Bold.ttf')},
                {'celia-light': require('./assets/fonts/Celias_Light.ttf')},
                {'celia-medium': require('./assets/fonts/Celias_Medium.ttf')},
                {'Rubik-Black': require('./node_modules/@shoutem/ui/fonts/Rubik-Black.ttf')},
                {'Rubik-BlackItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BlackItalic.ttf')},
                {'Rubik-Bold': require('./node_modules/@shoutem/ui/fonts/Rubik-Bold.ttf')},
                {'Rubik-BoldItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-BoldItalic.ttf')},
                {'Rubik-Italic': require('./node_modules/@shoutem/ui/fonts/Rubik-Italic.ttf')},
                {'Rubik-Light': require('./node_modules/@shoutem/ui/fonts/Rubik-Light.ttf')},
                {'Rubik-LightItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-LightItalic.ttf')},
                {'Rubik-Medium': require('./node_modules/@shoutem/ui/fonts/Rubik-Medium.ttf')},
                {'Rubik-MediumItalic': require('./node_modules/@shoutem/ui/fonts/Rubik-MediumItalic.ttf')},
                {'Rubik-Regular': require('./node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf')},
                {'rubicon-icon-font': require('./node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf')}
            ],
        }).then(this.setAssetsLoaded);
    }

    getCurrentUser = () => {
        AsyncStorage.getItem('current_user').then((user) => {
            this.user = JSON.parse(user);
            this.props.dispatch({
                type: types.LOAD_USER,
                user: this.user
            });
            this.setAsyncStorageChecked();
        });
    };

    render() {
        if (this.state.appIsReady) {
            const nextScreen = (!this.user) ? 'Login' : 'Main';
            return (
                <RootNavigation forceScreen={nextScreen}/>
            );
        }
        return <AppLoading/>;
    }
}

export default connect()(AppGem);
