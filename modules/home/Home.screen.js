import React from 'react';
import {Button, Text, View} from 'react-native';

export default class HomeScreen extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: 'Gem',
            headerLeft: <Button onPress={() => props.navigation.navigate('DrawerOpen')} title= "=" />
        };
    };

    render() {
        return (
            <View>
                <Text>
                    Hello Welcome on GEM !
                </Text>
                <Text>
                    Share your most incredible experiences with your friends !
                </Text>
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="Go to notifications"
                />
            </View>
        );
    }
}