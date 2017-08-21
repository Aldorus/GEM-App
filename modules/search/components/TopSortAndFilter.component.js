import React from 'react';
import {connect} from 'react-redux';
import {Image, StyleSheet, TouchableHighlight} from 'react-native';
import StyledText from '../../../components/StyledText';
import BoldText from '../../../components/BoldText';
import {DropDownMenu} from '@shoutem/ui'
import LinearGradient from 'expo/src/LinearGradient.android';
import Colors from '../../../constants/Colors';
import * as types from '../../../constants/ActionTypes';
import close from '../../../assets/icons/close.png';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 20,
        paddingTop: 30,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        backgroundColor: 'transparent'
    },
    padding: {
        marginTop: 30,
        marginBottom: 5
    }
});

const listCategories = [
    {
        label: 'All'
    },
    {
        label: 'Movie'
    },
    {
        label: 'Restaurants'
    },
    {
        label: 'Books'
    },
    {
        label: 'Places'
    },
    {
        label: 'Show'
    }
];

const listSorting = [
    {
        label: 'Most recent'
    },
    {
        label: 'Most gemmed'
    },
    {
        label: 'More friends interested'
    }
];

const listDisplay = [
    {
        action: types.DISPLAY_LIST_WITHOUT_IMAGE,
        label: 'Simple list'
    },
    {
        action: types.DISPLAY_LIST_WITH_IMAGE,
        label: 'List with picture'
    }
];

export class TopSortAndFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectCategory: listCategories[0],
            selectSorting: listSorting[0],
            selectDisplay: this.props.userStore.displayListWithImage ? listDisplay[1] : listDisplay[0]
        };
    }

    selectStyles = {
        selectedOption: {
            backgroundColor: 'white',
            borderRadius: 20,
            width: 300
        },
        modal: {
            backgroundColor: 'white'
        }
    };

    onClose = () => {
        if (this.props.onCloseContextualPanel) {
            this.props.onCloseContextualPanel();
        }
    };

    onDisplayStyleChange = (display) => {
        console.log('Display', display);
        this.props.dispatch({
            type: display.action
        });
        this.setState({selectDisplay: display});
        this.onClose();
    };

    render() {
        return (
            <LinearGradient colors={[Colors.gradientStart, Colors.gradientEnd]}
                            style={styles.container}
                            end={[1, 0]}>
                <TouchableHighlight underlayColor={Colors.tintColor}
                                    onPress={this.onClose}>
                    <Image source={close}/>
                </TouchableHighlight>
                <StyledText style={styles.padding}>Sort & Filter</StyledText>

                <BoldText style={styles.padding}>List display</BoldText>
                <DropDownMenu
                    styleName="clear"
                    options={listDisplay}
                    selectedOption={this.state.selectDisplay}
                    onOptionSelected={this.onDisplayStyleChange}
                    titleProperty="label"
                    valueProperty="label"
                    style={this.selectStyles}
                />

                <BoldText style={styles.padding}>Show</BoldText>
                <DropDownMenu
                    styleName="clear"
                    options={listCategories}
                    selectedOption={this.state.selectCategory ? this.state.selectCategory : listCategories[0]}
                    onOptionSelected={(category) => this.setState({selectCategory: category})}
                    titleProperty="label"
                    valueProperty="label"
                    style={this.selectStyles}
                />

                <BoldText style={styles.padding}>Sort by</BoldText>
                <DropDownMenu
                    styleName="clear"
                    options={listSorting}
                    selectedOption={this.state.selectSorting ? this.state.selectSorting : listSorting[0]}
                    onOptionSelected={(sorting) => this.setState({selectSorting: sorting})}
                    titleProperty="label"
                    valueProperty="label"
                    style={this.selectStyles}
                />
            </LinearGradient>
        );
    }
}

const mapStores = (store) => {
    return {
        gemStore: store.gemReducer,
        userStore: store.userReducer
    };
};

export default connect(mapStores)(TopSortAndFilter);