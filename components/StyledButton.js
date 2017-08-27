import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from '@shoutem/ui';
import StyledText from './StyledText';

const styles = StyleSheet.create({
    text: {
        paddingTop: 10,
        paddingBottom: 10,
    }
});

export default class StyledButton extends React.Component {
    onPress = () => {
        if (this.props.onPress) {
            this.props.onPress();
        }
    };

    render = () => {
        return (
            <Button tyleName="clear" onPress={this.onPress} style={this.props.style}>
                <StyledText style={[styles.text]}>{this.props.children}</StyledText>
            </Button>
        );
    };
}
