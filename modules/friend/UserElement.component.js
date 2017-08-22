import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 8,
        marginBottom: 0,
        alignSelf: 'stretch'
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8
    },
    avatar: {
        width: 30,
        height: 30,
        padding: 10,
        paddingLeft: 0,
        marginRight: 8,
        top: 5
    }
});

export default class UserElementComponent extends React.Component {

    render() {
        return (
            <TouchableHighlight onPress={() => this.userSelected(this.props.user)}
                                underlayColor={Colors.tintColor}
                                style={styles.container}>
                <View style={styles.wrapper}>
                    <ImageLoader borderRadius={15}
                                 style={styles.avatar}
                                 indicator={ProgressBar}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.user.avatar_url}}/>
                    <Text>{this.props.user.first_name} {this.props.user.last_name}</Text>
                </View>
            </TouchableHighlight>
        );
    }
}
