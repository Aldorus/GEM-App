import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';
import {onlyGemForThisCategory, onlySaveForThisUser, sortGems} from '../../utilities/extends/array.utils';
import * as types from '../../constants/ActionTypes';
import {getAllSaved} from '../gem/services/gem.service';
import EmptyMessage from '../../components/EmptyMessage';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export class ListSaveScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'Saved',
        hasHistory: false
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    callForLoadGem = () => {
        getAllSaved().then((saved) => {
            this.props.dispatch({
                type: types.LOAD_SAVED_GEM_SUCCESS,
                saved: sortGems(saved)
            });
            this.setState({
                loading: false
            });
        });
    };

    renderRowView = (rowData) => {
        return <FeedElementComponent
            onClick={this.clickOnGem}
            gemData={rowData}
            displayReferer={true}
            hideSentence={false}
            userStore={this.props.userStore}
        />;
    };

    refreshList = () => {
        this.setState({
            loading: true
        });
        this.callForLoadGem();
    };

    clickOnGem = (gem) => {
        this.props.navigation.navigate(
            'DetailGem',
            {gem}
        );
    };

    render() {
        const listGem = this.props.savedStore
            .filter(gem => onlySaveForThisUser(gem, this.props.userStore.id))
            .filter(gem => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter));

        return super.render(
            <View style={styles.container}>
                {listGem.length ?
                    <ListView
                        loading={this.state.loading}
                        onRefresh={this.refreshList}
                        data={listGem}
                        style={{listContent: {backgroundColor: 'transparent'}}}
                        renderRow={this.renderRowView}/> :
                    <EmptyMessage
                        message="Your must-do will appear here! Give it a try with this big button"/>}
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer,
        savedStore: store.savedReducer
    };
};

export default connect(mapStores)(ListSaveScreen);
