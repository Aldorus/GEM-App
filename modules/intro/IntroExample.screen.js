import React from 'react';
import {Image, StyleSheet, Text} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AppIntro from 'react-native-app-intro';
import {connect} from 'react-redux';
import GradientBackground from '../../components/GradientBackground';
import StyledText from '../../components/StyledText';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export class IntroExampleScreen extends React.Component {
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

    renderSlide1 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                Gem{'\n'}
                is a new way{'\n'}
                to share and save{'\n'}
                5 stars experiences{'\n\n'}
                (Because life's too short{'\n'}
                to bother with less)
            </StyledText>
        </GradientBackground>);
    };

    renderSlide2 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                Discover{'\n'}
                5 stars your friends{'\n'}
                wish you would{'\n'}
                experiment{'\n\n'}
                (You know, to have exciting{'\n'}
                to talk about, next time{'\n'}
                you meet)
            </StyledText>
        </GradientBackground>);
    };

    renderSlide3 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                Save{'\n'}
                future Gems{'\n'}
                to keep track of all{'\n'}
                the amazing things{'\n'}
                your life awaits.{'\n\n'}
                (Then Gem it!)
            </StyledText>
        </GradientBackground>);
    };

    render() {
        return (
            <AppIntro onDoneBtnClick={this.doneBtnHandle}
                      onSkipBtnClick={this.onSkipBtnHandle}>
                {this.renderSlide1()}
                {this.renderSlide2()}
                {this.renderSlide3()}
            </AppIntro>
        );
    }
}

export default connect()(IntroExampleScreen);
