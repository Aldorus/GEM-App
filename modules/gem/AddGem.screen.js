import React from 'react';
import {BackAndroid, Image, Platform, StyleSheet, View} from 'react-native';
import {LinearGradient, Segment} from 'expo';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import Colors from '../../constants/Colors';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import gemImage from '../../assets/icons/add-gem@2x.png';
import AddGemStep1 from './components/AddGemStep1.component';
import * as types from '../../constants/ActionTypes';
import AddGemStep2 from './components/AddGemStep2.component';
import {createGem} from './services/gem.service';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingTop: 20,
        zIndex: 200
    },
    image: {
        position: 'absolute',
        top: -30,
        zIndex: 200
    }
});

export class AddGemScreen extends React.Component {
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

    onElementSelected = (result, type) => {
        // TODO save result
        console.log('type: ', type);
        if (type === 'gem') {
            return this.setState({
                entitySelected: result,
                type
            });
        }
        console.log('Result to save', result);
        createGem(result, this.props.userStore).then((newGemResponse) => {
            console.log('new gem', newGemResponse);
            this.props.dispatch({
                type: types.ADD_SAVED_GEM,
                saved: newGemResponse
            });
        });
        this.props.navigation.navigate('Main');
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
            return <AddGemStep2 entity={this.state.entitySelected}
                                type={this.state.type}
                                navigation={this.props.navigation}/>;
        }
        return null;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem
                    navigationOptions={{
                        hasHistory: true,
                        titleState: ' ',
                        background: '#fff'
                    }}
                    backButtonAction={this.backButtonPressed}
                    navigation={this.props.navigation}
                />
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

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(AddGemScreen);
