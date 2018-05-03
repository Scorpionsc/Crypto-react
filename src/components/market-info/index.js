import React from 'react';
import './style.scss';
import {fetchMarketInfo} from "../../store/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import PagePreLoader from "../page-pre-loader";
import PerfectScrollbar from 'react-perfect-scrollbar'
import CurrencyFormat from 'react-currency-format';

class MarketInfo extends React.PureComponent {

    componentWillMount() {
        const {fetchMarketInfo} = this.props;

        fetchMarketInfo();

    }

    render() {


        const {pageLoader,marketInfo} = this.props;

        return (
            <div className="market-info">

                {
                    pageLoader &&
                    <PagePreLoader/>
                }

                {

                    (!pageLoader && marketInfo) &&

                    <PerfectScrollbar suppressScrollX={true}>

                        <div className="market-info__wrap">

                            <h1 className="market-info__title">
                                Cryptocurrency Market Capitalizations
                            </h1>

                            <dl className="market-info__item">
                                <dt>Total Market Cap:</dt>
                                <dd>
                                    <CurrencyFormat value={marketInfo['quotes']['USD']['total_market_cap']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </dd>
                            </dl>
                            <dl className="market-info__item">
                                <dt>24h Vol:</dt>
                                <dd>
                                    <CurrencyFormat value={marketInfo['quotes']['USD']['total_volume_24h']} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                                </dd>
                            </dl>
                            <dl className="market-info__item">
                                <dt>BTC Dominance:</dt>
                                <dd>
                                    <CurrencyFormat value={marketInfo['bitcoin_percentage_of_market_cap']} displayType={'text'} thousandSeparator={true} suffix={'%'} />
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
        marketInfo: state['marketInfo']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        fetchMarketInfo: bindActionCreators(fetchMarketInfo, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(MarketInfo);
