import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';
import ExternalSearchEntity from '../../search/services/ExternalSearchEntity.service';
import ExternalSearchPlace from '../../search/services/ExternalSearchPlace.service';
import ExternalSearchMovie from '../../search/services/ExternalSearchMovie.service';
import ExternalSearchBook from '../../search/services/ExternalSearchBook.service';
import searchImage from '../../../assets/icons/search@2x.png';
import ExternalSearchResults from '../../search/components/ExternalSearchResults.conponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 10,
        paddingLeft: 50,
        height: 40,
        marginTop: 45,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
        fontFamily: 'celia-light',
        fontSize: 18
    },
    title: {
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    icon: {
        bottom: 32,
        left: 25,
        alignSelf: 'flex-start',
        zIndex: 100,
        position: 'relative'
    }
});

export default class AddGemStep1 extends React.Component {
    currentCall = 0;

    constructor(props) {
        super(props);
        this.state = {
            entitySelected: false,
            results: []
        };
    }

    onElementSelected = (result, type) => {
        this.setState({
            entitySelected: result
        });
        if (this.props.onElementSelected) {
            this.props.onElementSelected(result, type);
        }
    };

    onNewResult = () => {
        if (this.props.onNewResult) {
            this.props.onNewResult();
        }
    };

    onChange = (value) => {
        if (value.length > 3) {
            this.currentCall++;
            Promise.all([
                this.searchEntity(value, this.currentCall),
                this.searchPlaces(value, this.currentCall),
                this.searchMovies(value, this.currentCall),
                this.searchBooks(value, this.currentCall)
            ]).then((partialResults) => {
                if (partialResults[0].index === this.currentCall) {
                    this.mergeResults(partialResults);
                }
            });
        }
        this.setState({value});
    };

    searchEntity = (value, index) => {
        return ExternalSearchEntity(value, index);
    };

    searchPlaces = (value, index) => {
        return ExternalSearchPlace(value, index);
    };

    searchMovies = (value, index) => {
        return ExternalSearchMovie(value, index);
    };

    searchBooks = (value, index) => {
        return ExternalSearchBook(value, index);
    };

    mergeResults = (partialResults) => {
        const results = partialResults.reduce((accu, partial) => {
            return accu.concat(partial.response);
        }, []);
        this.setState({
            results
        });
    };

    render = () => {
        return (<View style={styles.container}>
            <TextInput placeholder="Add an experience"
                       style={styles.input}
                       autoFocus={true}
                       placeholderTextColor="black"
                       underlineColorAndroid="transparent"
                       onChangeText={this.onChange}/>
            <Image source={searchImage}
                   style={styles.icon}/>
            <ExternalSearchResults
                results={this.state.results}
                onElementSelected={this.onElementSelected}
                onNewResult={this.onNewResult}
            />
        </View>);
    };
}
