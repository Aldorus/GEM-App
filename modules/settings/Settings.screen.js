import React from 'react';
import {ScrollView, StyleSheet, Text, AsyncStorage} from 'react-native';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'app.json',
    };

    goToDisconnect = () => {
        AsyncStorage.removeItem('current_user');
        this.props.navigation.navigate('Login');
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
