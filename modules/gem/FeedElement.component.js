import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import cardStyle from '../../constants/Card.style';

const style = StyleSheet.create({
    container: {
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
                    style={{width: 100, height: 100}}
                    source={{uri: this.props.gemData.image }}
                ></Image>
                <Text>
                    {this.props.gemData.title}
                </Text>
            </View>
        );
    }
}