import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import listGems from '../gem/gem.json';
import Colors from '../../constants/Colors';
import FeedElementComponent from '../gem/components/FeedElement.component';
import HeaderProfile from '../../components/HeaderProfile';

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
        stateName: 'addFriend',
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
                tabSelected: 'gems'
            };
            this.state.user.listGems = listGems;
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

    renderListGems = () => {
        return (<ListView data={this.state.user.listGems}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>);
    };

    renderListSaved = () => {
        return (<ListView data={this.state.user.listGems}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>);
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
        userStore: store.userReducer
    };
};

export default connect(mapStores)(DetailFriendScreen);
