import React from 'react';
import {BackAndroid, Platform, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import BottomNavigationGem from './navigation/BottomNavigationGem.component';
import TopNavigationGem from './navigation/TopNavigationGem.component';
import TopSortAndFilter from './modules/search/components/TopSortAndFilter.component';

export default class AbstractGemScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySorting: false
        };
    }

    componentDidMount() {
        if (this.hasHistory && Platform.OS === 'android' && this.listener === null) {
            this.listener = BackAndroid.addEventListener('hardwareBackPress', this.backButtonPressed);
        }
    }

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

    backButtonPressed = () => {
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };

    renderSortingPanel = () => {
        if (this.state.displaySorting) {
            return <TopSortAndFilter onCloseContextualPanel={this.onCloseContextualPanel}/>;
        }
        return null;
    };

    render(child, hasHistory) {
        this.hasHistory = hasHistory;
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem hasHistory={hasHistory}
                                  backButtonAction={this.backButtonPressed}
                                  navigation={this.props.navigation}
                                  onOpenContextualPanel={this.onOpenContextualPanel}/>
                {this.renderSortingPanel()}
                {child}
                <BottomNavigationGem navigation={this.props.navigation}/>
            </View>
        );
    }
}
