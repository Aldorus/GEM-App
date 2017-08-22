import React from 'react';
import {connect} from 'react-redux';
import {Segment} from 'expo';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import QuickSearchComponent from '../gem/components/QuickSearch.component';
import {getAllFriends} from '../auth/users.service';
import UserElementComponent from './UserElement.component';

export class AddFriendsScreen extends AbstractGemScreen {
    navigationOptions = {
        hasHistory: false,
        stateName: 'addFriend',
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            listFriend: []
        };
    }

    componentDidMount = () => {
        super.componentDidMount();
        Segment.track('List Friend page');
        getAllFriends(this.props.userStore.group).then((listFriend) => {
            this.setState({
                listFriend
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

    renderHeader = () => {
        return <QuickSearchComponent label="Search Gem friends"/>;
    };

    renderList = () => {
        return (
            <ListView style={{list: {backgroundColor: 'white'}, listContent: {backgroundColor: 'transparent'}}}
                      data={this.state.listFriend}
                      renderHeader={this.renderHeader}
                      renderRow={this.renderUser}/>
        );
    };

    render = () => {
        console.log('User', this.props.userStore);
        return super.render(this.renderList());
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(AddFriendsScreen);
