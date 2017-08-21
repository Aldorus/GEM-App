import React from 'react';
import {connect} from 'react-redux';
import {Segment} from 'expo';
import {StyleSheet, View, Text} from 'react-native';
import AbstractGemScreen from '../../AbstractGem.screen';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: 'white'
    }
});

export class AddFriendsScreen extends AbstractGemScreen {
    navigationOptions = {
        hasHistory: false,
        stateName: 'addFriend'
    };
    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        super.componentDidMount();
        Segment.track('Add Friend page');
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <Text>Under construct</Text>
            </View>, true);
    }
}

const mapStores = (store) => {
    return {
    };
};

export default connect(mapStores)(AddFriendsScreen);
