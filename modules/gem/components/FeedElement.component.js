import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {LinearGradient} from 'expo';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';
import listGemImage from '../../../assets/icons/list-gem-off@2x.png';
import loveImage from '../../../assets/icons/love@2x.png';
import shareImageIOS from '../../../assets/icons/share-ios@2x.png';
import GradientBackground from '../../../components/GradientBackground';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 8,
        marginBottom: 0,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 15,
        paddingBottom: 10
    },
    avatar: {
        width: 30,
        height: 30,
        padding: 10,
        marginRight: 8,
        top: 5
    },
    image: {
        alignSelf: 'stretch',
        height: 200
    },
    swipeButton: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

const swipeoutBtns = [
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={listGemImage}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    },
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={loveImage}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    },
    {
        component: <GradientBackground style={styles.swipeButton} alternative>
            <TouchableHighlight style={styles.swipeButton}>
                <Image source={shareImageIOS}/>
            </TouchableHighlight>
        </GradientBackground>,
        backgroundColor: Colors.tintColor
    }
];


export class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    renderImageGem = () => {
        if (this.props.userStore && this.props.userStore.displayListWithImage && this.props.gemData.picture) {
            return <ImageLoader indicator={ProgressBar}
                                style={styles.image}
                                indicatorProps={{
                                    color: Colors.colorText
                                }} source={{uri: this.props.gemData.picture}}/>;
        }
    };

    renderLocation = () => {
        return this.props.gemData.location ? ` in ${this.props.gemData.location}` : '';
    };

    render() {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={{
                                flexDirection: 'column',
                                alignSelf: 'stretch'
                            }}>
                <Swipeout right={swipeoutBtns}
                          backgroundColor="white">
                    <View style={{
                        flexDirection: 'column',
                        alignSelf: 'stretch',
                        marginBottom: 8
                    }}>
                        <View style={[styles.container]}>
                            <ImageLoader
                                borderRadius={15}
                                style={styles.avatar}
                                indicator={ProgressBar}
                                indicatorProps={{
                                    color: Colors.colorText
                                }}
                                source={{uri: this.props.gemData.user.avatar_thumbnail_url}}
                            />
                            <View style={styles.textWrapper}>
                                <StyledText>{this.props.gemData.category}{this.renderLocation()}</StyledText>
                                <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                                <StyledText>
                                    {this.props.gemData.user.first_name} says {this.props.gemData.word}
                                </StyledText>
                            </View>
                        </View>
                        {this.renderImageGem()}
                    </View>
                </Swipeout>
            </LinearGradient>
        );
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(FeedElementComponent);
