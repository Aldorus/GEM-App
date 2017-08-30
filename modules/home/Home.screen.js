import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import {connect} from 'react-redux';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';
import QuickSearchComponent from '../gem/components/QuickSearch.component';
import {copyArray} from '../../utilities/extends/object.utils';
import {getAllGems} from '../gem/services/gem.service';
import * as types from '../../constants/ActionTypes';
import listGems from '../gem/gem.json';
import {onlyGemForThisGroup} from '../../utilities/extends/array.utils';

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

    sortGems = (gems) => {
        if (gems) {
            return gems.sort((a, b) => {
                return new Date(b.experienced_at) - new Date(a.experienced_at);
            });
        }
        return [];
    };

    callForLoadGem = (filter) => {
        getAllGems(filter).then((gems) => {
            this.props.dispatch({
                type: types.LOAD_GEM_SUCCESS,
                gems: this.sortGems(gems)
            });
        });
    };

    componentWillMount = () => {
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
        return getAllGems().then((gems) => {
            this.setState({
                loading: false
            });
            this.props.dispatch({
                type: types.LOAD_GEM_SUCCESS,
                gems: listGems
            });
        });
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
        console.log('value', value);
        if (!value) {
            this.setState({
                listGems: null
            });
        } else {
            this.setState({
                listGems: this.props.gemStore.filter((gem) => {
                    return gem.item.name.indexOf(value) >= 0 || `${gem.user.first_name} ${gem.user.last_name}`.indexOf(value) >= 0;
                })
            });
        }
    };

    renderHeader = () => {
        return <QuickSearchComponent onChange={this.quickSearchChange}/>;
    };

    render() {
        console.log('Rebuild');
        // TODO may cause some trouble for the performance
        const gemStoreCopy = copyArray(this.props.gemStore.filter((gem) => onlyGemForThisGroup(gem, this.props.userStore.group)));
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
        userStore: store.userReducer
    };
};

export default connect(mapStores)(HomeScreen);
