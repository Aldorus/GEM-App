import React from 'react';
import {Image, StyleSheet, Text, View, TextInput} from 'react-native';
import {LinearGradient} from 'expo';
import AddGemGlobalSearch from '../search/AddGemGlobalSearch.service';
import Colors from '../../constants/Colors';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import ExternalSearchResults from '../search/ExternalSearchResults.conponent';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        padding: 10
    },
    image: {
        bottom: 26
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
        marginTop: 30
    },
    icon: {
        bottom: 32,
        left: 12,
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

    onChange = (value) => {
        console.log('update value', value);
        if (value.length > 3) {
            AddGemGlobalSearch(value).then((response) => {
                console.log(response);
                this.setState({response})
            });
        }
        this.setState({value});
    };

    renderResults = () => {
        if (this.state.response) {
            return <ExternalSearchResults results={this.state.response}/>;
        }
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
                    <TextInput
                        placeholder="Find your GEM"
                        style={styles.input}
                        onChangeText={this.onChange}
                    />
                    <Image source={require('../../assets/icons/search.png')}
                           style={styles.icon}/>
                    {this.renderResults()}
                </LinearGradient>
            </View>
        );
    }
}
