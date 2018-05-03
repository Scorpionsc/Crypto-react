import fetch from 'cross-fetch'

export const ACTION_CHANGE_AUTHORIZED = 'ACTION_CHANGE_AUTHORIZED';
export const ACTION_CHANGE_DROP_DOWN = 'ACTION_CHANGE_DROP_DOWN';
export const ACTION_CHANGE_MENU_OPENED = 'ACTION_CHANGE_MENU_OPENED';
export const ACTION_CHANGE_USER = 'ACTION_CHANGE_USER';
export const ACTION_CHANGE_VIEW_SIZE = 'ACTION_CHANGE_VIEW_SIZE';
export const COINS_ERROR = 'COINS_ERROR';
export const COINS_RECEIVE = 'COINS_RECEIVE';
export const MARKET_INFO_ERROR = 'MARKET_INFO_ERROR';
export const MARKET_INFO_RECEIVE = 'MARKET_INFO_RECEIVE';
export const PAGE_REQUESTED = 'PAGE_REQUESTED';

export const changeAuthorized = (authState) => {
    return {
        type: ACTION_CHANGE_AUTHORIZED,
        payload: authState
    }
};

export const changeDropDown = (newDropDown) => {
    return {
        type: ACTION_CHANGE_DROP_DOWN,
        payload: newDropDown
    }
};

export const changeMenuOpened = (menuStatus) => {

    return {
        type: ACTION_CHANGE_MENU_OPENED,
        payload: menuStatus
    }

};

export const changeUser = (newUser) => {
    return {
        type: ACTION_CHANGE_USER,
        payload: newUser
    }
};

export const changeViewSize = (newViewSize) => {
    return {
        type: ACTION_CHANGE_VIEW_SIZE,
        payload: newViewSize
    }
};

export const fetchCoins = () => {
    return dispatch => {

        dispatch({
            type: PAGE_REQUESTED
        });


        return fetch('https://api.coinmarketcap.com/v2/ticker/')
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => {
                dispatch({
                    type: COINS_RECEIVE,
                    payload: json
                });
            })
            .catch( error => {
                dispatch({
                    type: COINS_ERROR,
                    payload: error
                });
            } )
    }
};

export const fetchMarketInfo = () => {
    return dispatch => {

        dispatch({
            type: PAGE_REQUESTED
        });

        return fetch('https://api.coinmarketcap.com/v2/global/')
            .then(
                response => response.json(),
                error => console.log('An error occurred.', error)
            )
            .then(json => {
                dispatch({
                    type: MARKET_INFO_RECEIVE,
                    payload: json
                });
            })
            .catch( error => {
                dispatch({
                    type: MARKET_INFO_ERROR,
                    payload: error
                });
            } )
    }
};


