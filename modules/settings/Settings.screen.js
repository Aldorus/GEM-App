import React from 'react';
import PropTypes from 'prop-types';
import {Segment} from 'expo';
import {AsyncStorage, ScrollView, StyleSheet, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import ListItemStyle from '../../constants/ListItemStyle';
import AbstractGemScreen from '../../AbstractGem.screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    }
});

export default class SettingsScreen extends AbstractGemScreen {
    stateName = 'params';
    titleState = 'Parameters';
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        super.componentDidMount();
        Segment.track('Settings page');
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
        return super.render(
            <ScrollView style={styles.container}>
                <Text
                    style={ListItemStyle.item}
                    onPress={this.goToDisconnect}
                >Disconnect</Text>
            </ScrollView>
            , true);
    }
}
