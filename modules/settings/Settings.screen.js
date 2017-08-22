import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Segment} from 'expo';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {AsyncStorage, ScrollView, StyleSheet, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import GradientBackground from '../../components/GradientBackground';
import ListItemStyle from '../../constants/ListItemStyle';
import AbstractGemScreen from '../../AbstractGem.screen';
import StyledText from '../../components/StyledText';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gradient: {
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20
    },
    avatar: {
        width: 80,
        height: 80,
        paddingTop: 50,
        marginBottom: 10
    }
});

export class SettingsScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'params',
        hasHistory: false,
        titleState: ' '
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
    };

    componentDidMount = () => {
        super.componentDidMount();
        Segment.track('Settings page');
    };

    goToDisconnect = () => {
        AsyncStorage.removeItem('current_user');
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Login'})
                    ]
                }));
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <GradientBackground style={styles.gradient}>
                    <ImageLoader borderRadius={40}
                                 style={styles.avatar}
                                 indicator={ProgressBar}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.userStore.avatar_url}}/>
                    <StyledText>
                        {this.props.userStore.first_name} {this.props.userStore.last_name}
                    </StyledText>
                </GradientBackground>
                <ScrollView style={styles.container}>
                    <Text
                        style={ListItemStyle.item}
                        onPress={this.goToDisconnect}
                    >
                        Disconnect
                    </Text>
                </ScrollView>
            </View>, true);
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(SettingsScreen);
