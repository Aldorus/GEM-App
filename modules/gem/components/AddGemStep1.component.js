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

    onNewResult = () => {
        if (this.props.onNewResult) {
            this.props.onNewResult();
        }
    };

    onChange = (value) => {
        if (value.length > 3) {
            Promise.all([
                this.searchEntity(value),
                this.searchPlaces(value),
                this.searchMovies(value),
                this.searchBooks(value)
            ]).then(this.mergeResults);
        }
        this.setState({value});
    };

    searchEntity = (value) => {
        return ExternalSearchEntity(value);
    };

    searchPlaces = (value) => {
        return ExternalSearchPlace(value);
    };

    searchMovies = (value) => {
        return ExternalSearchMovie(value);
    };

    searchBooks = (value) => {
        return ExternalSearchBook(value);
    };

    mergeResults = (partialResults) => {
        const results = partialResults.reduce((accu, partial) => {
            return accu.concat(partial);
        }, []);
        this.setState({
            results
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
            <ExternalSearchResults
                results={this.state.results}
                onElementSelected={this.onElementSelected}
                onNewResult={this.onNewResult}
            />
        </View>);
    };
}
