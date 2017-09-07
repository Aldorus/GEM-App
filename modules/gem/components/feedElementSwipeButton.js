import React from 'react';
import {Image, TouchableHighlight, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import listGemImage from '../../../assets/icons/list-gem-off@2x.png';
import loveImage from '../../../assets/icons/love-off@2x.png';
import shareImageIOS from '../../../assets/icons/share-ios@2x.png';
import GradientBackground from '../../../components/GradientBackground';

const styles = StyleSheet.create({
    swipeButton: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const feedElementSwipeButton = [
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={listGemImage}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    },
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={loveImage}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    },
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={shareImageIOS}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    }
];

