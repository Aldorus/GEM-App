import React from 'react';
import {StyleSheet, View, TouchableHighlight} from 'react-native';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';
import Colors from '../../../constants/Colors';

const styles = StyleSheet.create({
    highlight: {
        alignSelf: 'stretch'
    },
    container: {
        marginBottom: 15,
        paddingLeft: 65,
        paddingRight: 15
    }
});

export default class ExternalSearchResultElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    pressed = (result) => {
        this.setState({
            selected: true
        });
        if(this.props.elementPressed) {
            this.props.elementPressed(result);
        }
    };

    render() {
        return (
            <TouchableHighlight onPress={() => this.pressed(this.props.result)}
                                underlayColor={Colors.white}
                                style={styles.highlight}>
                <View style={[styles.container]}>
                    <StyledText>{this.props.result.category}</StyledText>
                    <StyledTitle numberOfLines={1}>{this.props.result.title}</StyledTitle>
                    <StyledText>{this.props.result.shortLabel}</StyledText>
                </View>
            </TouchableHighlight>
        );
    }
}
