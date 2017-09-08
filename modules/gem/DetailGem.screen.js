import React from 'react';
import {ScrollView, StyleSheet, TouchableHighlight, View} from 'react-native';
import ImageLoader from 'react-native-image-progress';
import {ListView} from '@shoutem/ui';
import {NavigationActions} from 'react-navigation'
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
import BoldText from '../../components/BoldText';
import * as types from '../../constants/ActionTypes';
import {createGem, deleteGem} from './services/gem.service';

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
    },
    actionButton: {
        alignSelf: 'stretch',
        alignItems: 'center',
        marginLeft: 20,
        marginRight: 20,
        borderRadius: 20,
        borderColor: '#000',
        borderWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        marginBottom: 20
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
                this.setState({comments: comments.slice(0, 3)});
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

    onDelete = () => {
        deleteGem(this.state.gem).then(() => {
            this.props.dispatch({
                type: types.DELETE_GEM,
                gem: this.state.gem
            });
            this.props.dispatch({
                type: types.DELETE_SAVED_GEM,
                saved: this.state.gem
            });
        });
        const backAction = NavigationActions.back();
        this.props.navigation.dispatch(backAction);
    };

    onSaveIt = () => {
        const gemToSave = {};
        gemToSave.picture = this.state.gem.picture_url;
        gemToSave.title = this.state.gem.item.name;
        gemToSave.unformatedCategory = this.state.gem.item.category;
        createGem(gemToSave, this.props.userStore).then((newGemResponse) => {
            this.props.dispatch({
                type: types.ADD_SAVED_GEM,
                saved: newGemResponse
            });
        });
        this.props.navigation.navigate('ListSave');
    };

    renderRowView = (rowData) => {
        const rowDataWithUser = copyObject(rowData);
        rowDataWithUser.user = this.state.users.find((user) => {
            return rowDataWithUser.user_id === user.id;
        });
        return <CommentElement comment={rowDataWithUser} displayAvatar={false}/>;
    };

    renderComments = () => {
        if (!this.state.gem.comments) {
            return <View>
                {this.state.gem.description ?
                    <StyledText style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10}}>
                        <BoldText>{this.state.gem.user.first_name}</BoldText> {this.state.gem.description}
                    </StyledText> : null
                }
                <TouchableHighlight underlayColor={Colors.tintColor} onPress={this.goOnComments}>
                    <View>
                        <StyledText
                            style={{paddingLeft: 15, paddingTop: 10, paddingBottom: 10, color: Colors.thirdColor}}>Add/See
                            comments</StyledText>
                    </View>
                </TouchableHighlight>
                <ListView data={this.state.comments}
                          style={{listContent: {backgroundColor: 'transparent'}}}
                          renderRow={this.renderRowView}/>
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
                    {this.props.userStore.id === this.state.gem.user.id ?
                        <TouchableHighlight underlayColor={Colors.tintColor}
                                            style={styles.actionButton}
                                            onPress={this.onDelete}><View>
                            <StyledText>Delete</StyledText></View>
                        </TouchableHighlight> :
                        <TouchableHighlight style={styles.actionButton}
                                            underlayColor={Colors.tintColor}
                                            onPress={this.onSaveIt}><View>
                            <StyledText>Save It</StyledText></View>
                        </TouchableHighlight>}
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
