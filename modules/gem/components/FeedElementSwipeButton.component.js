import React from 'react';
import {StyleSheet, TouchableHighlight, Image, View} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../../../constants/Colors';
import listGemImage from '../../../assets/icons/list-gem@2x.png';
import loveImage from '../../../assets/icons/love@2x.png';
import shareImage from '../../../assets/icons/share@2x.png';

const styles =  StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 1
    },
    button: {

    }
});

export class FeedElementSwipeButton extends React.Component {

    goToShare = () => {

    };

    goToLove = () => {

    };

    goToListGems = () => {

    };

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight style={[styles.button]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToListGems}>
                    <Image source={listGemImage}/>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.button]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToLove}>
                    <Image source={loveImage}/>
                </TouchableHighlight>
                <TouchableHighlight style={[styles.button]}
                                    underlayColor={Colors.secondaryTintColor}
                                    onPress={this.goToShare}>
                    <Image source={shareImage}/>
                </TouchableHighlight>
            </View>

        );
    }
}

export default (FeedElementSwipeButton);
