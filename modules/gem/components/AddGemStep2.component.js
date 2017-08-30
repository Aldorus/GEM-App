import React from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {connect} from 'react-redux';
import {Button, DropDownMenu} from '@shoutem/ui';
import {shuffleArray} from '../../../utilities/extends/array.utils';
import ExternalSearchResultElement from '../../search/components/ExternalSearchResultElement.component';
import * as types from '../../../constants/ActionTypes';
import listWords from './listWords.json';
import PicturePicker from '../../picture/PicturePicker.component';
import {createGem} from '../services/gem.service';

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
        width: 50,
        marginLeft: 5,
        marginRight: 5
    },
    wordContainer: {
        marginBottom: 10,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        flex: 1
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
const shuffleListWords = shuffleArray(listWords);

export class AddGemStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: props.entity.image,
            selectedWord: shuffleListWords[0]
        };
    }

    onSelectImage = (uri) => {
        this.setState({
            picture: uri
        });
    };

    createTheGem = () => {
        const newGem = this.props.entity;
        newGem.user = {
            id: this.props.userStore.id
        };
        newGem.word = this.state.selectedWord.key;
        newGem.description = this.state.description;
        if (this.state.picture || this.state.image) {
            newGem.picture = this.state.picture || this.state.image;
        }
        console.log('Tying to create', newGem);
        createGem(newGem, this.props.userStore).then((newGemResponse) => {
            console.log('new gem', newGemResponse);
            this.props.dispatch({
                type: types.ADD_GEM,
                gem: newGemResponse
            });
        });
        this.props.navigation.navigate('Main');
    };

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

    render = () => {
        return (<ScrollView style={styles.scroll}>
            <View style={styles.container}>
                <ExternalSearchResultElement result={this.props.entity}/>
                <View style={styles.wordContainer}>
                    <Text style={styles.was}>Was...</Text>
                    <DropDownMenu
                        styleName="clear"
                        options={shuffleListWords}
                        selectedOption={this.state.selectedWord ? this.state.selectedWord : shuffleListWords[0]}
                        onOptionSelected={(word) => {
                            return this.setState({selectedWord: word});
                        }}
                        titleProperty="label"
                        valueProperty="word"
                        style={this.selectStyles}
                    />
                </View>
                <PicturePicker image={this.state.picture}
                               onSelectImage={this.onSelectImage}/>
                <TextInput placeholder="Add your comment"
                           style={[styles.input]}
                           multiline={true}
                           onChangeText={(description) => this.setState({description})}
                           value={this.state.description}
                           placeholderTextColor="black"
                           underlineColorAndroid="transparent"/>
                <Button onPress={this.createTheGem}
                        styleName="clear">
                    <Text style={styles.button}>Gem It ></Text>
                </Button>
            </View>
        </ScrollView>);
    };
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(AddGemStep2);
