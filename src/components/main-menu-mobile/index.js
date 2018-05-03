import React from 'react';
import './style.scss';
import Avatar from "../avatar";
import {menuConfig} from "../../config";
import {Link} from "react-router-dom";
import {changeMenuOpened} from "../../store/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class MainMenuMobile extends React.PureComponent {

    menuItems = menuConfig['items'];

    render() {

        const items = this.getLinksFromConfig();


        return (
            <div className="main-menu-mobile">

                <header className="main-menu-mobile__header">

                    <Avatar/>

                </header>

                <div className="main-menu-mobile__body">

                    {items}

                </div>


            </div>
        );

    }

    getLinksFromConfig() {

        return this.menuItems.map(item => {

            return (
                <Link key={item['route']} to={item['route']} className="main-menu-mobile__link" onClick={this.hide}>
                    <i className="material-icons">{item['icon']}</i>
                    <span>{item['title']}</span>
                </Link>
            );

        });

    }

    hide = () => {

        const {changeMenuOpened} = this.props;

        changeMenuOpened(false);

    }

}

const putStateToProps = () => {
    return {}
};

const putActionsToProps = (dispatch) => {
    return {
        changeMenuOpened: bindActionCreators(changeMenuOpened, dispatch)
    }
};


export default connect(putStateToProps, putActionsToProps)(MainMenuMobile);

