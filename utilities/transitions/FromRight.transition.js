import {Dimensions} from 'react-native';

export const FromRight = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [.8, 1, 1],
    });

    const translateX = position.interpolate({
        inputRange: inputRange,
        outputRange: [-Dimensions.get('window').width, 0, 0]
    });

    return {
        opacity,
        transform: [
            {translateX}
        ]
    };
};
