import React from 'react';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallIcon: {},
    bigIcon: {
        bottom: 20
    }
});

export default class BottomNavigationGem extends React.Component {
    static propTypes = {};

    goToNewGem = () => {
        this.props.navigation.navigate('AddGem', {
            transition: 'fromBottom'
        });
    };

    goToListGems = () => {

    };

    goToAddFriend = () => {

    };

    goToParams = () => {

    };

    goToLove = () => {

    };

    render() {

        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                end={[1, 0]}
                style={styles.container}
            >
                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToListGems}>
                    <Image source={require('../assets/icons/gem.png')}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToAddFriend}>
                    <Image source={require('../assets/icons/add-friend.png')}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.bigIcon]}
                                    onPress={this.goToNewGem}>
                    <Image source={require('../assets/icons/add-gem.png')}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={this.goToParams}>
                    <Image source={require('../assets/icons/params.png')}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={this.goToLove}>
                    <Image source={require('../assets/icons/love.png')}/>
                </TouchableHighlight>
            </LinearGradient>
        );
    }
}
