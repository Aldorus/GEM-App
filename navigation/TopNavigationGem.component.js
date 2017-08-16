import React from 'react';
import {Image, TouchableHighlight, View, StyleSheet, Text} from 'react-native';
import {NavigationBar} from '@shoutem/ui'
import {NavigationActions} from 'react-navigation';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';
import contextualMenuImage from '../assets/icons/contextual-menu.png';
import backImage from '../assets/icons/back.png';

const styles = StyleSheet.create({
    container: {
        height: 70,
        alignSelf: 'stretch'}
});

export default class TopNavigationGem extends React.Component {
    static propTypes = {};

    openContextualPanel = () => {
        console.log('Navbar touched');
        console.log(this.props.navigation);
        if (this.props.onOpenContextualPanel) {
            this.props.onOpenContextualPanel();
        }
    };

    goBack = () => {
        if(this.props.backButtonAction) {
            this.props.backButtonAction();
        } else {
            const backAction = NavigationActions.back();
            this.props.navigation.dispatch(backAction);
        }
    };


    renderCenterIconComponent = () => {
        return (<TouchableHighlight underlayColor={Colors.tintColor}
                                   onPress={this.openContextualPanel}>
            <Image source={contextualMenuImage}/>
        </TouchableHighlight>);
    };

    renderCenterTextComponent = () => {
        return <Text style={{fontSize: 16}}>{this.props.title}</Text>;
    };

    renderLeftComponent = () => {
        return (<TouchableHighlight underlayColor={Colors.tintColor}
                                   onPress={this.goBack}
                                   style={{marginLeft: 10}}>
            <Image source={backImage}/>
        </TouchableHighlight>);
    };

    renderWithHistory = () => {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <NavigationBar hasHistory={this.props.hasHistory}
                               styleName="clear"
                               centerComponent={this.renderCenterTextComponent()}
                               leftComponent={this.renderLeftComponent()}/>

            </LinearGradient>
        );
    };

    renderWithoutHistory = () => {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <NavigationBar styleName="clear"
                               centerComponent={this.renderCenterIconComponent()}/>
            </LinearGradient>
        );
    };

    render() {
        return this.props.hasHistory ? this.renderWithHistory() : this.renderWithoutHistory();
    }
}
