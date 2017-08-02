import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AppIntro from 'react-native-app-intro';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: undefined,
        height: undefined,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
    }
});

export default class IntroExampleScreen extends React.Component {
    static navigationOptions = {
        header: null // Hide the header
    };

    onSkipBtnHandle = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main'})
                    ]
                }));
    };

    doneBtnHandle = () => {
        this.props
            .navigation
            .dispatch(NavigationActions.reset(
                {
                    index: 0,
                    actions: [
                        NavigationActions.navigate({routeName: 'Main'})
                    ]
                }));
    };

    renderSlide = () => {

    };

    render() {
        return (
            <AppIntro onDoneBtnClick={this.doneBtnHandle}
                      onSkipBtnClick={this.onSkipBtnHandle}>
                <Image source={require('../../assets/images/tutoriel-1.png')}
                       style={styles.container}>
                    <Text>Welcome to GEM</Text>
                </Image>
                <Image source={require('../../assets/images/tutoriel-2.png')}
                       style={styles.container}>
                    <Text>Tutoriel Page 2</Text>
                </Image>
            </AppIntro>
        );
    }
};
