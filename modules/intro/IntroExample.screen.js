import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import AppIntro from 'react-native-app-intro';
import {connect} from 'react-redux';
import GradientBackground from '../../components/GradientBackground';
import StyledText from '../../components/StyledText';
import BoldText from '../../components/BoldText';
import onBoard1 from '../../assets/icons/onboard-1@2x.png';
import onBoard2 from '../../assets/icons/onboard-2@2x.png';
import onBoard3 from '../../assets/icons/onboard-3@2x.png';
import onBoard4 from '../../assets/icons/onboard-4@2x.png';

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
            <View>
                <View style={{
                    alignItems: 'center',
                    marginBottom: 40
                }}>
                    <Image source={onBoard1}/>
                </View>
                <StyledText style={{
                    textAlign: 'center',
                    lineHeight: 25,
                    fontSize: 18
                }}>
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>Gem</BoldText>{'\n'}
                    The only app that{'\n'}
                    lets you discover, save and{'\n'}
                    and share memorable{'\n'}
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>five-star experiences.</BoldText>
                </StyledText>
            </View>
        </GradientBackground>);
    };

    renderSlide2 = () => {
        return (<GradientBackground style={styles.container}>
            <View>
                <View style={{
                    alignItems: 'center',
                    marginBottom: 40
                }}>
                    <Image source={onBoard2}/>
                </View>

                <StyledText style={{
                    textAlign: 'center',
                    lineHeight: 25,
                    fontFamily: 'celia-light',
                    fontSize: 18
                }}>
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>Discover</BoldText>{'\n'}
                    the must dos around you{'\n'}
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>from the people that matter.</BoldText>{'\n'}
                    Enjoy the finer things in life.
                </StyledText>
            </View>
        </GradientBackground>);
    };

    renderSlide3 = () => {
        return (<GradientBackground style={styles.container}>
            <View>
                <View style={{
                    alignItems: 'center',
                    marginBottom: 40
                }}>
                    <Image source={onBoard3}/>
                </View>

                <StyledText style={{
                    textAlign: 'center',
                    lineHeight: 25,
                    fontFamily: 'celia-light',
                    fontSize: 18
                }}>
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>Save</BoldText>{'\n'}
                    Fill your must-do list{'\n'}
                    with experiences to try:{'\n'}
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>restaurants, books, shows…</BoldText>{'\n'}
                    The world is your oyster.
                </StyledText>
            </View>
        </GradientBackground>);
    };

    renderSlide4 = () => {
        return (<GradientBackground style={styles.container}>
            <View>
                <View style={{
                    alignItems: 'center',
                    marginBottom: 40
                }}>
                    <Image source={onBoard4}/>
                </View>

                <StyledText style={{
                    textAlign: 'center',
                    lineHeight: 25,
                    fontFamily: 'celia-light',
                    fontSize: 18
                }}>
                    <BoldText style={{
                        lineHeight: 25,
                        fontSize: 18
                    }}>Share</BoldText>{'\n'}
                    the hidden gems that{'\n'}
                    you unveiled <BoldText style={{
                    lineHeight: 25,
                    fontSize: 18
                }}>with other users.</BoldText>{'\n'}
                    After all, happiness is real only{'\n'}
                    when shared with others.
                </StyledText>
            </View>
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
