import React from 'react';
import {LinearGradient} from 'expo';
import {StyleSheet} from 'react-native';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
    }
});

export default class GradientBackground extends React.Component {
    getColor = () => {
        return this.props.alternative ?
            [Colors.gradientAlternativeStart, Colors.gradientAlternativeEnd] :
            [Colors.gradientStart, Colors.gradientEnd];
    };

    render = () => {
        return (<LinearGradient colors={this.getColor()}
                                end={[1, 0]}
                                style={[styles.container, this.props.style]}>
            {this.props.children}
        </LinearGradient>);
    };
}