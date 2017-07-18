import React from 'react';
import {ScrollView, Text} from 'react-native';
import ExpoDrawerAvatarComponent from './ExpoDrawerAvatar.component';

export default class ExpoDrawerContent extends React.Component {
    render() {
        return (
            <ScrollView>
                <ExpoDrawerAvatarComponent/>
                <Text>Drawer</Text>

            </ScrollView>
        );
    }
}
