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
        if (this.props.alternative) {
            return [Colors.gradientAlternativeStart, Colors.gradientAlternativeEnd];
        } else if (this.props.opacity) {
            return [Colors.opacityGradientStart, Colors.opacityGradientEnd];
        }
        return [Colors.gradientStart, Colors.gradientEnd];
    };

    render = () => {
        return (<LinearGradient colors={this.getColor()}
                                end={[1, 0]}
                                style={[styles.container, this.props.style]}>
            {this.props.children}
        </LinearGradient>);
    };
}