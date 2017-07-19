import React from 'react';
import {StyleSheet, View} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../constants/Colors';

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingRight: 10,
        paddingLeft: 10,
    },
    icon: {
        paddingRight: 5,
        paddingLeft: 10,
    }
});

export class ExpoDrawerRightComponent extends React.Component {
    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    goToSearch = () => {
        // TODO open the search screen
        // this.props.navigation.navigate('Search');
    };

    goToNewGem = () => {
        this.props.navigation.navigate('AddGem');
    };

    render() {
        return (
            <View style={style.container}>
                <Icon
                    name="search"
                    color={Colors.tintColor}
                    size={25}
                    style={style.icon}
                    onPress={this.goToSearch}
                ></Icon>
                <Icon
                    name="plus"
                    color={Colors.tintColor}
                    size={25}
                    style={style.icon}
                    onPress={this.goToNewGem}
                ></Icon>
            </View>
        );
    }
}

export default ExpoDrawerRightComponent;
