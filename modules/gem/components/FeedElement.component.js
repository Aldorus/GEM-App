import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';
import listWords from './listWords.json';
import BoldText from '../../../components/BoldText';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 8,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    swipeButton: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center'
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 15
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
        height: 200,
        marginTop: 8,
        paddingBottom: 8
    }
});

export default class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    goOnGem = () => {
        if (this.props.onClick) {
            this.props.onClick(this.props.gemData);
        }
    };

    userHasPreferenceDisplayWithImage = () => {
        return this.props.userStore && this.props.userStore.displayListWithImage;
    };

    componentNeedToBeDisplayWithImage = () => {
        return this.props.displayWithImage === true;
    };

    renderImageGem = () => {
        if (this.props.displayWithImage !== false && (this.userHasPreferenceDisplayWithImage() || this.componentNeedToBeDisplayWithImage()) && this.props.gemData.picture_url) {
            return (<ImageLoader indicator={ProgressBar}
                                 style={styles.image}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.gemData.picture_url}}/>);
        }
        return null;
    };

    renderLocation = () => {
        return this.props.gemData.location ? ` in ${this.props.gemData.location}` : '';
    };

    renderAvatar = () => {
        if (this.props.displayAvatar) {
            return (<ImageLoader borderRadius={15}
                                 style={styles.avatar}
                                 indicator={ProgressBar}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.props.gemData.user.avatar_url}}/>
            );
        }
        return null;
    };

    getReaction = (wordKey) => {
        if (wordKey) {
            return listWords.find((word) => {
                return word.key === wordKey;
            }).word;
        }
    };

    renderSentence = () => {
        if (!this.props.hideSentence) {
            return (<StyledText>
                <BoldText>{this.props.gemData.user.first_name}</BoldText> {this.getReaction(this.props.gemData.reaction)}
            </StyledText>);
        }
        return null;
    };

    renderContent = () => {
        return (<View style={[styles.container]}>
            {this.renderAvatar()}
            <View style={styles.textWrapper}>
                <StyledText>{this.props.gemData.item.category}{this.renderLocation()}</StyledText>
                <StyledTitle numberOfLines={1}>{this.props.gemData.item.name}</StyledTitle>
                {this.renderSentence()}
            </View>
        </View>);
    };

    render() {
        return (
            <View style={{alignSelf: 'stretch'}}>
                <View style={{
                    flexDirection: 'column',
                    alignSelf: 'stretch'
                }}>
                    <TouchableHighlight underlayColor={this.props.underlayColor || Colors.tintColor}
                                        onPress={this.goOnGem}>
                        {this.renderContent()}
                    </TouchableHighlight>
                </View>
                {this.renderImageGem()}
                <StyledText>{this.props.gemData.comment}</StyledText>
            </View>
        );
    }
}
