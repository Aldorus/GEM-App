import React from 'react';
import {AsyncStorage, FlatList, Text, TouchableHighlight} from 'react-native';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import listItemStyle from '../../constants/ListItemStyle';

const listUsers = [
    {
        key: 'a',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    },
    {
        key: 'b',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    },
    {
        key: 'c',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    },
    {
        key: 'd',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    },
    {
        key: 'e',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    }
];

export default class ListUsersScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    state = {
        asyncStorageChecked: false
    };

    goToMainScreen = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main'})
                    ]
                }));
    };

    userSelected = (user) => {
        AsyncStorage.setItem('current_user', JSON.stringify(user)).then(this.goToMainScreen);
    };

    renderUser = ({item}) => {
        return (
            <TouchableHighlight
                onPress={() => this.userSelected(item)}
                underlayColor={Colors.tintColor}
                style={listItemStyle.item}
            >
                <Text>{item.email}</Text>
            </TouchableHighlight>
        );
    };

    renderList = () => {
        return (
            <FlatList
                style={{flex:1}}
                data={listUsers}
                renderItem={this.renderUser}
            />
        );
    };

    render = () => {
        return this.renderList();
    }
}
