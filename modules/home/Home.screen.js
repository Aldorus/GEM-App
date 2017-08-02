import React from 'react';
import {View} from 'react-native';
import FeedComponent from '../gem/Feed.component';
import BottomNavigationGem from '../../navigation/BottomNavigationGem.component';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import TopSortAndFilter from '../search/TopSortAndFilter.component';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySorting: false
        };
    }

    static navigationOptions = {
        header: null
    };

    onOpenContextualPanel = () => {
        this.setState({
            displaySorting: true
        });
    };

    onCloseContextualPanel = () => {
        this.setState({
            displaySorting: false
        });
    };

    renderSortingPanel = () => {
        if(this.state.displaySorting) {
            return <TopSortAndFilter onCloseContextualPanel={this.onCloseContextualPanel}/>;
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem navigation={this.props.navigation}
                                  onOpenContextualPanel={this.onOpenContextualPanel}/>
                {this.renderSortingPanel()}
                <FeedComponent></FeedComponent>
                <BottomNavigationGem navigation={this.props.navigation}/>
            </View>
        );
    }
}
