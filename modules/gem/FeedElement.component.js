import React from 'react';
import {Image, Text, StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';

const style = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        margin: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1
    }
});

export default class FeedElementComponent extends React.Component {

    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={style.container}>
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