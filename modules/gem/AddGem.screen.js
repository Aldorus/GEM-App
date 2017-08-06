import React from 'react';
import {Image, StyleSheet, View, Platform, BackAndroid} from 'react-native';
import {LinearGradient} from 'expo';
import Colors from '../../constants/Colors';
import TopNavigationGem from '../../navigation/TopNavigationGem.component';
import gemImage from '../../assets/icons/gem.png';
import AddGemStep1 from './AddGemStep1.component';
import AddGemStep2 from './AddGemStep2.component';

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
let listener;

export default class AddGemScreen extends React.Component {
    static navigationOptions = {
        header: null
    };

    componentDidMount() {
        if (Platform.OS == 'android' && listener == null) {
            listener = BackAndroid.addEventListener('hardwareBackPress', () => {
                return this.backButtonPressed()
            });
        }
    }

    constructor(props) {
        super(props);
        this.state = {
            entitySelected: false
        };
    }

    onElementSelected = (result) => {
        // TODO save result
        this.setState({
            entitySelected: result
        });
    };

    backButtonPressed = () => {
        this.setState({
            entitySelected: null
        });
    };

    renderStep1 = () => {
        if (!this.state.entitySelected) {
            return <AddGemStep1 onElementSelected={this.onElementSelected}/>;
        }
    };

    renderStep2 = () => {
        if (this.state.entitySelected) {
            return <AddGemStep2 entity={this.state.entitySelected}/>;
        }
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <TopNavigationGem hasHistory={true}
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
