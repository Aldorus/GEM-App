import React from 'react';
import {applyMiddleware, createStore} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createLogger} from 'redux-logger';
import rootReducer from './rootReducer';
import AppGem from './AppGem';

console.disableYellowBox = true;

const middleware = [thunk];

if (process.env.NODE_ENV !== 'production') {
    // middleware.push(createLogger());
}

const store = createStore(rootReducer,
    applyMiddleware(...middleware)
);


export default class AppContainer extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <AppGem/>
            </Provider>
        );
    }
}
