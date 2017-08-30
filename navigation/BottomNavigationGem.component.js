import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
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
import StyledText from '../components/StyledText';

const styles = StyleSheet.create({
    container: {
        height: 45,
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
        bottom: 31,
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
                                routeName: 'Profile',
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

    // TODO
    renderImage = (state, imageOn, imageOff) => {
        return (<View style={{alignItems: 'center'}}>
            {state.indexOf(this.props.stateName) >= 0 ? <Image source={imageOn}/> : <Image source={imageOff}/>}
            <StyledText style={{fontSize: 10}}>{state[0]}</StyledText>
        </View>);
    };

    render() {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={() => this.goToListGems('home')}>
                    {this.renderImage(['Home'], listGemOnImage, listGemOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={() => this.goToAddFriend('addFriend')}>
                    {this.renderImage(['Friend', 'Detail Friend'], addFriendOnImage, addFriendOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.bigIcon]}
                                    underlayColor="transparent"
                                    onPress={this.goToNewGem}>
                    <Image source={addGemImage}/>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={() => this.goToParams('params')}>
                    {this.renderImage(['Profile'], paramsOnImage, paramsOffImage)}
                </TouchableHighlight>

                <TouchableHighlight style={[styles.icon, styles.smallIcon]}
                                    underlayColor={Colors.tintColor}
                                    onPress={() => this.goToLove('saved')}>
                    {this.renderImage(['Saved'], loveImage, loveImage)}
                </TouchableHighlight>
            </LinearGradient>
        );
    }
}
