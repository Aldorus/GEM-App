import React from 'react';
import {Button, Text, View} from 'react-native';
import FeedComponent from '../gem/Feed.component';

export default class HomeScreen extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: 'Gem',
            headerLeft: <Button onPress={() => props.navigation.navigate('DrawerOpen')} title= "=" />,
            headerRight: <Button onPress={() => props.navigation.navigate('AddGem')} title= "+" />
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

                <FeedComponent></FeedComponent>
            </View>
        );
    }
}