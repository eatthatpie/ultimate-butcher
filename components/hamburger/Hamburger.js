import React from 'react';
import PropTypes from 'prop-types';
import './Hamburger.scss';

class Hamburger extends React.Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.handleClick(!this.props.isOpen);
    }

    render() {
        return (
            <div 
                className={
                    'hamburger' + (this.props.isOpen ? ' is-open' : '')
                }
                onClick={this.handleClick}
            >
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />

                <span className="line" />
                <span className="line" />
            </div>
        );
    }
}

Hamburger.propTypes = {
    handleClick: PropTypes.func,
    isOpen: PropTypes.bool
};

export default Hamburger;