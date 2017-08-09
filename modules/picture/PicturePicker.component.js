import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ImagePicker} from 'expo';
import {Button} from '@shoutem/ui';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import Colors from '../../constants/Colors';

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
        ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }).then(this.newImage);
    };

    onPressGallery = () => {
        ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
        }).then(this.newImage);
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
                alignSelf: 'stretch'
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
                    alignSelf: 'stretch'
                }}>
                    <Button onPress={this.onPressGallery}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.white
                            }}
                            styleName="clear">
                        <Text style={styles.button}>Gallery</Text>
                    </Button>
                    <Button onPress={this.onPressCamera}
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: Colors.secondaryTintColor
                            }}
                            styleName="clear">
                        <Text style={styles.button}>Camera</Text>
                    </Button>
                </View>

            </View>
        );
    }
}
