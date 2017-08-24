import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ImageLoader from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Circle';
import {StyleSheet, View} from 'react-native';
import GradientBackground from '../../components/GradientBackground';
import {ListView} from '@shoutem/ui';
import AbstractGemScreen from '../../AbstractGem.screen';
import StyledText from '../../components/StyledText';
import listGems from '../gem/gem.json';
import Colors from '../../constants/Colors';
import FeedElementComponent from '../gem/components/FeedElement.component';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'stretch',
        backgroundColor: '#fff'
    },
    gradient: {
        alignSelf: 'stretch',
        alignItems: 'center',
        paddingBottom: 20
    },
    avatar: {
        width: 80,
        height: 80,
        paddingTop: 50,
        marginBottom: 10
    }
});

export class DetailFriendScreen extends AbstractGemScreen {
    navigationOptions = {
        stateName: 'addFriend',
        hasHistory: true,
        titleState: ' '
    };

    static propTypes = {
        navigation: PropTypes.any.isRequired
    };

    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        if (props.navigation.state && props.navigation.state.params && props.navigation.state.params.user) {
            this.state = {
                user: props.navigation.state.params.user
            };
            this.state.user.listGems = listGems;
        }
    }

    clickOnGem = (gem) => {
        this.props.navigation.navigate(
            'DetailGem',
            {gem}
        );
    };

    renderRowView = (rowData) => {
        return <FeedElementComponent gemData={rowData}
                                     onClick={this.clickOnGem}
                                     displayWithImage={false}/>;
    };

    renderListGem = () => {
        return <ListView data={this.state.user.listGems}
                         style={{listContent: {backgroundColor: 'transparent'}}}
                         renderRow={this.renderRowView}/>;
    };

    render() {
        return super.render(
            <View style={styles.container}>
                <GradientBackground style={styles.gradient}>
                    <ImageLoader borderRadius={40}
                                 style={styles.avatar}
                                 indicator={ProgressBar}
                                 indicatorProps={{
                                     color: Colors.colorText
                                 }}
                                 source={{uri: this.state.user.avatar_url}}/>
                    <StyledText>
                        {this.state.user.first_name} {this.state.user.last_name}
                    </StyledText>
                </GradientBackground>
                {this.renderListGem()}
            </View>, true);
    }
}

const mapStores = () => {
    return {};
};

export default connect(mapStores)(DetailFriendScreen);
