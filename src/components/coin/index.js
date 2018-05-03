import React from 'react';
import './style.scss';
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {fetchCoins} from "../../store/actions";
import PagePreLoader from '../page-pre-loader';
import PerfectScrollbar from 'react-perfect-scrollbar';
import CurrencyFormat from 'react-currency-format';

class Coin extends React.PureComponent {

    componentWillMount() {

        const {fetchCoins, coins} = this.props,
            {id} = this.props['match']['params'];

        if (!coins[id.toString()]) {
            fetchCoins();
        }

    }

    render() {

        const {pageLoader} = this.props,
            {id} = this.props['match']['params'],
            coin = this.props['coins'][id];

        return (
            <div className="coin">

                {
                    pageLoader &&
                    <PagePreLoader/>
                }

                {
                    !pageLoader &&
                    <PerfectScrollbar suppressScrollX={true}>

                        <div className="coin__wrap">

                            <h1 className="coin__title">{coin['name']} ({coin['symbol']})</h1>

                            <dl className="coin__item">
                                <dt>Price:</dt>
                                <dd>
                                    <CurrencyFormat value={coin['quotes']['USD']['price']} displayType={'text'} thousandSeparator={true}
                                                    prefix={'$'}/>
                                </dd>
                            </dl>

                            <dl className="coin__item">
                                <dt>Market Cap:</dt>
                                <dd>
                                    <CurrencyFormat value={coin['quotes']['USD']['market_cap']} displayType={'text'} thousandSeparator={true}
                                                    prefix={'$'}/>
                                </dd>
                            </dl>

                            <dl className="coin__item">
                                <dt>Volume (24h):</dt>
                                <dd>
                                    <CurrencyFormat value={coin['quotes']['USD']['volume_24h']} displayType={'text'} thousandSeparator={true}
                                                    prefix={'$'}/>
                                </dd>
                            </dl>

                            <dl className="coin__item">
                                <dt>Circulating Supply:</dt>
                                <dd>
                                    <CurrencyFormat value={coin['circulating_supply']} displayType={'text'} thousandSeparator={true}
                                                    suffix={' BTC'}/>
                                </dd>
                            </dl>

                            <dl className="coin__item">
                                <dt>Change (24h):</dt>
                                <dd>
                                    <CurrencyFormat value={coin['quotes']['USD']['percent_change_24h']} displayType={'text'} thousandSeparator={true}
                                                    suffix={'%'}/>
                                </dd>
                            </dl>

                        </div>

                    </PerfectScrollbar>
                }

            </div>
        );

    }

}

const putStateToProps = (state) => {
    return {
        pageLoader: state['pageLoader'],
        coins: state['coins']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        fetchCoins: bindActionCreators(fetchCoins, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(Coin);
