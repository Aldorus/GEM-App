import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import AbstractGemScreen from '../../AbstractGem.screen';
import StyledText from '../../components/StyledText';
import Colors from '../../constants/Colors';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    image: {
        alignSelf: 'stretch',
        height: 200,
        zIndex: 0
    }
});

export default class DetailGemScreen extends AbstractGemScreen {
    static navigationOptions = {
        header: null
    };

    navigationOptions = {
        hasHistory: true,
        stateName: 'Detail Gem',
        titleState: ' '
        // noBackground: true
    };

    constructor(props) {
        super(props);
        this.state = {
            gem: props.navigation.state.params.gem
        };
    }

    renderDescription = () => {
        if (this.state.gem.note) {
            return <StyledText>{this.state.gem.user.first_name} {this.state.gem.note}</StyledText>;
        }
        return null;
    };

    renderRecommendedBy = () => {
        if (this.state.gem.recommended_by) {
            return <StyledText>Recommended by {this.state.gem.recommended_by}</StyledText>;
        }
        return null;
    };

    renderComments = () => {
        if (this.state.gem.comments) {
            return <StyledText>Recommended by {this.state.gem.recommended_by}</StyledText>;
        }
        return null;
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <ImageLoader indicator={ProgressBar}
                             style={styles.image}
                             indicatorProps={{
                                 color: Colors.colorText
                             }}
                             source={{uri: this.state.gem.picture}}/>
                <View style={{margin: 10}}>
                    {this.renderDescription()}
                    {this.renderRecommendedBy()}
                    {this.renderComments()}
                </View>
            </View>
        );
    }
}
