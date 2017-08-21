import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {LinearGradient} from 'expo';
import Swipeout from 'react-native-swipeout';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';
import {feedElementSwipeButton} from './feedElementSwipeButton';

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
    }
});

export class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    goOnGem = () => {
        console.log('Go On Gem');

    };

    renderImageGem = () => {
        console.log('user store', this.props.userStore)
        if (this.props.userStore && this.props.userStore.displayListWithImage && this.props.gemData.picture) {
            return (<ImageLoader indicator={ProgressBar}
                                 style={styles.image}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.gemData.picture}}/>);
        }
        return null;
    };

    renderLocation = () => {
        return this.props.gemData.location ? ` in ${this.props.gemData.location}` : '';
    };

    renderContent = () => {
        return (<View style={[styles.container]}>
            <ImageLoader borderRadius={15}
                         style={styles.avatar}
                         indicator={ProgressBar}
                         indicatorProps={{
                             color: Colors.colorText
                         }}
                         source={{uri: this.props.gemData.user.avatar_thumbnail_url}}/>
            <View style={styles.textWrapper}>
                <StyledText>{this.props.gemData.category}{this.renderLocation()}</StyledText>
                <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                <StyledText>
                    {this.props.gemData.user.first_name} says {this.props.gemData.word}
                </StyledText>
            </View>
        </View>);
    };

    render() {
        console.log('New render');
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            end={[1, 0]}
                            style={{
                                flexDirection: 'column',
                                alignSelf: 'stretch'
                            }}>
                <Swipeout right={feedElementSwipeButton}
                          backgroundColor="white">
                    <View style={{
                        flexDirection: 'column',
                        alignSelf: 'stretch',
                        marginBottom: 8
                    }}>
                        <TouchableHighlight underlayColor={Colors.tintColor} onPress={this.goOnGem}>
                            {this.renderContent()}
                        </TouchableHighlight>
                        {this.renderImageGem()}
                    </View>
                </Swipeout>
            </LinearGradient>
        );
    }
}

const mapStores = (store) => {
    return {};
};

export default connect(mapStores)(FeedElementComponent);
