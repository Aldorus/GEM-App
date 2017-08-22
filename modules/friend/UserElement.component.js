import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';
import BoldText from '../../components/BoldText';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 10,
        paddingTop: 10
    },
    avatar: {
        width: 30,
        height: 30,
        padding: 10,
        paddingLeft: 0,
        marginRight: 10,
    },
    name: {
        fontSize: 18
    }
});

export default class UserElementComponent extends React.Component {

    userSelected = (user) => {
        if (this.props.onUserSelected) {
            this.props.onUserSelected(user);
        }
    };

    render() {
        return (
            <TouchableHighlight onPress={() => this.userSelected(this.props.user)}
                                underlayColor={Colors.tintColor}
                                style={[styles.container, this.props.style]}>
                <View style={styles.wrapper}>
                    <ImageLoader borderRadius={15}
                                 style={styles.avatar}
                                 indicator={ProgressBar}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.user.avatar_url}}/>
                    <BoldText style={styles.name}>{this.props.user.first_name} {this.props.user.last_name}</BoldText>
                </View>
            </TouchableHighlight>
        );
    }
}
