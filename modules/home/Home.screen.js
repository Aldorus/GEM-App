import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import {connect} from 'react-redux';
import {Segment} from 'expo';
import AbstractGemScreen from '../../AbstractGem.screen';
import {FeedElementComponent} from '../gem/components/FeedElement.component';
import QuickSearchComponent from '../gem/components/QuickSearch.component';
import {copyObject} from '../../utilities/extends/object.utils';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export class HomeScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'home',
        hasHistory: false
    };

    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        super.componentDidMount();
        Segment.track('Home page');
    };

    renderRowView = (rowData) => {
        return <FeedElementComponent gemData={rowData} userStore={this.props.userStore}/>;
    };

    renderHeader = () => {
        return <QuickSearchComponent/>;
    };

    render() {
        // TODO may cause some trouble for the performance
        const gemStoreCopy = copyObject(this.props.gemStore);
        return super.render(
            <View style={styles.container}>
                <ListView data={gemStoreCopy}
                          autoHideHeader={true}
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
