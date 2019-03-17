import { createStore } from 'redux';

const initialState = {
    overlay: {
        isOpen: false,
    },
    modal: {
        isOpen: false,
        bodyHtml: ``
    }
};

export const actionTypes = {
    OPEN_MODAL: 'OPEN_MODAL',
    CLOSE_MODAL: 'CLOSE_MODAL'
};

export const reducer = (state = initialState, action) => {
    switch (action.type) {
    case actionTypes.OPEN_MODAL:
        return Object.assign({}, state, {
            overlay: {
                isOpen: true
            },
            modal: {
                isOpen: true,
                bodyHtml: action.bodyHtml
            }
        });
    case actionTypes.CLOSE_MODAL:
        return Object.assign({}, state, {
            overlay: {
                isOpen: false
            },
            modal: {
                isOpen: false,
                bodyHtml: ``
            }
        });
    }
};

export const actionModalOpen = bodyHtml => {
    return {
        type: actionTypes.OPEN_MODAL,
        bodyHtml: bodyHtml
    };
};

export const actionModalClose = () => {
    return {
        type: actionTypes.CLOSE_MODAL
    };
};

export const store = createStore(reducer, initialState);