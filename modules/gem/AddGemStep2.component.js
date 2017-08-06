import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {Button, DropDownMenu} from '@shoutem/ui'
import {shuffleArray} from '../../utilities/array.utils';
import Colors from '../../constants/Colors';
import ExternalSearchResultElement from '../search/ExternalSearchResultElement.component';
import CreateGem from './CreateGem.service';

const styles = StyleSheet.create({
    scroll: {
        alignSelf: 'stretch',
        paddingBottom: 30
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        height: 80,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
        fontFamily: 'celia',
        marginTop: 10
    },
    was: {
        justifyContent: 'center',
        flex: 1
    },
    wordContainer: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15
    },
    button: {
        marginTop: 15,
        marginBottom: 15,
        fontFamily: 'celia',
        alignSelf: 'stretch',
        backgroundColor: 'transparent',
        color: 'black'
    }
});

const listWords = shuffleArray([
    {
        label: 'To Die For'
    },
    {
        label: 'WTF'
    },
    {
        label: 'Seriously WTF'
    },
    {
        label: 'Awesome'
    },
    {
        label: 'Must Try'
    },
    {
        label: 'The Best Thing Ever'
    },
    {
        label: 'Must Try'
    },
    {
        label: 'Holy shit...'
    },
    {
        label: 'Dude, really'
    },
    {
        label: 'Whaaaaaaaaaa'
    }
]);

export default class AddGemStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedWord: listWords[0]
        };
    }

    selectStyles = {
        selectedOption: {
            backgroundColor: 'white',
            borderRadius: 20,
            width: 300
        },
        modal: {
            backgroundColor: 'white'
        }
    };

    createTheGem = () => {
        const newGem = this.props.entity;
        newGem.word = this.state.selectedWord;
        newGem.comment = this.state.comment;
        CreateGem(newGem).then(() => {
            console.log('gem created');
        });
    };

    render = () => {
        return <ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <ExternalSearchResultElement result={this.props.entity}/>
                <View style={styles.wordContainer}>
                    <Text style={styles.was}>Was...</Text>
                    <DropDownMenu
                        styleName="clear"
                        options={listWords}
                        selectedOption={this.state.selectedWord ? this.state.selectedWord : listWords[0]}
                        onOptionSelected={(word) => this.setState({selectedWord: word})}
                        titleProperty="label"
                        valueProperty="label"
                        style={this.selectStyles}
                    />
                </View>
                <ImageLoader indicator={ProgressBar}
                             style={{
                                 width: 400,
                                 height: 200,
                             }}
                             indicatorProps={{
                                 color: Colors.colorBackground
                             }} source={{uri: this.props.entity.image}}/>
                <TextInput placeholder="Add your comment"
                           style={[styles.input]}
                           onChangeText={(comment) => this.setState({comment})}
                           value={this.state.comment}
                           placeholderTextColor="black"
                           multiline={true}
                           underlineColorAndroid="transparent"/>
                <Button onPress={this.createTheGem}
                        styleName="clear">
                    <Text style={styles.button}>Gem It ></Text>
                </Button>
            </View>
        </ScrollView>
    };
}