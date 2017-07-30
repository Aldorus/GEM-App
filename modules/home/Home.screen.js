import React from 'react';
import {View} from 'react-native';
import FeedComponent from '../gem/Feed.component';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <FeedComponent></FeedComponent>
            </View>
        );
    }
}
