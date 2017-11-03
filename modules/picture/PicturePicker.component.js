import React from 'react';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import {ImagePicker} from 'expo';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';
import camera from '../../assets/icons/camera-icon@2x.png';
import gallery from '../../assets/icons/gallery-icon@2x.png';

const styles = StyleSheet.create({
    button: {
        marginTop: 15,
        marginBottom: 15,
        fontFamily: 'celia',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        color: 'black'
    }
});

export default class PicturePicker extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: props.image
        };
    }

    onPressCamera = () => {
        ImagePicker.launchCameraAsync().then(this.newImage);
    };

    onPressGallery = () => {
        ImagePicker.launchImageLibraryAsync().then(this.newImage);
    };

    newImage = (result) => {
        if (!result.cancelled) {
            this.setState({
                image: result.uri
            });
            if (this.props.onSelectImage) {
                this.props.onSelectImage(this.state.image);
            }
        }
    };

    render = () => {
        return (
            <View style={{
                alignSelf: 'stretch',
                position: 'relative'
            }}>
                <ImageLoader indicator={ProgressBar}
                             style={{
                                 width: 400,
                                 height: 200,
                             }}
                             indicatorProps={{
                                 color: Colors.colorBackground
                             }}
                             source={{uri: this.state.image}}/>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    position: 'absolute',
                    bottom: 5,
                    right: 15
                }}>
                    <TouchableHighlight onPress={this.onPressGallery}
                                        styleName="clear">
                        <Image source={gallery}/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this.onPressCamera}
                                        styleName="clear">
                        <Image source={camera}/>
                    </TouchableHighlight>
                </View>
            </View>
        );
    }
}
