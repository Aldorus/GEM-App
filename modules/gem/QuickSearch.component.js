import React from 'react';
import {Image, StyleSheet, TextInput} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
        marginTop: 20,
        marginLeft: 15,
        marginRight: 15,
        borderRadius: 20
    },
    input: {
        borderRadius: 20,
        padding: 10,
        paddingLeft: 50,
        height: 40,
        alignSelf: 'stretch',
        fontFamily: 'celia'
    },
    icon: {
        position:'absolute',
        top: 8,
        left: 12,
        alignSelf: 'flex-start'
    }
});

export default class QuickSearchComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (value) => {
        console.log('update value', value);
        this.setState({value});
    };

    render() {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={styles.container}>
                <TextInput placeholder="Search the Gembox"
                           style={styles.input}
                           placeholderTextColor="black"
                           underlineColorAndroid="transparent"
                           onChangeText={this.onChange}/>
                <Image source={require('../../assets/icons/search.png')}
                       style={styles.icon}/>
            </LinearGradient>
        );
    }
}
