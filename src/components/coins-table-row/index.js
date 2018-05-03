import React from 'react';
import './style.scss';
import CurrencyFormat from 'react-currency-format';


class CoinsTableRow extends React.PureComponent {

    render() {

        const {coinData} = this.props;

        return (
            <div className="coins-table-row" title={coinData['symbol']}>

                <div className="coins-table-row__name">{coinData['name']}</div>
                <div className="coins-table-row__cap">
                    <CurrencyFormat value={coinData['quotes']['USD']['market_cap']} displayType={'text'} thousandSeparator={true}
                                    prefix={'$'}/>
                </div>
                <div className="coins-table-row__price">
                    <CurrencyFormat value={coinData['quotes']['USD']['price']} displayType={'text'} thousandSeparator={true}
                                    prefix={'$'}/>
                </div>
                <div className="coins-table-row__volume">
                    <CurrencyFormat value={coinData['quotes']['USD']['volume_24h']} displayType={'text'} thousandSeparator={true}
                                    prefix={'$'}/>
                </div>
                <div className="coins-table-row__supply">
                    <CurrencyFormat value={coinData['circulating_supply']} displayType={'text'} thousandSeparator={true}
                                    suffix={' BTC'}/>
                </div>
                <div className="coins-table-row__change">
                    <CurrencyFormat value={coinData['quotes']['USD']['percent_change_24h']} displayType={'text'} thousandSeparator={true}
                                    suffix={'%'}/>
                </div>

            </div>
        );

    }

}


export default CoinsTableRow;
