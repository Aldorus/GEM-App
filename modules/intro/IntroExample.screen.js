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
                GEM{'\n\n'}
                The only app that{'\n'}
                lets you discover, save{'\n'}
                and share the{'\n'}
                memorable five-star experiences{'\n'}
                you fill your life with.
            </StyledText>
        </GradientBackground>);
    };

    renderSlide2 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                DISCOVER{'\n\n'}
                Find out about{'\n'}
                the must dos around you{'\n'}
                from the people that matter.{'\n\n'}
                Discover the finer things in life.{'\n'}
                Enjoy yourself.
            </StyledText>
        </GradientBackground>);
    };

    renderSlide3 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                SAVE{'\n\n'}
                Fill your must-do list{'\n'}
                with experiences to try:{'\n'}
                restaurants, books, shows…{'\n\n'}
                The world is your oyster.
            </StyledText>
        </GradientBackground>);
    };

    renderSlide4 = () => {
        return (<GradientBackground style={styles.container}>
            <StyledText style={{
                textAlign: 'center'
            }}>
                SHARE{'\n\n'}
                Share the hidden gems{'\n'}
                that you unveiled with other users.{'\n\n'}
                After all, happiness is real only{'\n'}
                when shared with others.
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
                {this.renderSlide4()}
            </AppIntro>
        );
    }
}

export default connect()(IntroExampleScreen);
