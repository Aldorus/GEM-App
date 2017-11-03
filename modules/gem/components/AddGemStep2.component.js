import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {connect} from 'react-redux';
import {DropDownMenu} from '@shoutem/ui';
import ExternalSearchResultElement from '../../search/components/ExternalSearchResultElement.component';
import * as types from '../../../constants/ActionTypes';
import listWords from './listWords.json';
import PicturePicker from '../../picture/PicturePicker.component';
import {createGem} from '../services/gem.service';
import Colors from '../../../constants/Colors';
import GradientBackground from '../../../components/GradientBackground';
import StyledText from '../../../components/StyledText';

const styles = StyleSheet.create({
    scroll: {
        alignSelf: 'stretch',
        paddingBottom: 30,
        paddingTop: 30,
        backgroundColor: 'white'
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'stretch'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 16,
        height: 40,
        marginLeft: 85,
        marginRight: 30,
        alignSelf: 'stretch',
        justifyContent: 'center',
        fontFamily: 'celia',
        marginTop: 0,
        borderColor: 'white',
        borderBottomWidth: 1,
        marginBottom: 10,
        paddingTop: 10,
        color: '#585858'
    },
    was: {
        justifyContent: 'center',
        marginLeft: 5,
        marginRight: 5,
        backgroundColor: 'transparent'
    },
    wordContainer: {
        marginBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    button: {
        alignSelf: 'center',
        width: 120,
        flex: 1,
        marginTop: 12,
        marginBottom: 8,
        borderRadius: 20
    },
    innerButton: {
        borderRadius: 20,
        padding: 7,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});

export class AddGemStep2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            picture: props.entity.image,
            selectedWord: listWords[Math.floor(Math.random() * listWords.length)]
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
        createGem(newGem, this.props.userStore).then((newGemResponse) => {
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
            flex: 1,
            justifyContent: 'flex-start',
            fontFamily: 'celia',
            fontSize: 14
        },
        modal: {
            backgroundColor: 'white'
        },
        modalItem: {
            padding: 0,
            margin: 0
        },
        visibleOptions: 12
    };

    render = () => {
        return (<KeyboardAwareScrollView style={styles.scroll}>
            <View style={styles.container}>
                <GradientBackground style={{alignSelf: 'stretch', marginTop: -30, paddingTop: 30}}>
                    <ExternalSearchResultElement result={this.props.entity} noClick={true}/>
                    <View style={styles.wordContainer}>
                        <Text style={styles.was}>It Was</Text>
                        <View style={{flex: 1, marginLeft: 5}}>
                            <DropDownMenu
                                styleName="clear"
                                options={listWords.sort((a, b) => a.label.localeCompare(b.label))}
                                selectedOption={this.state.selectedWord}
                                onOptionSelected={(word) => {
                                    return this.setState({selectedWord: word});
                                }}
                                titleProperty="label"
                                valueProperty="word"
                                style={this.selectStyles}
                            />
                        </View>
                    </View>
                    <TextInput placeholder="Add a note if you’d like"
                               style={[styles.input]}
                               multiline={true}
                               placeholderTextColor="#585858"
                               onChangeText={(description) => this.setState({description})}
                               value={this.state.description}
                               returnKeyLabel={'done'}
                               blurOnSubmit={true}
                               underlineColorAndroid="transparent"/>
                </GradientBackground>

                <View style={{backgroundColor: Colors.white, alignSelf: 'stretch'}}>
                    <PicturePicker image={this.state.picture}
                                   onSelectImage={this.onSelectImage}/>
                    <TouchableHighlight
                        style={[styles.button, {marginLeft: 5}]}
                        underlayColor={Colors.tintColor}
                        onPress={this.createTheGem}>
                        <View>
                            <GradientBackground style={styles.innerButton}>
                                <StyledText style={{marginTop: 2}}>Gem It</StyledText>
                            </GradientBackground>
                        </View>
                    </TouchableHighlight>
                </View>
            </View>
        </KeyboardAwareScrollView>);
    };
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(AddGemStep2);
