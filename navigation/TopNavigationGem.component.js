import React from 'react';
import {AsyncStorage, Image, StyleSheet, Text, TouchableHighlight} from 'react-native';
import {NavigationBar} from '@shoutem/ui'
import {NavigationActions} from 'react-navigation';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';
import contextualMenuImage from '../assets/icons/contextual-menu.png';
import whiteBackImage from '../assets/icons/back.png';

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignSelf: 'stretch',
        position: 'relative',
        zIndex: -10

    }
});

export default class TopNavigationGem extends React.Component {
    static propTypes = {};

    openContextualPanel = () => {
        if (this.props.onOpenContextualPanel) {
            this.props.onOpenContextualPanel();
        }
    };

    getGradient = () => {
        if (this.props.navigationOptions.background) {
            return [this.props.navigationOptions.background, this.props.navigationOptions.background];
        }
        return [Colors.gradientStart, Colors.gradientEnd];
    };

    getOrientation = () => {
        if (this.props.navigationOptions.noBackground === true) {
            return [1, 0];
        }
        return [1, 0];
    };

    goBack = () => {
        if (this.props.backButtonAction) {
            this.props.backButtonAction();
        } else {
            const backAction = NavigationActions.back();
            this.props.navigation.dispatch(backAction);
        }
    };

    renderCenterComponent = () => {
        if (this.props.navigationOptions.titleState) {
            return <Text style={{fontSize: 16}}>{this.props.navigationOptions.titleState}</Text>;
        }
        return (<TouchableHighlight underlayColor={Colors.tintColor}
                                    onPress={this.openContextualPanel}>
            <Image source={contextualMenuImage}/>
        </TouchableHighlight>);
    };

    renderLeftComponent = () => {
        if (this.props.navigationOptions.hasHistory) {
            return (<TouchableHighlight underlayColor={Colors.secondaryTintColor}
                                        onPress={this.goBack}
                                        style={{padding: 15}}>
                <Image source={whiteBackImage}/>
            </TouchableHighlight>);
        }
        return null;
    };

    goToDisconnect = () => {
        AsyncStorage.removeItem('current_user');
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                }));
    };

    renderRightComponent = () => {
        if (this.props.navigationOptions.logout) {
            console.log('Render right');
            return (<TouchableHighlight underlayColor={Colors.tintColor}
                                        style={{padding: 15}}
                                        onPress={this.goToDisconnect}>
                <Text>Logout</Text>
            </TouchableHighlight>);
        }
        return null;
    };

    render() {
        return (
            <LinearGradient colors={this.getGradient()}
                            end={this.getOrientation()}
                            style={styles.container}>
                <NavigationBar styleName="clear"
                               centerComponent={this.renderCenterComponent()}
                               rightComponent={this.renderRightComponent()}
                               leftComponent={this.renderLeftComponent()}/>
            </LinearGradient>
        );
    }
}
