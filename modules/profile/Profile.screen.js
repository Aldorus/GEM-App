import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import * as types from '../../constants/ActionTypes';
import AbstractGemScreen from '../../AbstractGem.screen';
import HeaderProfile from '../../components/HeaderProfile';

import FeedElementComponent from '../gem/components/FeedElement.component';
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
        hasHistory: false,
        logout: true
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 'gems',
            loading: false
        };
    }

    tabDisplayChanged = (tab) => {
        this.setState({
            tabSelected: tab
        });
    };

    clickOnGem = (gem) => {
        this.props.navigation.navigate(
            'DetailGem',
            {gem}
        );
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

    renderRowView = (rowData) => {
        return (<FeedElementComponent gemData={rowData}
                                      onClick={this.clickOnGem}
                                      userStore={this.props.userStore}
                                      displayAvatar={false}/>);
    };

    renderListGems = () => {
        const listGems = this.props.gemStore
            .filter((gem) => onlyGemForThisUser(gem, this.props.userStore.id))
            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter));

        return listGems.length ? <ListView data={listGems}
                                           style={{listContent: {backgroundColor: 'transparent'}}}
                                           loading={this.state.loading}
                                           onRefresh={this.refreshList}
                                           renderRow={this.renderRowView}/> :
            <EmptyMessage message="Your Gems will appear here! Give it a try with this big button"/>;
    };

    renderListSaved = () => {
        const listSaved = this.props.savedStore
            .filter((gem) => onlySaveForThisUser(gem, this.props.userStore.id))
            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter));

        return listSaved.length ? <ListView data={listSaved}
                                            style={{listContent: {backgroundColor: 'transparent'}}}
                                            loading={this.state.loading}
                                            onRefresh={this.refreshList}
                                            renderRow={this.renderRowView}/> :
            <EmptyMessage message="Your must-do will appear here! Give it a try with this big button"/>;
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <HeaderProfile user={this.props.userStore} tabDisplayChanged={this.tabDisplayChanged}/>
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

export default connect(mapStores)(ProfileScreen);
