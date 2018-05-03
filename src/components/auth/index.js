import React from 'react';
import Logo from '../logo';
import {IconGooglePlus} from '../../icons';
import './style.scss';
import firebase from '../../firebase';
import { changeUser} from "../../store/actions";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";

class Auth extends React.PureComponent {

    render() {
        return (
            <div className="auth">

                <div className="auth__wrap">

                    <Logo/>

                    <div className="auth__with-social">

                        <p>Sign in with</p>

                        <button className="auth__btn" onClick={this.authWithGoogle}>

                            <IconGooglePlus/>

                        </button>

                        <button className="auth__guest" onClick={this.authAsGuest}>

                            <i className="material-icons">child_care</i>
                            <span>Guest</span>
                        </button>

                    </div>

                </div>

            </div>
        );

    }

    authAsGuest = () => {

        const {changeUser} = this.props;

        changeUser({
            displayName: 'Guest',
            email: '',
            phoneNumber: '',
            photoURL: '',
            providerId: 'guest',
            uid: 'guest'
        });


    };

    authWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');

        firebase.auth().signInWithPopup(provider);

    };

}

const putStateToProps = (state) => {
    return {
        authorized: state['authorized']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeUser: bindActionCreators(changeUser, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(Auth);