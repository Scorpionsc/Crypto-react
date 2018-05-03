import React from 'react';
import './style.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {fetchCoins} from "../../store/actions";
import PagePreLoader from '../page-pre-loader'
import CoinsTableRow from "../coins-table-row";
import {Link} from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'

class CoinsTable extends React.PureComponent {

    componentWillMount() {

        const {fetchCoins, coins} = this.props;

        if ((Object.keys(coins).length === 0 && coins.constructor === Object)) {

            fetchCoins();

        }

    }

    render() {

        const {pageLoader, coins} = this.props,
            rows = this.getRows(coins);

        return (
            <div className="coins-table">

                {
                    pageLoader &&
                    <PagePreLoader/>
                }

                {
                    !pageLoader &&
                    <PerfectScrollbar suppressScrollX={true}>

                        <div className="coins-table__wrap">

                            <div className="coins-table__header">

                                <div className="coins-table__header-name">Name</div>
                                <div className="coins-table__header-cap">Market Cap</div>
                                <div className="coins-table__header-price">Price</div>
                                <div className="coins-table__header-volume">Volume (24h)</div>
                                <div className="coins-table__header-supply">Circulating Supply</div>
                                <div className="coins-table__header-change">Change (24h)</div>

                            </div>

                            {rows}

                        </div>

                    </PerfectScrollbar>
                }

            </div>
        );

    }

    getRows(coins) {

        let coinsRow = [];

        for (let coinId in coins) {

            coinsRow.push(
                <Link key={coinId} to={`/coins/${coinId}`} className="coins-table__link" onClick={this.hide}>
                    <CoinsTableRow coinData={coins[coinId]}/>
                </Link>
            );

        }

        return coinsRow;

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

export default connect(putStateToProps, putActionsToProps)(CoinsTable);


