import React from 'react';
import {BackAndroid, Platform, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {Segment} from 'expo';
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
        if (this.navigationOptions.hasHistory && Platform.OS === 'android' && this.listener === null) {
            this.listener = BackAndroid.addEventListener('hardwareBackPress', this.backButtonPressed);
        }
        Segment.track(`screen: ${this.navigationOptions.stateName}`);
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

    renderBottom = () => {
        if (this.navigationOptions.bottom === false) {
            return null;
        }
        return <BottomNavigationGem navigation={this.props.navigation} stateName={this.navigationOptions.stateName}/>;
    };

    render(child) {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem navigationOptions={this.navigationOptions}
                                  backButtonAction={this.backButtonPressed}
                                  navigation={this.props.navigation}
                                  title={this.titleState}
                                  onOpenContextualPanel={this.onOpenContextualPanel}/>
                {this.renderSortingPanel()}
                {child}
                {this.renderBottom()}
            </View>
        );
    }
}
