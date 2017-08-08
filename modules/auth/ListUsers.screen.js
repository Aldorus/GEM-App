import React from 'react';
import {AsyncStorage, FlatList, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import listItemStyle from '../../constants/ListItemStyle';
import * as types from '../../constants/ActionTypes';
import {getAllUsers} from './users.service';

export class ListUsersScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        title: 'Connect',
    };

    state = {
        asyncStorageChecked: false
    };

    componentWillMount = () => {
        getAllUsers().then((listUsers) => {
            this.setState({
                listUsers
            });
        });
    };

    goToMainScreen = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Intro'})
                    ]
                }));
    };

    userSelected = (user) => {
        AsyncStorage.setItem('current_user', JSON.stringify(user)).then(() => {
            this.props.dispatch({
                type: types.LOAD_USER,
                user
            });
            this.goToMainScreen();
        });
    };

    keyExtractor = (item) => {
        return item.id;
    };

    renderUser = ({item}) => {
        return (
            <TouchableHighlight onPress={() => this.userSelected(item)}
                                underlayColor={Colors.tintColor}
                                style={listItemStyle.item}>
                <Text>{item.email}</Text>
            </TouchableHighlight>
        );
    };

    renderList = () => {
        return (
            <FlatList style={{flex: 1}}
                      data={this.state.listUsers}
                      keyExtractor={this.keyExtractor}
                      renderItem={this.renderUser}/>
        );
    };

    render = () => {
        return this.renderList();
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(ListUsersScreen);
