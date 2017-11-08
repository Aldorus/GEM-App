import {Dimensions} from 'react-native';

export const FromTop = (index, position) => {
    const inputRange = [index - 1, index, index + 1];
    const opacity = position.interpolate({
        inputRange,
        outputRange: [0, 1, 1],
    });

    const translateY = position.interpolate({
        inputRange: inputRange,
        outputRange: [-Dimensions.get('window').height, 0, 0]
    });

    return {
        opacity,
        transform: [
            {translateY}
        ]
    };
};
