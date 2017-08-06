import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import {connect} from 'react-redux';
import FeedElementComponent from './FeedElement.component';
import QuickAddGemComponent from './QuickSearch.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRowView = (rowData) => {
        return <FeedElementComponent gemData={rowData}/>;
    };

    renderHeader = () => {
        return <QuickAddGemComponent/>;
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView data={this.props.gemStore}
                          autoHideHeader={true}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderHeader={this.renderHeader}
                          renderRow={this.renderRowView}></ListView>
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        gemStore: store.gemReducer
    };
};

export default connect(mapStores)(FeedComponent);