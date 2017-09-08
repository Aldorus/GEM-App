import React from 'react';
import {Image, TouchableHighlight, StyleSheet} from 'react-native';
import Colors from '../../../constants/Colors';
import listGemImage from '../../../assets/icons/trash@2x.png';
import GradientBackground from '../../../components/GradientBackground';

const styles = StyleSheet.create({
    swipeButton: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export const feedElementSwipeButtonUser = [
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={listGemImage}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    }
];

