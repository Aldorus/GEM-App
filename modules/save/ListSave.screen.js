import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';
import {onlySaveForThisGroup, sortGems} from '../../utilities/extends/array.utils';
import * as types from '../../constants/ActionTypes';
import {getAllSaved} from '../gem/services/gem.service';

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
            console.log(saved);
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
            displayAvatar={true}
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
        return super.render(
            <View style={styles.container}>
                <ListView
                    loading={this.state.loading}
                    onRefresh={this.refreshList}
                    data={this.props.savedStore.filter((gem) => onlySaveForThisGroup(gem, this.props.userStore.group))}
                    style={{listContent: {backgroundColor: 'transparent'}}}
                    renderRow={this.renderRowView}/>
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
