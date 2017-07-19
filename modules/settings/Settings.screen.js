import React from 'react';
import {ScrollView, StyleSheet, Text, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    goToDisconnect = () => {
        AsyncStorage.removeItem('current_user');
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                }));
    };

    render() {
        return (
            <ScrollView style={styles.container}>
                <Text onPress={this.goToDisconnect}>Disconnect</Text>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});
