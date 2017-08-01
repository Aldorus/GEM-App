import React from 'react';
import {Image, TouchableHighlight, View} from 'react-native';
import {NavigationBar} from '@shoutem/ui'
import { NavigationActions } from 'react-navigation';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';

export default class TopNavigationGem extends React.Component {
    static propTypes = {};

    goToParams = () => {
        console.log('Navbar touched');
        console.log(this.props.navigation)
    };

    goBack = () => {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };

    renderCenterComponent = () => {
        return <TouchableHighlight underlayColor={Colors.tintColor}
                                   onPress={this.goToParams}>
            <Image source={require('../assets/icons/contextual-menu.png')}/>
        </TouchableHighlight>;
    };

    renderLeftComponent = () => {
        return <TouchableHighlight underlayColor={Colors.tintColor}
                                   onPress={this.goBack}
                                   style={{marginLeft: 10}}>
            <Image source={require('../assets/icons/back.png')}/>
        </TouchableHighlight>;
    };

    renderWithHistory = () => {
        return (
            <View style={{height: 70, alignSelf: 'stretch', backgroundColor: 'white'}}>
                <NavigationBar
                    hasHistory={this.props.hasHistory}
                    styleName="clear"
                    leftComponent={this.renderLeftComponent()}
                />
            </View>
        );
    };

    renderWithoutHistory = () => {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                end={[1, 0]}
                style={{height: 70, alignSelf: 'stretch'}}
            >
                <NavigationBar
                    styleName="clear"
                    centerComponent={this.renderCenterComponent()}
                />
            </LinearGradient>
        );
    };

    render() {
        return this.props.hasHistory ? this.renderWithHistory() : this.renderWithoutHistory();
    }
}
