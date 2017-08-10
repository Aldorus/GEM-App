import React from 'react';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';
import listGemImage from '../assets/icons/list-gem@2x.png';
import addFriendImage from '../assets/icons/add-friend@2x.png';
import addGemImage from '../assets/icons/add-gem@2x.png';
import paramsImage from '../assets/icons/params@2x.png';
import loveImage from '../assets/icons/love@2x.png';

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
        bottom: 30,
        height: 62
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
        this.props.navigation.navigate('Main', {
            transition: 'fromRight'
        });
    };

    goToAddFriend = () => {

    };

    goToParams = () => {
        this.props.navigation.navigate('Settings', {
            transition: 'fromLeft'
        });
    };

    goToLove = () => {
        this.props.navigation.navigate('ListSave', {
            transition: 'fromLeft'
        });
    };

    render() {

        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToListGems}>
                    <Image source={listGemImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToAddFriend}>
                    <Image source={addFriendImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.bigIcon]}
                                    underlayColor="transparent"
                                    onPress={this.goToNewGem}>
                    <Image source={addGemImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={this.goToParams}>
                    <Image source={paramsImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={this.goToLove}>
                    <Image source={loveImage}/>
                </TouchableHighlight>
            </LinearGradient>
        );
    }
}
