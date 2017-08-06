import React from 'react';
import {Image, Text, TextInput, View, StyleSheet} from 'react-native';
import ExternalSearchEntity from '../../search/ExternalSearchEntity.service';
import ExternalSearchPlace from '../../search/ExternalSearchPlace.service';
import ExternalSearchMovie from '../../search/ExternalSearchMovie.service';
import ExternalSearchBook from '../../search/ExternalSearchBook.service';
import searchImage from '../../../assets/icons/search.png';
import ExternalSearchResults from '../../search/ExternalSearchResults.conponent';

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
            entitySelected: false
        };
    }

    searchEntity = (value) => {
        ExternalSearchEntity(value).then((entities) => {
            this.setState({entities})
        });
    };

    searchPlaces = (value) => {
        ExternalSearchPlace(value).then((places) => {
            this.setState({places})
        });
    };

    searchMovies = (value) => {
        ExternalSearchMovie(value).then((movies) => {
            this.setState({movies})
        });
    };

    searchBooks = (value) => {
        ExternalSearchBook(value).then((books) => {
            this.setState({books})
        });
    };

    mergeResults = () => {
        let results = [];
        this.state.entities ? results = results.concat(this.state.entities) : '';
        this.state.places ? results = results.concat(this.state.places) : '';
        this.state.movies ? results = results.concat(this.state.movies) : '';
        this.state.books ? results = results.concat(this.state.books) : '';
        return results;
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

    onElementSelected = (result) => {
        // TODO save result
        this.setState({
            entitySelected: result
        });
        if (this.props.onElementSelected) {
            this.props.onElementSelected(result);
        }
    };

    render = () => {
        return <View style={styles.container}>
            <Text style={styles.title}>Add a Gem</Text>
            <TextInput placeholder="Find your GEM"
                       style={styles.input}
                       placeholderTextColor="black"
                       underlineColorAndroid="transparent"
                       onChangeText={this.onChange}/>
            <Image source={searchImage}
                   style={styles.icon}/>
            <ExternalSearchResults results={this.mergeResults()} onElementSelected={this.onElementSelected}/>
        </View>
    }
}