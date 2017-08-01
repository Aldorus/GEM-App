import React from 'react';
import {StyleSheet, View} from 'react-native';
import StyledText from '../../components/StyledText';
import StyledTitle from '../../components/StyledTitle';

const style = StyleSheet.create({
    container: {
        flexDirection: 'column',
        flex: 1,
        marginBottom: 15,
        paddingLeft: 65,
        paddingRight: 15
    }
});

export default class ExternalSearchResultElement extends React.Component {
    render() {
        return (
            <View style={[style.container]}>
                <StyledText>{this.props.result.category}</StyledText>
                <StyledTitle numberOfLines={1}>{this.props.result.title}</StyledTitle>
                <StyledText>{this.props.result.shortLabel}</StyledText>
            </View>
        );
    }
}
