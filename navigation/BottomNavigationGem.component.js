import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        height: 40,
        alignSelf: 'stretch',
        flexDirection: 'row'
    },
    icon: {
        alignSelf: 'stretch',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallIcon: {},
    bigIcon: {
        bottom: 20
    }
});

export default class BottomNavigationGem extends React.Component {
    static propTypes = {};

    render() {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                end={[1, 0]}
                style={styles.container}
            >
                <View style={[styles.icon, styles.smallIcon]}><Image
                    source={require('../assets/icons/gem.png')}/></View>
                <View style={[styles.icon, styles.smallIcon]}><Image
                    source={require('../assets/icons/add-friend.png')}/></View>
                <View style={[styles.icon, styles.bigIcon]}><Image
                    source={require('../assets/icons/add-gem.png')}/></View>
                <View style={[styles.icon, styles.smallIcon]}><Image
                    source={require('../assets/icons/params.png')}/></View>
                <View style={[styles.icon, styles.smallIcon]}><Image
                    source={require('../assets/icons/love.png')}/></View>
            </LinearGradient>
        );
    }
}
