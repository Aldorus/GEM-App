import React from 'react';
import {Image} from 'react-native';
import {NavigationBar} from '@shoutem/ui'
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';

export default class TopNavigationGem extends React.Component {
    static propTypes = {};

    render() {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                end={[1, 0]}
                style={{height: 70, alignSelf: 'stretch'}}
            >
                <NavigationBar
                    styleName="clear"
                    centerComponent={<Image source={require('../assets/icons/contextual-menu@2x.png')}></Image>}
                />
            </LinearGradient>
        );
    }
}
