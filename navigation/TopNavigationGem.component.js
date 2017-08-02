import React from 'react';
import {Image, TouchableHighlight, View, StyleSheet} from 'react-native';
import {NavigationBar} from '@shoutem/ui'
import {NavigationActions} from 'react-navigation';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';

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
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };


    renderCenterComponent = () => {
        return <TouchableHighlight underlayColor={Colors.tintColor}
                                   onPress={this.openContextualPanel}>
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
                <NavigationBar hasHistory={this.props.hasHistory}
                               styleName="clear"
                               leftComponent={this.renderLeftComponent()}/>
            </View>
        );
    };

    renderWithoutHistory = () => {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <NavigationBar styleName="clear"
                               centerComponent={this.renderCenterComponent()}/>
            </LinearGradient>
        );
    };

    render() {
        return this.props.hasHistory ? this.renderWithHistory() : this.renderWithoutHistory();
    }
}
