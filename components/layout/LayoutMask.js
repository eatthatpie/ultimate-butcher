import React from 'react';
import { connect } from 'react-redux';
import Modal from '@/components/modal/Modal';
import Overlay from '@/components/overlay/Overlay';
import PropTypes from 'prop-types';

class LayoutMask extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="layout-mask">
                <Overlay isOpen={this.props.overlay.isOpen} />
                <Modal 
                    isOpen={this.props.modal.isOpen} 
                    bodyHtml={this.props.modal.bodyHtml} 
                />
            </div>
        );
    }
}

LayoutMask.propTypes = {
    modal: PropTypes.shape({
        isOpen: PropTypes.bool,
        bodyHtml: PropTypes.string
    }),
    overlay: PropTypes.shape({
        isOpen: PropTypes.bool
    })
};

function mapStateToProps(state) {
    const { modal, overlay } = state;

    return {
        modal: {
            isOpen: modal.isOpen,
            bodyHtml: modal.bodyHtml
        },
        overlay: {
            isOpen: overlay.isOpen
        }
    };
}
  
function mapDispatchToProps() {
    return {};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(LayoutMask);