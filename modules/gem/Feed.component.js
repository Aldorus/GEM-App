import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import FeedElementComponent from './FeedElement.component';
import QuickAddGemComponent from './QuickSearch.component';
import listGems from './gem.json';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    }
});
const listToDisplay = listGems.slice(0);
listToDisplay.unshift({
    type: 'QuickSearchComponent'
});

export default class FeedComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    onFetch = (page = 1, callback) => {
        setTimeout(() => {
            if (page === 1) {
                return callback(listToDisplay);
            }
            return callback(listGems);
        });
    };

    renderRowView = (rowData) => {
        console.log(rowData);
        return rowData.type === 'QuickSearchComponent' ?
            <QuickAddGemComponent/> :
            <FeedElementComponent gemData={rowData}/>;
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    data={listGems}
                    renderRow={this.renderRowView}
                ></ListView>

                {/*<GiftedListView*/}
                {/*onFetch={this.onFetch}*/}
                {/*contentOffset={{x:0, y:50}}*/}
                {/*rowView={this.renderRowView}*/}
                {/*/>*/}
            </View>
        );
    }
}
