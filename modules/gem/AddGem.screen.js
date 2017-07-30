import React from 'react';
import {Text, View} from 'react-native';
import t from 'tcomb-form-native';
import AddGemGlobalSearch from './AddGemGlobalSearch.service';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import BottomNavigationGem from '../../navigation/BottomNavigationGem.component';

const Form = t.form.Form;
const Gem = t.struct({
    input: t.String
});

export default class AddGemScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    submit = () => {

    };

    onChange = (value) => {
        console.log('update value', value);
        if (value.input.length > 3) {
            AddGemGlobalSearch(value.input).then((response) => {
                console.log(response);
                this.setState({response})
            });
        }
        this.setState({value});
    };

    renderResult = (entry, index) => {
        console.log('entry to render', entry);
        if(entry.result.detailedDescription && entry.result.detailedDescription.articleBody) {
            return <Text key={index}>{JSON.stringify(entry.result['@type'])} : {entry.result.detailedDescription.articleBody}</Text>;
        }
        return <Text key={index}>{JSON.stringify(entry.result['@type'])} : {JSON.stringify(entry.result)}</Text>;
    };

    renderResults = () => {
        if (this.state.response) {
            console.log('result to render');
            return this.state.response.itemListElement.map(this.renderResult);
        }
    };

    render() {
        return (
            <View>
                <TopNavigationGem navigation={this.props.navigation}/>
                <View style={{flex: 1}}>
                    <Text>
                        Share a new Gem
                    </Text>
                    <Form
                        ref="form"
                        onChange={this.onChange}
                        value={this.state.value}
                        type={Gem}
                    />
                    {this.renderResults()}
                </View>
            </View>
        );
    }
}
