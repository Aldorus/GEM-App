import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';
import BoldText from '../../components/BoldText';
import StyledText from '../../components/StyledText';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        margin: 15,
        alignItems: 'center'
    },
    avatar: {
        width: 30,
        height: 30,
        padding: 10,
        marginRight: 8,
        top: 5
    }
});

// TODO
export default class CommentElement extends React.Component {
    render = () => {
        return <View style={styles.container}>
            <ImageLoader borderRadius={15}
                         style={styles.avatar}
                         indicator={ProgressBar}
                         indicatorProps={{
                             color: Colors.colorText
                         }}
                         source={{uri: this.props.comment.user.avatar_url}}/>
            <StyledText>
                <BoldText>{this.props.comment.user.first_name}</BoldText> {this.props.comment.message}
            </StyledText>
        </View>;
    }
}
