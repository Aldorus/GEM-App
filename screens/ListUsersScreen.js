import React from 'react';
import {FlatList, StyleSheet, Text, TouchableHighlight} from 'react-native';
import Colors from '../constants/Colors';

const listUsers = [
    {
        key: 'a',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    },
    {
        key: 'b',
        email: 'guillaume.roussel@gem.com',
        label: 'Guillaume Roussel',
        group: 'A'
    }
];



const styles = StyleSheet.create({
    item: {
        borderBottomWidth: 1,
        borderStyle: 'solid',
        borderBottomColor: 'black',
        paddingLeft: 18,
        paddingRight: 10,
        paddingTop: 15,
        paddingBottom: 15
    }
});

export default class ListUsersScreen extends React.Component {
    static navigationOptions = {
        title: 'Login'
    };

    userSelected = () => {
        console.log('user selected');
        this.props.navigation.navigate('Home');
    };

    renderUser = ({item}) => {
        return (
            <TouchableHighlight
                onPress={this.userSelected}
                underlayColor={Colors.tintColor}
                style={styles.item}>
                <Text>{item.email}</Text>
            </TouchableHighlight>
        );
    };

    render = () => {
        return (
            <FlatList
                data={listUsers}
                renderItem={this.renderUser}
            />
        );
    }
};

