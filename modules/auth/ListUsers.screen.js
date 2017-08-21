import React from 'react';
import {AsyncStorage, FlatList, Text, TouchableHighlight} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import listItemStyle from '../../constants/ListItemStyle';
import {getAllUsers} from './users.service';
import * as types from '../../constants/ActionTypes';
import AbstractGemScreen from '../../AbstractGem.screen';

export class ListUsersScreen extends AbstractGemScreen {
    navigationOptions = {
        titleState: 'Connexion',
        bottom: false,
        hasHistory: false,
        stateName: 'connexion'
    };

    static navigationOptions = {
        header: null
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
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
        // this.setState({
        //     listUsers: users
        // });
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
            console.log('Current user saved');
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
        return super.render(this.renderList());
    }
}

export default connect()(ListUsersScreen);
