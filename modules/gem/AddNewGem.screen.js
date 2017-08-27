import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AbstractGemScreen from '../../AbstractGem.screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export default class AddNewGemScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'addNewGem',
        hasHistory: true,
        titleState: ' '
    };

    static navigationOptions = {
        header: null
    };

    render = () => {
        return super.render(<View style={styles.container}>
            <Text>Under construct</Text>
        </View>);
    };
}
