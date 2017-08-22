import React from 'react';
import {Text} from 'react-native';

export default class BoldText extends React.Component {
    render() {
        return (
            <Text
                {...this.props}
                style={[{fontFamily: 'celia-bold', fontSize: 14}, this.props.style]}
            />
        );
    }
}
