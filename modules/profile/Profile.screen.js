import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import ListItemStyle from '../../constants/ListItemStyle';
import AbstractGemScreen from '../../AbstractGem.screen';
import HeaderProfile from '../../components/HeaderProfile';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gradient: {
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 20
    }
});

export class ProfileScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'Profile',
        hasHistory: false
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
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

    scrollViewOption = () => {
        return (<ScrollView style={styles.container}>
            <Text
                style={ListItemStyle.item}
                onPress={this.goToDisconnect}
            >
                Disconnect
            </Text>
        </ScrollView>);
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <HeaderProfile user={this.props.userStore}/>
                {this.scrollViewOption()}
            </View>, true);
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(ProfileScreen);
