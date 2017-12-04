import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import {connect} from 'react-redux';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';
import QuickSearchComponent from '../gem/components/QuickSearch.component';
import {copyArray} from '../../utilities/extends/object.utils';
import {getAllGems, getAllSaved} from '../gem/services/gem.service';
import * as types from '../../constants/ActionTypes';
import {onlyGemForThisCategory, onlyGemForThisGroup, sortGems} from '../../utilities/extends/array.utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export class HomeScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'Home',
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
        getAllGems().then((gems) => {
            this.props.dispatch({
                type: types.LOAD_GEM_SUCCESS,
                gems: sortGems(gems)
            });

            this.setState({
                loading: false
            });

            getAllSaved().then((saved) => {
                this.props.dispatch({
                    type: types.LOAD_SAVED_GEM_SUCCESS,
                    saved: sortGems(saved)
                });
            });
        });
    };

    componentWillMount = () => {
        this.props.dispatch({
            type: types.RESET_CATEGORY_FILTER
        });
        super.componentDidMount();
        this.callForLoadGem();
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

    renderRowView = (rowData) => {
        return (<FeedElementComponent
            gemData={rowData}
            displayAvatar={true}
            onClick={this.clickOnGem}
            userStore={this.props.userStore}
        />);
    };

    quickSearchChange = (value) => {
        if (!value) {
            this.setState({
                listGems: null
            });
        } else {
            this.setState({
                listGems: this.props.gemStore.filter((gem) => {
                    return gem.item.name.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                        gem.item.category.toLowerCase().indexOf(value.toLowerCase()) >= 0 ||
                        `${gem.user.first_name} ${gem.user.last_name}`.toLowerCase().indexOf(value.toLowerCase()) >= 0;
                })
            });
        }
    };

    renderHeader = () => {
        return <QuickSearchComponent onChange={this.quickSearchChange}/>;
    };

    render() {
        // TODO may cause some trouble for the performance
        const gemStoreCopy = copyArray(this.props.gemStore
            .filter((gem) => onlyGemForThisGroup(gem, this.props.userStore.group))
            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter)));
        return super.render(
            <View style={styles.container}>
                <ListView data={this.state.listGems || gemStoreCopy}
                          autoHideHeader={true}
                          loading={this.state.loading}
                          onRefresh={this.refreshList}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderHeader={this.renderHeader}
                          renderRow={this.renderRowView}/>
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        gemStore: store.gemReducer,
        savedStore: store.savedReducer,
        userStore: store.userReducer
    };
};

export default connect(mapStores)(HomeScreen);
