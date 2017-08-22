import React from 'react';
import {StyleSheet, View} from 'react-native';
import AbstractGemScreen from '../../AbstractGem.screen';
import FeedElementComponent from './components/FeedElement.component';

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

export default class DetailGemScreen extends AbstractGemScreen {
    static navigationOptions = {
        header: null
    };

    navigationOptions = {
        hasHistory: true,
        stateName: 'detailGem',
        titleState: ' '
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <FeedElementComponent
                    displayWithImage={true}
                    gemData={this.props.navigation.state.params.gem}
                />
            </View>
        );
    }
}
