import React from 'react';
import {Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {LinearGradient} from 'expo';
import ExternalSearchEntity from '../search/ExternalSearchEntity.service';
import Colors from '../../constants/Colors';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import ExternalSearchResults from '../search/ExternalSearchResults.conponent';
import ExternalSearchPlace from '../search/ExternalSearchPlace.service';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    image: {
        bottom: 16
    },
    title: {
        fontSize: 20,
        backgroundColor: 'transparent'
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
        alignSelf: 'stretch'
    },
    icon: {
        bottom: 32,
        left: 25,
        alignSelf: 'flex-start'
    }
});

export default class AddGemScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
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

    onChange = (value) => {
        if (value.length > 3) {
            this.searchEntity(value);
            this.searchPlaces(value);
        }
        this.setState({value});
    };

    mergeResults = () => {
        let results = [];
        // TODO refactoring here
        this.state.entities ? results = results.concat(this.state.entities) : '';
        this.state.places ? results = results.concat(this.state.places) : '';
        return results;
    };

    renderResults = () => {
        return <ExternalSearchResults results={this.mergeResults()}/>;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem hasHistory={true}
                                  navigation={this.props.navigation}/>
                <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                                style={styles.container}
                                end={[1, 0]}>
                    <Image source={require('../../assets/icons/gem.png')}
                           style={styles.image}/>
                    <Text style={styles.title}>Add a Gem</Text>
                    <TextInput placeholder="Find your GEM"
                               style={styles.input}
                               placeholderTextColor="black"
                               underlineColorAndroid="transparent"
                               onChangeText={this.onChange}/>
                    <Image source={require('../../assets/icons/search.png')}
                           style={styles.icon}/>
                    {this.renderResults()}
                </LinearGradient>
            </View>
        );
    }
}
