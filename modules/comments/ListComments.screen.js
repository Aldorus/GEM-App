import React from 'react';
import {connect} from 'react-redux';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Dimensions, StyleSheet, Text, TextInput, TouchableHighlight, View} from 'react-native';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import {createComments, getAllCom} from './comment.service';
import CommentElement from './CommentElement.component';
import GradientBackground from '../../components/GradientBackground';
import Colors from '../../constants/Colors';
import {copyObject} from '../../utilities/extends/object.utils';
import {getAllUsers} from '../auth/users.service';
import {ADD_COMMENT, LOAD_COMMENT_SUCCESS} from '../../constants/ActionTypes';

const styles = StyleSheet.create({
    scroll: {
        flex: 1,
        alignSelf: 'stretch'
    },
    container: {
        flex: 1,
        alignSelf: 'stretch'
    },
    wrapperInput: {
        flexDirection: 'row',
        paddingLeft: 15,
        paddingRight: 25,
        paddingTop: 8,
        paddingBottom: 8,
        alignItems: 'center'
    },
    input: {
        borderRadius: 20,
        flex: 1,
        paddingLeft: 20,
        height: 40,
        paddingTop: 10,
        marginRight: 15,
        alignSelf: 'stretch',
        fontFamily: 'celia',
        alignItems: 'center',
        backgroundColor: 'white'
    }
});

export class ListCommentsScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'List Comments',
        hasHistory: true,
        titleState: ' ',
        bottom: false
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            gem: props.navigation.state.params.gem,
            loading: false
        };
    }

    callForLoadComments = () => {
        getAllCom(this.state.gem).then((comments) => {
            this.props.dispatch({
                type: LOAD_COMMENT_SUCCESS,
                comment: comments
            });
            this.setState({
                loading: false
            });
        });
    };

    refreshList = () => {
        this.setState({
            loading: true
        });
        this.callForLoadComments();
    };

    componentDidMount = () => {
        getAllUsers().then((users) => {
            this.setState({users});
        });
    };

    sendComment = () => {
        if (this.state.comment) {
            const message = this.state.comment;
            this.setState({
                comment: ''
            });
            createComments(this.state.gem, message).then((comment) => {
                const copyComment = copyObject(comment);
                copyComment.user = this.props.userStore;
                this.props.dispatch({
                    type: ADD_COMMENT,
                    comment: copyComment
                });
            });
        }
    };

    renderRowView = (rowData) => {
        const rowDataWithUser = copyObject(rowData);
        rowDataWithUser.user = this.state.users.find((user) => {
            return rowDataWithUser.user_id === user.id;
        });
        return <CommentElement comment={rowDataWithUser} displayAvatar={true}/>;
    };

    render() {
        console.log('render');
        return super.render(
            <KeyboardAwareScrollView style={styles.scroll}>
                <View style={styles.container}>
                    {this.state.users ? <ListView data={this.props.commentStore}
                              loading={this.state.loading}
                              onRefresh={this.refreshList}
                              style={{
                                  listContent: {
                                      height: Dimensions.get('window').height - 126,
                                      backgroundColor: 'white'
                                  }
                              }}
                              renderRow={this.renderRowView}/> : null}
                    <GradientBackground style={styles.wrapperInput}>
                        <TextInput placeholder={'Add a comment'}
                                   style={styles.input}
                                   onChangeText={(comment) => this.setState({comment})}
                                   value={this.state.comment}
                                   multiline={true}
                                   placeholderTextColor="black"
                                   underlineColorAndroid="transparent"/>
                        <TouchableHighlight underlayColor={Colors.tintColor}
                                            onPress={this.sendComment}>
                            <Text>Send</Text>
                        </TouchableHighlight>
                    </GradientBackground>
                </View>
            </KeyboardAwareScrollView>, true);
    }
}

const mapStores = (store) => {
    return {
        userStore: store.userReducer,
        commentStore: store.commentReducer
    };
};

export default connect(mapStores)(ListCommentsScreen);
