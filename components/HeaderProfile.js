import React from 'react';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import GradientBackground from '../components/GradientBackground';
import listGemOffImage from '../assets/icons/list-gem-off@2x.png';
import loveImage from '../assets/icons/love-off@2x.png';
import StyledText from '../components/StyledText';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
    },
    gradient: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 15
    },
    avatar: {
        width: 80,
        height: 80,
        marginRight: 20,
        marginBottom: 20,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        justifyContent: 'center',
        borderWidth: 1,
        borderBottomWidth: 0,
        borderColor: Colors.white,
        padding: 8
    }
});

export default class HeaderProfile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tabSelected: 'gems'
        };
    }

    clickOnDisplayGems = () => {
        if (this.state.tabSelected === 'saved') {
            this.setState({
                tabSelected: 'gems'
            });
        }

        if (this.props.tabDisplayChanged) {
            this.props.tabDisplayChanged('gems');
        }
    };

    clickOnDisplaySaved = () => {
        if (this.state.tabSelected === 'gems') {
            this.setState({
                tabSelected: 'saved'
            });
        }

        if (this.props.tabDisplayChanged) {
            this.props.tabDisplayChanged('saved');
        }
    };

    selected = (state) => {
        return this.state.tabSelected === state ? {
            backgroundColor: '#fff'
        } : {};
    };

    render = () => {
        return (<View style={styles.container}>
            <GradientBackground style={styles.gradient}>
                <ImageLoader borderRadius={40}
                             style={styles.avatar}
                             indicator={ProgressBar}
                             indicatorProps={{
                                 color: Colors.colorText
                             }}
                             source={{uri: this.props.user.avatar_url}}/>
                <StyledText style={{fontSize: 18, marginTop: 10}}>
                    {this.props.user.first_name} {this.props.user.last_name}
                </StyledText>
            </GradientBackground>
            <GradientBackground style={styles.gradient}>
                <TouchableHighlight
                    style={[styles.button, {marginRight: 5}, this.selected('gems')]}
                    underlayColor={Colors.secondaryTintColor}
                    onPress={this.clickOnDisplayGems}>
                    <View>
                        <Image source={listGemOffImage}/>
                    </View>
                </TouchableHighlight>
                <TouchableHighlight
                    underlayColor={Colors.secondaryTintColor}
                    style={[styles.button, {marginLeft: 10}, this.selected('saved')]}
                    onPress={this.clickOnDisplaySaved}>
                    <View>
                        <Image source={loveImage}/>
                    </View>
                </TouchableHighlight>
            </GradientBackground>
        </View>);
    };
}
