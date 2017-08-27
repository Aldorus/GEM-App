import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        alignSelf: 'stretch'
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
                         source={{uri: this.props.commnent.avatar_url}}/>
            <Text>{this.props.commnent.content}</Text>
        </View>;
    }
}