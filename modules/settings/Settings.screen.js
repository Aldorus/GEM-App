import React from 'react';
import PropTypes from 'prop-types';
import {ScrollView, StyleSheet, Text, AsyncStorage} from 'react-native';
import {NavigationActions} from 'react-navigation';
import ListItemStyle from '../../constants/ListItemStyle';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default class SettingsScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

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
                <Text
                    style={ListItemStyle.item}
                    onPress={this.goToDisconnect}
                >Disconnect</Text>
            </ScrollView>
        );
    }
}
