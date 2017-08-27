import React from 'react';
import {connect} from 'react-redux';
import {Segment} from 'expo';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from '../gem/components/FeedElement.component';

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
        return <FeedElementComponent gemData={rowData}/>;
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <ListView data={this.props.saveStore}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        saveStore: store.saveReducer
    };
};

export default connect(mapStores)(ListSaveScreen);
