import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import {connect} from 'react-redux';
import ProgressBar from 'react-native-progress/Circle';
import {Button, DropDownMenu} from '@shoutem/ui'
import {shuffleArray} from '../../../utilities/extends/array.utils';
import Colors from '../../../constants/Colors';
import ExternalSearchResultElement from '../../search/components/ExternalSearchResultElement.component';
import CreateGem from '../services/CreateGem.service';
import * as types from '../../../constants/ActionTypes';

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
        label: 'To Die For',
        word: 'it\'s To Die For'
    },
    {
        label: 'WTF',
        word: 'it\'s WTF'
    },
    {
        label: 'Seriously WTF',
        word: 'it\'s Seriously WTF'
    },
    {
        label: 'Awesome',
        word: 'it\'s Awesome'
    },
    {
        label: 'The Best Thing Ever',
        word: 'it\'s The Best Thing Ever'
    },
    {
        label: 'Must Try',
        word: 'it\'s a Must Try'
    },
    {
        label: 'Holy shit...',
        word: 'Holy shit...'
    },
    {
        label: 'Dude, really',
        word: 'Dude, really'
    },
    {
        label: 'Whaaaaaaaaaa',
        word: 'Whaaaaaaaaaa'
    }
]);

export class AddGemStep2 extends React.Component {
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
        console.log('Hell', this.state);
        const newGem = this.props.entity;
        newGem.user = this.props.userStore.firstname;
        newGem.avatar = this.props.userStore.avatar;
        newGem.word = this.state.selectedWord.word;
        newGem.comment = this.state.comment;
        // TODO connect to webservice
        // CreateGem(newGem).then((newGem) => {
            console.log('gem created');
            this.props.dispatch({
                type: types.ADD_GEM,
                gem: newGem
            });
            this.props.navigation.navigate('Main');
        // });
    };

    render = () => {
        console.log('User store', this.props.userStore);
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
                        valueProperty="word"
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

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    }
};

export default connect(mapStores)(AddGemStep2);
