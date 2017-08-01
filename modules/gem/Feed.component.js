import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import FeedElementComponent from './FeedElement.component';
import QuickAddGemComponent from './QuickSearch.component';
import listGems from './gem.json';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export default class FeedComponent extends React.Component {
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
                <ListView
                    data={listGems}
                    autoHideHeader={true}
                    style={{listContent:{backgroundColor:'transparent'}}}
                    renderHeader={this.renderHeader}
                    renderRow={this.renderRowView}
                ></ListView>
            </View>
        );
    }
}
