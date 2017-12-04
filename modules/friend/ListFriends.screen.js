import React from 'react';
import {connect} from 'react-redux';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import QuickSearchComponent from '../gem/components/QuickSearch.component';
import {getAllFriends} from '../auth/users.service';
import UserElementComponent from './UserElement.component';
import * as types from '../../constants/ActionTypes';

export class AddFriendsScreen extends AbstractGemScreen {
    navigationOptions = {
        hasHistory: false,
        stateName: 'Friend',
        titleState: ' '
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            listFriends: []
        };
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: types.RESET_CATEGORY_FILTER
        });
        super.componentDidMount();
        getAllFriends(this.props.userStore).then((listFriends) => {
            this.listFriends = listFriends;
            this.setState({
                listFriends
            });
        });
    };

    onUserSelected = (user) => {
        this.props.navigation.navigate(
            'DetailFriend',
            {user}
        );
    };

    renderUser = (item) => {
        return <UserElementComponent user={item} onUserSelected={this.onUserSelected}/>;
    };

    onChange = (name) => {
        if (!name) {
            this.setState({
                listFriends: this.listFriends
            });
        } else {
            this.setState({
                listFriends: this.listFriends.filter((friend) => {
                    return (`${friend.first_name} ${friend.last_name}`).toLowerCase().indexOf(name.toLowerCase()) >= 0;
                })
            });
        }
    };

    renderHeader = () => {
        return <QuickSearchComponent label="Search Gem friends" onChange={this.onChange}/>;
    };

    renderList = () => {
        return (
            <ListView style={{list: {backgroundColor: 'white'}, listContent: {backgroundColor: 'transparent'}}}
                      data={this.state.listFriends}
                      renderHeader={this.renderHeader}
                      renderRow={this.renderUser}/>
        );
    };

    render = () => {
        return super.render(this.renderList());
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(AddFriendsScreen);
