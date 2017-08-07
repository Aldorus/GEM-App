import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Colors from '../../../constants/Colors';
import StyledText from '../../../components/StyledText';
import StyledTitle from '../../../components/StyledTitle';

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

const swipeoutBtns = [
    {
        component: <Text>H</Text>
    }
];

export class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    renderImageGem = () => {
        if (this.props.userStore.displayListWithImage && this.props.gemData.picture) {
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
                        source={{uri: this.props.gemData.avatar}}
                    />
                    <View style={styles.textWrapper}>
                        <StyledText>{this.props.gemData.category}</StyledText>
                        <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                        <StyledText>
                            {this.props.gemData.user} says {this.props.gemData.word}
                            {this.renderLocation()}</StyledText>
                    </View>
                </View>
                {this.renderImageGem()}
            </View>
        );
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(FeedElementComponent);
