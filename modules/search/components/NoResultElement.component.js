import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import StyledText from '../../../components/StyledText';
import Colors from '../../../constants/Colors';
import StyledTitle from '../../../components/StyledTitle';

const styles = StyleSheet.create({
    highlight: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        opacity: 0.4
    },
    container: {
        paddingBottom: 13,
        paddingLeft: 35,
        paddingRight: 15,
        paddingTop: 10
    }
});

export default class NoResultElement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    // TODO not for the mve
    pressed = (result) => {
    //     this.setState({
    //         selected: true
    //     });
    //     if (this.props.elementPressed) {
    //         this.props.elementPressed(result);
    //     }
    };

    render() {
        return (
            <TouchableHighlight onPress={() => this.pressed(this.props.result)}
                                underlayColor={Colors.tintColor}
                                style={styles.highlight}>
                <View style={[styles.container]}>
                    <StyledText>You don't find your GEM</StyledText>
                    <StyledTitle>Add a new One (Soon)</StyledTitle>
                    <StyledText>And share it whit your community</StyledText>
                </View>
            </TouchableHighlight>
        );
    }
}
