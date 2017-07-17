import React from 'react';
import {Button, Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Gem'
    };

    render() {
        return (
            <View>
                <Text>
                    Get started by opening this awesome
                </Text>
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="Go to notifications"
                />
            </View>
        );
    }
}