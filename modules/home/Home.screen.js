import React from 'react';
import {View} from 'react-native';
import FeedComponent from '../gem/Feed.component';
import BottomNavigationGem from '../../navigation/BottomNavigationGem.component';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem navigation={this.props.navigation}/>
                <FeedComponent></FeedComponent>
                <BottomNavigationGem navigation={this.props.navigation}/>
            </View>
        );
    }
}
