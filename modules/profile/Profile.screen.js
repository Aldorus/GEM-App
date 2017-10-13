import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import HeaderProfile from '../../components/HeaderProfile';
import FeedElementComponent from '../gem/components/FeedElement.component';
import {onlyGemForThisCategory, onlyGemForThisUser, onlySaveForThisUser} from '../../utilities/extends/array.utils';

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
            tabSelected: 'gems'
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

    renderRowView = (rowData) => {
        return (<FeedElementComponent gemData={rowData}
                                      onClick={this.clickOnGem}
                                      userStore={this.props.userStore}
                                      displayAvatar={false}
                                      displayWithImage={false}/>);
    };

    renderListGems = () => {
        console.log('Render only the gem list');
        return (<ListView data={this.props.gemStore
                            .filter((gem) => onlyGemForThisUser(gem, this.props.userStore.id))
                            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter))}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>);
    };

    renderListSaved = () => {
        console.log('Render only the save list');
        return (<ListView data={this.props.savedStore
                            .filter((gem) => onlySaveForThisUser(gem, this.props.userStore.id))
                            .filter((gem) => onlyGemForThisCategory(gem, this.props.userStore.categoryFilter))}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>);
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
