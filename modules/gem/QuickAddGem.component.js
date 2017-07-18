import React, {Component} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const style = StyleSheet.create({
    container: {
        height: 50,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        margin: 5,
        padding: 5,
        paddingRight: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 1,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    avatar: {
        width: 40,
        height: 40,
        marginRight: 15
    },
    text: {
        flex: 1
    }
});

export default class QuickAddGemComponent extends Component {
    render() {
        return (
            <View style={style.container}>
                <Image
                    style={style.avatar}
                    source={{uri: 'https://fr.gravatar.com/userimage/30478323/d53afb6ef01b7644a50b9dad2c973405.jpg?size=200'}}/>
                <Text style={style.text}>Share something awesome what happened to you !</Text>
            </View>
        );
    }
}
