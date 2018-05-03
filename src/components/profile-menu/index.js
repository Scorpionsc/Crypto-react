import React from 'react';
import './style.scss';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {changeDropDown} from "../../store/actions";
import ReactDOM from 'react-dom';
import firebase from '../../firebase';


class ProfileMenu extends React.PureComponent {

    constructor() {
        super();

        this.menuItems = [
            {
                text: 'Log Out',
                id: 1
            }
        ];

        this.id = this.guid();

        this.rect = null;

    }

    componentDidMount() {

        this.rect = ReactDOM.findDOMNode(this);

    }

    render() {

        return (
            <button className="profile-menu" onClick={this.openMenu}>

                <i className="material-icons">more_vert</i>

            </button>
        );

    }


    getMenuItems() {

        return this.menuItems.map(item => {
            return <div onClick={()=>{this.menuClicked(item['id'])}} className="profile-menu-item" key={item['id'].toString()}>{item['text']}</div>;
        });


    }

    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }

        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }


    openMenu = () => {

        const {changeDropDown} = this.props;

        changeDropDown({
            list: this.getMenuItems(),
            id: this.id,
            parentRect: this.rect.getBoundingClientRect(),
            event: null
        });

    };

    menuClicked = (id)=>{

        const {changeDropDown}=this.props;

        if( id === 1 ){
            firebase.auth().signOut();
        }

        changeDropDown({
            list: null,
            id: null,
            parentRect: {},
            event: null
        });

    };

}

const putStateToProps = (state) => {
    return {
        dropDownEvent: state['dropDown']['event']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeDropDown: bindActionCreators(changeDropDown, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(ProfileMenu);
