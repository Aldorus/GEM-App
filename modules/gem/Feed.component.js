import React from 'react';
import {FlatList, Text, View} from 'react-native';
import { Container, Content, Card, CardItem, Body } from 'native-base';


const listGems = [
    {
        title: 'Salut'
    },
    {
        title: 'Ça va'
    },
    {
        title: 'Bien?'
    }
];

export default class FeedComponent extends React.Component {
    // renderItem = () => {
    //     return (
    //
    //     )
    // }

    render() {
        return (
            <View>
                <Text>Hello</Text>
                <Card>
                     <CardItem>
                         <Body>
                             <Text style={{fontWeight:'bold',fontSize:17}}>Title</Text>
                             <Text note style={{fontSize:15}}>Topic</Text>
                         </Body>
                     </CardItem>
                 </Card>
            </View>
            // <Container>
            //     <Content>
            //         <Card>
            //             <CardItem>
            //                 <Body>
            //                     <Text>
            //                         Your text here
            //                     </Text>
            //                 </Body>
            //             </CardItem>
            //         </Card>
            //     </Content>
            // </Container>
        );
    }
}