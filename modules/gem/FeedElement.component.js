import React from 'react';
import {StyleSheet, View} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import StyledText from '../../components/StyledText';
import StyledTitle from '../../components/StyledTitle';

const style = StyleSheet.create({
    container: {
        margin: 10,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 15,
        paddingBottom: 10
    },
    image: {
        width: 30,
        height: 30,
        padding: 10,
        marginRight: 8,
        top: 5
    }
});

export default class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={[style.container]}>
                <Image
                    borderRadius="15"
                    style={style.image}
                    indicator={ProgressBar}
                    indicatorProps={{
                        color: Colors.tintColor
                    }}
                    source={{uri: this.props.gemData.avatar}}
                />
                <View style={style.textWrapper}>
                    <StyledText>{this.props.gemData.category}</StyledText>
                    <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                    <StyledText>{this.props.gemData.shortLabel}</StyledText>
                </View>
            </View>
        );
    }
}
