import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import t from 'tcomb-form-native';
import {LinearGradient} from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import Colors from '../../constants/Colors';
import _ from 'lodash';

const style = StyleSheet.create({
    container: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 20,
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 50
    },
    icon: {
        position: 'absolute',
        left: 15,
        top: 12
    }
});
const Form = t.form.Form;
const Search = t.struct({
    search: t.String
});
// clone the default stylesheet
const stylesheetForm = _.cloneDeep(t.form.Form.stylesheet);
stylesheetForm.textbox.normal.flex = 1;
stylesheetForm.textbox.normal.height = 50;
stylesheetForm.textbox.normal.borderRadius = 50;
stylesheetForm.textbox.normal.borderWidth = 0;

export default class QuickSearchComponent extends Component {
    formOptions = {
        auto: 'none',
        fields: {
            search: {
                placeholder: 'Search the Gembox',
                stylesheet: stylesheetForm
            }
        }
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    onChange = (value) => {
        console.log('update value', value);
        this.setState({value});
    };

    render() {
        return (
            <LinearGradient
                colors={[Colors.gradientStart, Colors.gradientEnd]}
                end={[1, 0]}
                style={style.container}
            >
                <Form
                    ref="form"
                    onChange={this.onChange}
                    value={this.state.value}
                    options={this.formOptions}
                    type={Search}
                />
                <Icon
                    name="search"
                    size={25}
                    style={style.icon}
                />
            </LinearGradient>
        );
    }
}
