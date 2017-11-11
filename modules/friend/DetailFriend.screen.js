import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import Colors from '../../constants/Colors';
import * as types from '../../constants/ActionTypes';
import FeedElementComponent from '../gem/components/FeedElement.component';
import HeaderProfile from '../../components/HeaderProfile';
import {
    onlyGemForThisCategory,
    onlyGemForThisUser,
    onlySaveForThisUser,
    sortGems
} from '../../utilities/extends/array.utils';
import {getAllGems, getAllSaved} from '../gem/services/gem.service';
import EmptyMessage from '../../components/EmptyMessage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gradient: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 20,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Colors.white,
        padding: 8
    }
});

export class DetailFriendScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'Detail Friend',
        hasHistory: true
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        if (props.navigation.state && props.navigation.state.params && props.navigation.state.params.user) {
            this.state = {
                user: props.navigation.state.params.user,
                tabSelected: 'gems',
                loading: false
            };
        }
    }

    clickOnGem = (gem) => {
        this.props.navigation.navigate(
            'DetailGem',
            {gem}
        );
    };

    tabDisplayChanged = (tab) => {
        this.setState({
            tabSelected: tab
        });
    };

    renderRowView = (rowData) => {
        return (<FeedElementComponent gemData={rowData}
                                      onClick={this.clickOnGem}
                                      userStore={this.props.userStore}
                                      displayAvatar={true}
                                      displayWithImage={false}/>);
    };

    refreshList = () => {
        this.setState({
            loading: true
        });
        this.callForLoadGem();
    };

    callForLoadGem = () => {
        getAllSaved().then((saved) => {
            this.props.dispatch({
                type: types.LOAD_SAVED_GEM_SUCCESS,
                saved: sortGems(saved)
            });
        });

        getAllGems().then((gems) => {
            this.props.dispatch({
                type: types.LOAD_GEM_SUCCESS,
                gems: sortGems(gems)
            });

            // TODO bad place
            this.setState({
                loading: false
            });
        });
    };

    renderListGems = () => {
        const listGem = this.props.gemStore
            .filter((gem) => onlyGemForThisUser(gem, this.state.user.id))
            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter));
        return listGem.length ?
            <ListView data={listGem}
                      style={{listContent: {backgroundColor: 'transparent'}}}
                      loading={this.state.loading}
                      onRefresh={this.refreshList}
                      renderRow={this.renderRowView}/> :
            <EmptyMessage
                message="Your friend Gems list will appear here! Go find what your friend want to share with you."/>;
    };

    renderListSaved = () => {
        const listSaved = this.props.savedStore
            .filter((gem) => onlySaveForThisUser(gem, this.state.user.id))
            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter));

        return listSaved.length ?
            <ListView data={listSaved}
                      style={{listContent: {backgroundColor: 'transparent'}}}
                      loading={this.state.loading}
                      onRefresh={this.refreshList}
                      renderRow={this.renderRowView}/> :
            <EmptyMessage
                message="Your friend must-do will appear here! Go find what your friend want to try."/>;
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <HeaderProfile user={this.state.user} tabDisplayChanged={this.tabDisplayChanged}/>
                {this.state.tabSelected === 'gems' ? this.renderListGems() : this.renderListSaved()}
            </View>, true);
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer,
        gemStore: store.gemReducer,
        savedStore: store.savedReducer
    };
};

export default connect(mapStores)(DetailFriendScreen);
