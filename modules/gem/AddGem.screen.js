import React from 'react';
import {Button, Text, View} from 'react-native';

export default class AddGemScreen extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: 'Add a new Gem',
            headerLeft: <Button onPress={() => props.navigation.navigate('DrawerOpen')} title= "=" />
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