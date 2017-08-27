import React from 'react';
import {StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';
import {feedElementSwipeButton} from './feedElementSwipeButton';
import {feedElementSwipeButtonUser} from './feedElementSwipeButtonUser';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 0,
        marginBottom: 0,
        paddingTop: 8,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 15,
        paddingBottom: 8
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
        return this.props.displayWithImage;
    };

    renderImageGem = () => {
        if ((this.userHasPreferenceDisplayWithImage() || this.componentNeedToBeDisplayWithImage()) && this.props.gemData.picture) {
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

    renderContent = () => {
        return (<View style={[styles.container]}>
            {this.renderAvatar()}
            <View style={styles.textWrapper}>
                <StyledText>{this.props.gemData.category}{this.renderLocation()}</StyledText>
                <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                <StyledText>
                    {this.props.gemData.user.first_name} {this.props.gemData.word}
                </StyledText>
            </View>
        </View>);
    };

    render() {
        console.log(this.props.userStore.id, this.props.gemData.user.id);
        return (
            <View style={{alignSelf: 'stretch'}}>
                <Swipeout
                    right={this.props.userStore.id !== this.props.gemData.user.id ? feedElementSwipeButton : feedElementSwipeButtonUser}
                    backgroundColor="white">
                    <View style={{
                        flexDirection: 'column',
                        alignSelf: 'stretch'
                    }}>
                        <TouchableHighlight underlayColor={Colors.tintColor} onPress={this.goOnGem}>
                            {this.renderContent()}
                        </TouchableHighlight>
                    </View>
                </Swipeout>
                {this.renderImageGem()}
                <StyledText>{this.props.gemData.comment}</StyledText>
            </View>
        );
    }
}
