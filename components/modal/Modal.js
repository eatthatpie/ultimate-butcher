import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import { actionModalClose } from '@/store';
import './Modal.scss';

// @TODO(?): add auto-close after some time (if no user action is needed)
class Modal extends React.Component {
    constructor(props) {
        super(props);
    }

    handleClickOutside() {
        this.props.modalClose();
    }

    render() {
        return (
            <div className={`modal ${this.props.isOpen ? 'is-open' : ''}`}>
                <div className="modal-body fs-15 flex">
                    {this.props.bodyHtml}
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    isOpen: PropTypes.bool,
    bodyHtml: PropTypes.string,
    handleClose: PropTypes.func,
    children: PropTypes.object,
    modalClose: PropTypes.func
};

function mapStateToProps() {
    return {};
}
  
function mapDispatchToProps(dispatch) {
    return {
        modalClose: () => {
            dispatch(actionModalClose());
        }
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(onClickOutside(Modal));