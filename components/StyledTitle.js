import React from 'react';
import {Text} from 'react-native';

export default class StyledTitle extends React.Component {
    render() {
        return (
            <Text
                {...this.props}
                style={
                    [this.props.style,
                        {
                            fontFamily: 'celia-bold',
                            fontSize: 20
                        }
                    ]}
            />
        );
    }
}
