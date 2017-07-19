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
    }
];

export default class ListUsersScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    state = {
        asyncStorageChecked: false
    };

    static navigationOptions = {
        title: 'Login'
    };

    componentDidMount() {
        AsyncStorage.getItem('current_user').then((user) => {
            if (user) {
                this.props
                    .navigation
                    .dispatch(NavigationActions.reset(
                        {
                            index: 0,
                            actions: [
                                NavigationActions.navigate({routeName: 'Main'})
                            ]
                        }));
            }
        });
    }

    userSelected = (user) => {
        AsyncStorage.setItem('current_user', JSON.stringify(user)).then(() => {
            this.props
                .navigation
                .dispatch(NavigationActions.reset(
                    {
                        index: 0,
                        actions: [
                            NavigationActions.navigate({routeName: 'Main'})
                        ]
                    }));
        });
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
                data={listUsers}
                renderItem={this.renderUser}
            />
        );
    };

    render = () => {
        return this.renderList();
    }
}
