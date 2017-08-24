import React from 'react';
import {BackAndroid, Image, Platform, StyleSheet, View} from 'react-native';
import {LinearGradient} from 'expo';
import {NavigationActions} from 'react-navigation';
import {Segment} from 'expo';
import Colors from '../../constants/Colors';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import gemImage from '../../assets/icons/gem.png';
import AddGemStep1 from './components/AddGemStep1.component';
import AddGemStep2 from './components/AddGemStep2.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center'
    },
    image: {
        bottom: 16
    }
});

export default class AddGemScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            entitySelected: false
        };
    }

    componentDidMount() {
        if (Platform.OS === 'android' && this.listener === null) {
            this.listener = BackAndroid.addEventListener('hardwareBackPress', this.backButtonPressed);
        }
        Segment.track('screen: addGem');
    }

    onElementSelected = (result) => {
        // TODO save result
        this.setState({
            entitySelected: result
        });
    };

    onNewResult = () => {
        this.props.navigation.navigate('AddNewGem');
    };

    backButtonPressed = () => {
        if (this.state.entitySelected) {
            this.setState({
                entitySelected: null
            });
        } else {
            const backAction = NavigationActions.back();
            this.props.navigation.dispatch(backAction);
        }
    };

    renderStep1 = () => {
        if (!this.state.entitySelected) {
            return (<AddGemStep1
                onElementSelected={this.onElementSelected}
                onNewResult={this.onNewResult}
            />);
        }
        return null;
    };

    renderStep2 = () => {
        if (this.state.entitySelected) {
            return <AddGemStep2 entity={this.state.entitySelected} navigation={this.props.navigation}/>;
        }
        return null;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem navigationOptions={{
                    hasHistory: true,
                    titleState: ' ',
                    noBackground: true
                }}
                                  backButtonAction={this.backButtonPressed}
                                  navigation={this.props.navigation}/>
                <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                                style={styles.container}
                                end={[1, 0]}>
                    <Image source={gemImage}
                           style={styles.image}/>
                    {this.renderStep1()}
                    {this.renderStep2()}
                </LinearGradient>
            </View>
        );
    }
}
