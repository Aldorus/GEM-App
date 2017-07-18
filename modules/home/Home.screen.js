import React from 'react';
import {View} from 'react-native';
import FeedComponent from '../gem/Feed.component';
import ExpoDrawerRightComponent from '../../navigation/ExpoDrawerRight.component';
import ExpoDrawerLeftComponent from '../../navigation/ExpoDrawerLeft.component';

export default class HomeScreen extends React.Component {
    static navigationOptions = (props) => {
        return {
            title: 'Gem',
            headerLeft: <ExpoDrawerLeftComponent navigation={props.navigation}/>,
            headerRight: <ExpoDrawerRightComponent navigation={props.navigation}/>
        };
    };

    render() {
        return (
            <View>
                <FeedComponent></FeedComponent>
            </View>
        );
    }
}