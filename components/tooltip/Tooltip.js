import React from 'react';
import PropTypes from 'prop-types';
import './Tooltip.scss';

class Tooltip extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="tooltip">
                <span>{this.props.text}</span>
            </div>
        );
    }
}

Tooltip.propTypes = {
    text: PropTypes.string
};

export default Tooltip;