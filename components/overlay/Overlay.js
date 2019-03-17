import React from 'react';
import PropTypes from 'prop-types';
import './Overlay.scss';

class Overlay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={`overlay ${this.props.isOpen ? 'is-open' : ''}`}  />
        );
    }
}

Overlay.propTypes = {
    isOpen: PropTypes.bool,
};

export default Overlay;