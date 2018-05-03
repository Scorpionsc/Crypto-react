import React from 'react';
import './style.scss';
import {connect} from "react-redux";

class Avatar extends React.PureComponent {

    render() {

        const {user,viewSize} = this.props;

        return (
            <div className="avatar">

                {
                    user['photoURL'] !== '' &&
                    <img src={user['photoURL']} alt={user['displayName']}/>
                }

                {
                    viewSize === 0 &&
                    <span className="avatar__title">{user['displayName']}</span>
                }

            </div>
        );

    }

}

const putStateToProps = (state) => {
    return {
        viewSize: state['viewSize'],
        user: state['user']
    }
};

export default connect(putStateToProps)(Avatar);
