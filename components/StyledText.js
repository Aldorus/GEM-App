import React from 'react';
import {Text} from 'react-native';

export default class StyledText extends React.Component {
    render() {
        return (
            <Text {...this.props}
                  style={[{
                      backgroundColor: 'transparent',
                      fontSize: 14,
                      fontFamily: 'celia'
                  }, this.props.style]}/>
        );
    }
}
