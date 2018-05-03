import React from 'react';
import Logo from '../logo';
import {IconGooglePlus} from '../../icons';
import './style.scss';
import firebase from '../../firebase';

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

                    </div>

                </div>

            </div>
        );

    }

    authWithGoogle = () => {

        const provider = new firebase.auth.GoogleAuthProvider();

        provider.addScope('https://www.googleapis.com/auth/contacts.readonly');


        firebase.auth().signInWithPopup(provider);

    }

}

export default Auth;