import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {connect} from 'react-redux';
import AbstractGemScreen from '../../AbstractGem.screen';
import StyledText from '../../components/StyledText';
import Colors from '../../constants/Colors';
import FeedElementComponent from './components/FeedElement.component';

const styles = StyleSheet.create({
    scroll: {
        alignSelf: 'stretch',
        paddingBottom: 30
    },
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

export class DetailGemScreen extends AbstractGemScreen {
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

    goOnComments = () => {
        this.props.navigation.navigate('ListComments');
    };

    renderComment = () => {

    };

    renderComments = () => {
        // TODO
        // this.state.gem.comments = listComments.comments;
        if (!this.state.gem.comments) {
            return <TouchableHighlight underlayColor={Colors.tintColor} onPress={this.goOnComments}>
                <View>
                    <StyledText>Add comments</StyledText>
                </View>
            </TouchableHighlight>;
        }
        return this.state.gem.comments.map(this.renderComment);
    };

    render() {
        return super.render(
            <ScrollView style={styles.scroll}>
                <View style={styles.container}>
                    <ImageLoader indicator={ProgressBar}
                                 style={styles.image}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.state.gem.picture}}/>
                    <View style={{margin: 10}}>
                        <FeedElementComponent
                            gemData={this.state.gem}
                            hideSentence={true}
                            userStore={this.props.userStore}
                            displayWithImage={false}
                        />
                        {this.renderDescription()}
                        {this.renderRecommendedBy()}
                        {this.renderComments()}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer
    };
};

export default connect(mapStores)(DetailGemScreen);
