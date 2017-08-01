import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import ExternalSearchResultElement from './ExternalSearchResultElement.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'transparent'
    }
});

export default class ExternalSearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderRowView = (rowData) => {
        return <ExternalSearchResultElement result={rowData}/>;
    };

    render() {
        return (
            <View style={styles.container}>
                <ListView
                    data={this.props.results}
                    style={{listContent: {backgroundColor: 'transparent'}}}
                    renderRow={this.renderRowView}
                ></ListView>
            </View>
        );
    }
}
