import React from 'react';
import App from '@/components/app/App';
import { Provider } from 'react-redux';
import { store } from '@/store';
import '@/assets/scss/app.scss';

store.dispatch({
    type: 'CLOSE_MODAL'
});

export default class PageIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="__view">
                <Provider store={store}>
                    <App />
                </Provider>
            </div>
        );
    }
}