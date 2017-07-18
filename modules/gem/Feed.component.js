import React from 'react';
import {View} from 'react-native';
import GiftedListView from 'react-native-gifted-listview';
import FeedElementComponent from './FeedElement.component';
import QuickAddGemComponent from './QuickAddGem.component';

const listGems = [
    {
        type: 'QuickAddGemComponent'
    },
    {
        title: 'Salut',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Ça va',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Bien?',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Salut',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Ça va',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Bien?',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Salut',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Ça va',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    },
    {
        title: 'Bien?',
        image: `http://placebear.com/g/300/200?key=${Math.random()}`
    }
];

export default class FeedComponent extends React.Component {
    onFetch = (page = 1, callback, options) => {
        setTimeout(() => {
            callback(listGems);
        });
    };

    renderRowView = (rowData) => {
        return rowData.type === 'QuickAddGemComponent' ? <QuickAddGemComponent/> : <FeedElementComponent
            gemData={rowData}
        />;
    };

    render() {
        return (
            <View>
                <GiftedListView
                    onFetch={this.onFetch}
                    refreshable={true}
                    pagination={true}
                    rowView={this.renderRowView}
                />
            </View>
        );
    }
}