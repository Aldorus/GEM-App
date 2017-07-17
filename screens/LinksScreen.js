import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';

export default class LinksScreen extends React.Component {
    static navigationOptions = {
        title: 'Links',
        drawerLabel: 'Links'
    };

    render() {
        return (
            <ScrollView>
                <View><Text>Hello</Text></View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
});
