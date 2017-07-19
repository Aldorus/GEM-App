import React from 'react';
import {Text, View} from 'react-native';

export default class AddGemScreen extends React.Component {
    static navigationOptions = () => {
        return {
            title: 'Add a new Gem'
        };
    };

    render() {
        return (
            <View>
                <Text>
                    Share a new Gem
                </Text>
            </View>
        );
    }
}
