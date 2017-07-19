import React from 'react';
import {ScrollView, Text, TouchableHighlight} from 'react-native';
import ExpoDrawerAvatarComponent from './ExpoDrawerAvatar.component';
import Colors from '../constants/Colors';
import ListItemStyle from '../constants/ListItemStyle';

export default class ExpoDrawerContent extends React.Component {
    goToSettings = () => {
        this.props.navigation.navigate('Settings')
    };

    render() {
        return (
            <ScrollView>
                <ExpoDrawerAvatarComponent/>
                <Text>Drawer</Text>
                <TouchableHighlight
                    style={ListItemStyle.item}
                    underlayColor={Colors.tintColor}
                >
                    <Text onPress={this.goToSettings}>
                        {'\n'}{'\n'}Settings{'\n'}
                    </Text>
                </TouchableHighlight>
            </ScrollView>
        );
    }
}
