import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import PropTypes from 'prop-types';
import cardStyle from '../../constants/Card.style';
import Colors from '../../constants/Colors';

const style = StyleSheet.create({
    container: {
        marginBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        flexDirection: 'row'
    },
    image: {
        width: 100,
        height: 100,
        marginRight: 8
    }
});

export default class FeedElementComponent extends React.Component {

    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={[cardStyle.card, style.container]}>
                <Image
                    style={style.image}
                    indicator={ProgressBar}
                    indicatorProps={{
                        color: Colors.tintColor
                    }}
                    source={{uri: this.props.gemData.image}}
                />
                <Text>
                    {this.props.gemData.title}
                </Text>
            </View>
        );
    }
}
