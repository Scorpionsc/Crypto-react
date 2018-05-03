import React from 'react';
import {connect} from "react-redux";
import {IconLogo} from "../../icons";
import Avatar from "../avatar";
import ProfileMenu from "../profile-menu";
import './style.scss'
import MainMenu from "../main-menu";
import MainMenuMobile from "../main-menu-mobile";
import {bindActionCreators} from "redux";
import {changeMenuOpened} from "../../store/actions";
import { Route} from "react-router-dom";
import MarketInfo from "../market-info";
import CoinsTable from "../coins-table";
import Coin from "../coin";
import { withRouter } from 'react-router-dom'

class Main extends React.PureComponent {

    render() {

        const {viewSize, menuOpened} = this.props;

        return (
            <div className={`main${(menuOpened) ? ' opened' : ''}`}>

                <header className="main__header">

                    {
                        viewSize === 0 &&
                        <button className="main__menu-btn" onClick={this.openMobileMenu}>

                            <i className="material-icons">menu</i>

                        </button>
                    }

                    {
                        viewSize === 1 &&
                        <div className="main__logo">

                            <IconLogo/>

                        </div>
                    }

                    <div className="main__header-wrap">

                        {
                            viewSize === 1 &&
                            <div className="main__avatar">

                                <Avatar/>

                            </div>
                        }

                        <div className="main__profile-menu">

                            <ProfileMenu/>

                        </div>

                    </div>


                </header>

                <aside className="main__aside">

                    {

                        (viewSize === 0) &&
                        <MainMenuMobile/>
                    }

                    {
                        viewSize === 1 &&
                        <MainMenu/>
                    }

                </aside>


                    <div className="main__content">


                        <Route exact path="/" component={MarketInfo}/>

                        <Route exact path="/coins" component={CoinsTable}/>

                        <Route exact path="/coins/:id" component={Coin}/>


                    </div>


            </div>
        );

    }

    openMobileMenu = () => {

        const {changeMenuOpened, menuOpened} = this.props;

        changeMenuOpened(!menuOpened);

    }

}

const putStateToProps = (state) => {
    return {
        viewSize: state['viewSize'],
        menuOpened: state['menuOpened']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeMenuOpened: bindActionCreators(changeMenuOpened, dispatch)
    }
};
export default withRouter(connect(putStateToProps, putActionsToProps)(Main));
