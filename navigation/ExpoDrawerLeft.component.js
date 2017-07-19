import React from 'react';
import {View, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

const style = StyleSheet.create({
    container: {
        paddingRight: 10
    }
});

export default class ExpoDrawerLeftComponent extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    openDrawer = () => {
        this.props.navigation.navigate('DrawerOpen');
    };

    render() {
        return (
            <View style={style.container}>
                <Icon
                    name="bars"
                    color={Colors.tintColor}
                    size={25}
                    onPress={this.openDrawer}
                ></Icon>
            </View>
        );
    }
}
