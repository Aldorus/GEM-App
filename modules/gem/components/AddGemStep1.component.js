import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
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
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        alignSelf: 'stretch',
        fontFamily: 'celia'
    },
    title: {
        fontSize: 20,
        backgroundColor: 'transparent'
    },
    icon: {
        bottom: 32,
        left: 25,
        alignSelf: 'flex-start'
    }
});

export default class AddGemStep1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            entitySelected: false,
            results: []
        };
    }

    onElementSelected = (result) => {
        this.setState({
            entitySelected: result
        });
        if (this.props.onElementSelected) {
            this.props.onElementSelected(result);
        }
    };

    onChange = (value) => {
        if (value.length > 3) {
            this.searchEntity(value);
            this.searchPlaces(value);
            this.searchMovies(value);
            this.searchBooks(value);
        }
        this.setState({value});
    };

    searchEntity = (value) => {
        ExternalSearchEntity(value).then(this.mergeResults);
    };

    searchPlaces = (value) => {
        ExternalSearchPlace(value).then(this.mergeResults);
    };

    searchMovies = (value) => {
        ExternalSearchMovie(value).then(this.mergeResults);
    };

    searchBooks = (value) => {
        ExternalSearchBook(value).then(this.mergeResults);
    };

    mergeResults = (partialResult) => {
        this.setState({
            results: this.state.results.concat(partialResult)
        });
    };

    render = () => {
        return (<View style={styles.container}>
            <Text style={styles.title}>Add a Gem</Text>
            <TextInput placeholder="Find your GEM"
                       style={styles.input}
                       autoFocus={true}
                       placeholderTextColor="black"
                       underlineColorAndroid="transparent"
                       onChangeText={this.onChange}/>
            <Image source={searchImage}
                   style={styles.icon}/>
            <ExternalSearchResults results={this.state.results} onElementSelected={this.onElementSelected}/>
        </View>);
    };
}
