import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import ExternalSearchResultElement from './ExternalSearchResultElement.component';
import NoResultElement from './NoResultElement.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch'
    }
});

export default class ExternalSearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        };
    }

    elementSelected = (rowData) => {
        this.setState({
            selected: rowData
        });
        if (this.props.onElementSelected) {
            this.props.onElementSelected(rowData);
        }
    };

    renderRowView = (rowData) => {
        return <ExternalSearchResultElement result={rowData} elementPressed={this.elementSelected}/>;
    };

    renderHeader = () => {
        return this.props.results.length ? <NoResultElement elementPressed={this.elementSelected}/> : <View/>;
    };

    render() {
        return (
            <View style={[styles.container, {
                flex: this.state.selected ? 0 : 1
            }]}>
                <ListView data={this.props.results}
                          style={{
                              listContent: {
                                  backgroundColor: 'transparent'
                              }
                          }}
                          renderHeader={this.renderHeader}
                          renderRow={this.renderRowView}/>
            </View>
        );
    }
}
