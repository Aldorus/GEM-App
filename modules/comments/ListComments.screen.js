import React from 'react';
import {connect} from 'react-redux';
import {StyleSheet, View} from 'react-native';
import AbstractGemScreen from '../../AbstractGem.screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    }
});


// TODO
export class ListCommentsScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'List Comments',
        hasHistory: true,
        titleState: ' '
    };

    static navigationOptions = {
        header: null
    };

    render() {
        return super.render(
            <View style={styles.container}>

            </View>, true);
    }
}

const mapStores = () => {
    return {};
};

export default connect(mapStores)(ListCommentsScreen);
