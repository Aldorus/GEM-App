import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';
import {onlySaved} from '../../utilities/extends/array.utils';

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

    renderRowView = (rowData) => {
        return <FeedElementComponent
            onClick={this.clickOnGem}
            gemData={rowData}
            userStore={this.props.userStore}
        />;
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
                <ListView data={this.props.gemStore.filter(onlySaved)}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer,
        gemStore: store.gemReducer
    };
};

export default connect(mapStores)(ListSaveScreen);
