import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {changeAuthorized, changeUser, changeViewSize} from '../../store/actions';
import MainPreLoader from '../main-pre-loader';
import './style.scss';
import Auth from '../auth';
import Main from '../main';
import DropDown from '../drop-down';
import firebase from '../../firebase';
import {BrowserRouter as Router} from "react-router-dom";

class App extends React.PureComponent {

    componentWillMount() {

        this.checkViewSize();

        this.subscribeWindowResize();

        this.subscribeFireBaseAuth();

    }

    render() {

        const {authorized, dropDownId} = this.props;

        let body = null;

        switch (authorized) {
            case 0:
                body = <Auth/>;
                break;
            case 1:
                body = <Main/>;
                break;
            default:
                body = <MainPreLoader/>;
                break;
        }

        return (
            <Router>

                <div className="app">

                    {body}

                    {dropDownId &&
                    <DropDown/>}

                </div>

            </Router>
        );
    }


    checkViewSize() {

        const wW = window.outerWidth,
            {changeViewSize, viewSize} = this.props;

        if (wW < 1200) {

            if (viewSize !== 0) changeViewSize(0);


        } else {

            if (viewSize !== 1) changeViewSize(1);

        }

    }

    subscribeFireBaseAuth() {

        const self = this,
            {changeAuthorized, changeUser} = self.props;


        firebase.auth().onAuthStateChanged(function (user) {

            if (user) {

                const providerData = user['providerData'][0];

                changeUser({
                    displayName: providerData['displayName'] || '',
                    email: providerData['email'] || '',
                    phoneNumber: providerData['phoneNumber'] || '',
                    photoURL: providerData['photoURL'] || '',
                    providerId: providerData['providerId'] || '',
                    uid: providerData['uid'] || ''
                });

                changeAuthorized(1);


            } else {

                changeAuthorized(0);

            }
        });

    }

    subscribeWindowResize() {

        window.addEventListener('resize', () => {
            this.checkViewSize();
        });

    }


}

const putStateToProps = (state) => {
    return {
        authorized: state['authorized'],
        viewSize: state['viewSize'],
        dropDownId: state['dropDown']['id']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeAuthorized: bindActionCreators(changeAuthorized, dispatch),
        changeUser: bindActionCreators(changeUser, dispatch),
        changeViewSize: bindActionCreators(changeViewSize, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(App);
