import React from 'react';
import {connect} from 'react-redux';
import {Image, StyleSheet, TouchableHighlight, View} from 'react-native';
import StyledText from '../../../components/StyledText';
import BoldText from '../../../components/BoldText';
import {DropDownMenu} from '@shoutem/ui';
import Colors from '../../../constants/Colors';
import * as types from '../../../constants/ActionTypes';
import close from '../../../assets/icons/close.png';
import GradientBackground from '../../../components/GradientBackground';
import StyledButton from '../../../components/StyledButton';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        padding: 20,
        paddingTop: 28,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 300,
        backgroundColor: 'transparent'
    },
    padding: {
        marginTop: 30,
        marginBottom: 5
    },
    button: {
        backgroundColor: 'white'
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
        label: 'Restaurant'
    },
    {
        label: 'Book'
    },
    {
        label: 'Place'
    },
    {
        label: 'Show'
    },
    {
        label: 'Event'
    },
    {
        label: 'Other'
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
        label: 'List'
    },
    {
        action: types.DISPLAY_LIST_WITH_IMAGE,
        label: 'Pics'
    }
];

export class TopSortAndFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectCategory: this.getSelectedFilter(),
            selectSorting: this.props.userStore.sortingFilter || listSorting[0],
            selectDisplay: this.props.userStore.displayListWithImage ? listDisplay[1] : listDisplay[0]
        };
    }

    getSelectedFilter = () => {
        if (this.props.userStore.categoryFilter) {
            return listCategories.find((category) => {
                return category.label.toLowerCase() === this.props.userStore.categoryFilter.toLowerCase();
            });
        }
        return listCategories[0];
    };

    selectStyles = {
        selectedOption: {
            backgroundColor: 'white',
            borderRadius: 20,
            flex: 1
        },
        modal: {
            backgroundColor: 'white'
        }
    };

    setFilterCategory = (category) => {
        this.setState({
            selectCategory: category
        });
        this.props.dispatch({
            type: types.CATEGORY_FILTER,
            category
        });
        this.onClose();
    };

    onClose = () => {
        if (this.props.onCloseContextualPanel) {
            this.props.onCloseContextualPanel();
        }
    };

    onDisplayStyleChange = (display) => {
        this.props.dispatch({
            type: display.action
        });
        this.setState({selectDisplay: display});
        this.onClose();
    };

    render() {
        return (
            <GradientBackground style={styles.container}>
                <TouchableHighlight underlayColor={Colors.tintColor}
                                    onPress={this.onClose}>
                    <Image source={close}/>
                </TouchableHighlight>
                <StyledText style={styles.padding}>Sort & Filter</StyledText>

                <BoldText style={styles.padding}>Show</BoldText>
                <View style={{alignSelf: 'stretch'}}>
                    <DropDownMenu
                        styleName="clear"
                        options={listCategories}
                        selectedOption={this.state.selectCategory ? this.state.selectCategory : listCategories[0]}
                        onOptionSelected={(category) => this.setFilterCategory(category)}
                        titleProperty="label"
                        valueProperty="label"
                        style={this.selectStyles}
                    />
                </View>


                <BoldText style={styles.padding}>Sort by (Soon)</BoldText>
                <View style={{alignSelf: 'stretch'}}>
                    <DropDownMenu
                        styleName="clear"
                        options={listSorting}
                        selectedOption={this.state.selectSorting ? this.state.selectSorting : listSorting[0]}
                        onOptionSelected={(sorting) => this.setState({selectSorting: sorting})}
                        titleProperty="label"
                        valueProperty="label"
                        style={[this.selectStyles, {opacity: 0.2}]}
                    />
                </View>

                <BoldText style={styles.padding}>View as</BoldText>
                <View style={{
                    flexDirection: 'row',
                    alignSelf: 'stretch',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {/*TODO Problem with text center*/}
                    <StyledButton onPress={() => this.onDisplayStyleChange(listDisplay[0])}
                                  style={{borderRadius: 20, flex: 1, marginRight: 5}}>
                        {listDisplay[0].label}
                    </StyledButton>
                    <StyledButton onPress={() => this.onDisplayStyleChange(listDisplay[1])}
                                  style={{borderRadius: 20, flex: 1, marginLeft: 5}}>
                        {listDisplay[1].label}
                    </StyledButton>
                </View>
            </GradientBackground>
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