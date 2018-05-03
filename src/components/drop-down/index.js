import React from 'react';
import './style.scss';
import {connect} from "react-redux";
import ReactDOM from 'react-dom';
import {bindActionCreators} from "redux";
import {changeDropDown} from "../../store/actions";


class DropDown extends React.PureComponent {

    state = {
        pos: {
            top: 0,
            left: 0
        }
    };


    componentDidMount() {

        const {dropDown} = this.props;

        this.calculatePosition(dropDown['parentRect']);

        this.subscribeWindowClick();

    }


    render() {

        const {dropDown} = this.props;

        return (
            <div className="drop-down" style={this.state['pos']}>

                {dropDown['list']}

            </div>
        );

    }


    calculatePosition(parentRect) {

        const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();

        let pos = {
            left: parentRect['left'],
            top: parentRect['bottom']
        };

        if (parentRect['left'] + rect['width'] > window.outerWidth) {
            pos['left'] = parentRect['right'] - rect['width'];
        }

        if (parentRect['bottom'] + rect['height'] > window.outerHeight) {
            pos['top'] = parentRect['top'] - rect['height'];
        }

        this.setState({pos: pos});
    }

    checkTarget(target, element) {

        if (target === element) {

            return true;

        } else {

            if (target.parentNode) {

                return this.checkTarget(target.parentNode, element);

            } else {

                return false;

            }

        }

    }

    subscribeWindowClick() {

        const {changeDropDown} = this.props,
        parent = ReactDOM.findDOMNode(this);

        document.addEventListener('click', (e) => {

            if( !this.checkTarget(e.target, parent) ){
                changeDropDown({
                    list: null,
                    id: null,
                    parentRect: {},
                    event: null
                });
            }

        }, {once: true})

    }

}

const putStateToProps = (state) => {
    return {
        dropDown: state['dropDown']
    }
};

const putActionsToProps = (dispatch) => {
    return {
        changeDropDown: bindActionCreators(changeDropDown, dispatch)
    }
};

export default connect(putStateToProps, putActionsToProps)(DropDown);
