import React from 'react';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import {LinearGradient} from 'expo';
import {NavigationActions} from 'react-navigation';
import Colors from '../constants/Colors';
import listGemOnImage from '../assets/icons/list-gem-on@2x.png';
import listGemOffImage from '../assets/icons/list-gem-off@2x.png';
import addFriendOffImage from '../assets/icons/add-friend-off@2x.png';
import addFriendOnImage from '../assets/icons/add-friend-on@2x.png';
import addGemImage from '../assets/icons/add-gem@2x.png';
import paramsOffImage from '../assets/icons/params-off@2x.png';
import paramsOnImage from '../assets/icons/params-on@2x.png';
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

    goToListGems = (state) => {
        if (this.props.stateName !== state) {
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Main',
                                transition: 'opacity'
                            })
                        ]
                    }));
        }
    };

    goToAddFriend = (state) => {
        if (this.props.stateName !== state) {
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'AddFriends',
                                transition: 'opacity'
                            })
                        ]
                    }));
        }
    };

    goToParams = (state) => {
        if (this.props.stateName !== state) {
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'Settings',
                                transition: 'opacity'
                            })
                        ]
                    }));
        }
    };

    goToLove = (state) => {
        if (this.props.stateName !== state) {
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({
                                routeName: 'ListSave',
                                transition: 'opacity'
                            })
                        ]
                    }));
        }
    };

    renderImage = (state, imageOn, imageOff) => {
        return this.props.stateName === state ? <Image source={imageOn}/> : <Image source={imageOff}/>;
    };

    render() {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={() => this.goToListGems('home')}>
                    {this.renderImage('home', listGemOnImage, listGemOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={() => this.goToAddFriend('addFriend')}>
                    {this.renderImage('addFriend', addFriendOnImage, addFriendOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.bigIcon]}
                                    underlayColor="transparent"
                                    onPress={this.goToNewGem}>
                    <Image source={addGemImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={() => this.goToParams('params')}>
                    {this.renderImage('params', paramsOnImage, paramsOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={() => this.goToLove('saved')}>
                    {this.renderImage('saved', loveImage, loveImage)}
                </TouchableHighlight>
            </LinearGradient>
        );
    }
}
