import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import {ListView} from '@shoutem/ui';
import ProgressBar from 'react-native-progress/Circle';
import {connect} from 'react-redux';
import AbstractGemScreen from '../../AbstractGem.screen';
import StyledText from '../../components/StyledText';
import Colors from '../../constants/Colors';
import FeedElementComponent from './components/FeedElement.component';
import CommentElement from '../comments/CommentElement.component';
import {copyObject} from '../../utilities/extends/object.utils';
import {getAllUsers} from '../auth/users.service';
import {getAllCom} from '../comments/comment.service';

const styles = StyleSheet.create({
    scroll: {
        alignSelf: 'stretch',
        paddingBottom: 30,
        backgroundColor: 'white'
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
            gem: props.navigation.state.params.gem,
            comments: []
        };
    }

    componentDidMount = () => {
        getAllUsers().then((users) => {
            this.setState({users});
            getAllCom(this.state.gem).then((comments) => {
                this.setState({comments: comments.slice(-3)});
            });
        });
    };

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
        this.props.navigation.navigate('ListComments', {
            gem: this.state.gem
        });
    };

    renderRowView = (rowData) => {
        const rowDataWithUser = copyObject(rowData);
        rowDataWithUser.user = this.state.users.find((user) => {
            return rowDataWithUser.user_id === user.id;
        });
        console.log('row data', rowDataWithUser);
        return <CommentElement comment={rowDataWithUser}/>;
    };

    renderComments = () => {
        if (!this.state.gem.comments) {
            return <View>
                <ListView data={this.state.comments}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>
                <TouchableHighlight underlayColor={Colors.tintColor} onPress={this.goOnComments}>
                    <View>
                        <StyledText style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>Add comments</StyledText>
                    </View>
                </TouchableHighlight>
            </View>;
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
                                 source={{uri: this.state.gem.picture_url}}/>
                    <View style={{margin: 10}}>
                        <FeedElementComponent
                            gemData={this.state.gem}
                            underlayColor="transparent"
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
