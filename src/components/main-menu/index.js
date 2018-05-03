import React from 'react';
import './style.scss';
import 'react-perfect-scrollbar/dist/css/styles.css';
import PerfectScrollbar from 'react-perfect-scrollbar'
import {menuConfig} from "../../config";
import {Link} from "react-router-dom";

class MainMenu extends React.PureComponent {

    menuItems = menuConfig['items'];

    render() {

        const items = this.getLinksFromConfig();

        return (
            <div className="main-menu">

                <PerfectScrollbar suppressScrollX={true}>

                    {items}

                </PerfectScrollbar>

            </div>
        );

    }

    getLinksFromConfig() {

        return this.menuItems.map(item => {

            return (
                <Link key={item['route']} to={item['route']} className="main-menu__link" onClick={this.hide}>
                    <i className="material-icons">{item['icon']}</i>
                    <span>{item['title']}</span>
                </Link>
            );

        });

    }

}


export default MainMenu;
