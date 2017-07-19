import React, {Component} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import cardStyle from '../../constants/Card.style';

const style = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
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
            <View style={[cardStyle.card, style.container]}>
                <Image
                    style={style.avatar}
                    source={{uri: 'https://fr.gravatar.com/userimage/30478323/d53afb6ef01b7644a50b9dad2c973405.jpg?size=200'}}/>
                <Text style={style.text}>Hello Guillaume! Share something awesome what happened to you!</Text>
            </View>
        );
    }
}
