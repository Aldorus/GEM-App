import React from 'react';
import {ScrollView, Text} from 'react-native';
import ExpoDrawerAvatarComponent from './ExpoDrawerAvatar.component';

export default class ExpoDrawerContent extends React.Component {
    goToSettings = () => {
        this.props.navigation.navigate('Settings')
    };

    render() {
        return (
            <ScrollView>
                <ExpoDrawerAvatarComponent/>
                <Text>Drawer</Text>
                <Text onPress={this.goToSettings}>{'\n'}{'\n'}Settings{'\n'}</Text>
            </ScrollView>
        );
    }
}
