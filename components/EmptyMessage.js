import React from 'react';
import {Text, View} from 'react-native';

export default class EmptyMessage extends React.Component {
    render = () => {
        return <View style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 50,
            paddingLeft: 50
        }}>
            <Text style={{
                textAlign: 'center'
            }}>{this.props.message}</Text>
        </View>;
    };
}
