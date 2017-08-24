import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import Sentry from 'sentry-expo';
import {Provider} from 'react-redux';
import {Platform} from 'react-native';
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import {Segment} from 'expo';
import rootReducer from './rootReducer';
import AppGemRedux from './AppGem';

console.disableYellowBox = true;

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger());
}

const store = createStore(rootReducer,
    applyMiddleware(...middleware)
);

Sentry.config('https://b0f8c76e6f42476d8fe761b73de4a800@sentry.io/204298').install();


export default class AppContainer extends React.Component {
    constructor(props) {
        super(props);
        if (Platform.OS === 'android') {
            Segment.initializeAndroid('dv31rXQlYGyoLIbAhsk9l4aheAsLarbT');
        } else {
            Segment.initializeIOS('85sM2EwiuAfwQhMRQ1yEmnhPpYuCbvQ1');
        }
        Segment.track('event:Application Opened');
    }

    render() {
        return (
            <Provider store={store}>
                <AppGemRedux/>
            </Provider>
        );
    }
}
