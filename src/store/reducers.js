import {
    ACTION_CHANGE_AUTHORIZED,
    ACTION_CHANGE_DROP_DOWN,
    ACTION_CHANGE_MENU_OPENED,
    ACTION_CHANGE_USER,
    ACTION_CHANGE_VIEW_SIZE,
    COINS_ERROR,
    COINS_RECEIVE,
    PAGE_REQUESTED,
    MARKET_INFO_RECEIVE,
    MARKET_INFO_ERROR
} from './actions';

const initialState = {
    authorized: 2, // 0 - unauthorized | 1 - authorized | 2 - main preLoader show
    user: {
        displayName: '',
        email: '',
        phoneNumber: '',
        photoURL: '',
        providerId: '',
        uid: ''
    },
    dropDown: {
        list: null,
        id: null,
        parentRect: {},
        event: null
    },
    menuOpened: false,
    viewSize: null, // 0 - mobile | 1 - desktop
    pageLoader: true,
    marketInfo: null,
    coins: {}
};

export const rootReducer = (state = initialState, action) => {

    switch (action.type) {
        case ACTION_CHANGE_AUTHORIZED:
            return {...state, authorized: action['payload']};
        case ACTION_CHANGE_DROP_DOWN:
            return {...state, dropDown: action['payload']};
        case ACTION_CHANGE_MENU_OPENED:
            return {...state, menuOpened: action['payload']};
        case ACTION_CHANGE_USER:
            return {...state, user: action['payload']};
        case ACTION_CHANGE_VIEW_SIZE:
            return {...state, viewSize: action['payload']};
        case COINS_ERROR:
            return state;
        case COINS_RECEIVE:
            return onCoinsReceived(action['payload'], state);
        case MARKET_INFO_RECEIVE:
            return onMarketInfoReceived(action['payload'], state);
        case MARKET_INFO_ERROR:
            return state;
        case PAGE_REQUESTED:
            return {...state, pageLoader: true};
        default:
            return state;
    }

};


const onCoinsReceived =(res, state)=>{

    let result = {...state, pageLoader: false};

    result = {...result, coins: res['data']};

    return result;

};

const onMarketInfoReceived = (res, state) => {

    let result = {...state, pageLoader: false};

    result = {...result, marketInfo: res['data']};

    return result;

};