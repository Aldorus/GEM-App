import React from 'react';
import {LinearGradient} from 'expo';
import {StyleSheet, View} from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
    }
});

export default class GradientBackground extends React.Component {
    render = () => {
        return (<LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                               end={[1, 0]}
                               style={[styles.container, this.props.style]}>
            {this.props.children}
        </LinearGradient>);
    };
}