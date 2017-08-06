import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Swipeout from 'react-native-swipeout';
import PropTypes from 'prop-types';
import Colors from '../../constants/Colors';
import StyledText from '../../components/StyledText';
import StyledTitle from '../../components/StyledTitle';

const styles = StyleSheet.create({
    container: {
        margin: 15,
        marginTop: 8,
        marginBottom: 8,
        flexDirection: 'row',
        alignSelf: 'stretch'
    },
    textWrapper: {
        flexDirection: 'column',
        flex: 1,
        paddingRight: 15,
        paddingBottom: 10
    },
    image: {
        width: 30,
        height: 30,
        padding: 10,
        marginRight: 8,
        top: 5
    }
});

const swipeoutBtns = [
    {
        component: <Text>H</Text>
    }
];

export default class FeedElementComponent extends React.Component {
    static propTypes = {
        gemData: PropTypes.object.isRequired
    };

    render() {
        return (
            <View style={[styles.container]}>
                {/*<Swipeout right={swipeoutBtns}  swipeout={{*/}
                    {/*flexDirection: 'row',*/}
                    {/*backgroundColor: 'red',*/}
                    {/*alignSelf: 'stretch',*/}
                    {/*alignItems: 'stretch'*/}
                {/*}}>*/}
                    <Image
                        borderRadius={15}
                        style={styles.image}
                        indicator={ProgressBar}
                        indicatorProps={{
                            color: Colors.tintColor
                        }}
                        source={{uri: this.props.gemData.avatar}}
                    />
                    <View style={styles.textWrapper}>
                        <StyledText>{this.props.gemData.category}</StyledText>
                        <StyledTitle numberOfLines={1}>{this.props.gemData.title}</StyledTitle>
                        <StyledText>{this.props.gemData.shortLabel}</StyledText>
                        {/*<Image source={{uri:this.props.gemData.picture}}/>*/}
                    </View>
                {/*</Swipeout>*/}
            </View>
        );
    }
}
