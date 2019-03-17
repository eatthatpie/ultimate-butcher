import React from 'react';
import { connect } from 'react-redux';
import Hamburger from '@/components/hamburger/Hamburger';
import PropTypes from 'prop-types';
import onClickOutside from 'react-onclickoutside';
import Tooltip from '@/components/tooltip/Tooltip';
import { actionModalOpen } from '@/store';
import './NavigationAside.scss';

class NavigationAside extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            isOpen: false,
            items: [
                {
                    iconClassName: 'icon-maximize', // @TODO(?): make it more flexible like renderIcon() => { return ... }
                    tooltipText: 'Selection tool'
                },
                {
                    iconClassName: 'icon-border_vertical',
                    tooltipText: 'Add vertical slice'
                },
                {
                    iconClassName: 'icon-border_horizontal',
                    tooltipText: 'Add horizontal slice'
                },
                {
                    iconClassName: 'icon-border_outer',
                    tooltipText: 'Merge cells'
                },
                {
                    iconClassName: 'icon-code',
                    tooltipText: 'Manage URLs'
                },
                {
                    iconClassName: 'icon-settings',
                    tooltipText: 'Settings'
                },
                {
                    iconClassName: 'icon-eye',
                    tooltipText: 'Run SmartButcher (generate slices)',
                    themeClassName: 'is-primary',
                    onClick: () => {
                        this.props.modalOpen(`Add image first.`);

                        console.log(this.props);
                    }
                },
                {
                    iconClassName: 'icon-save',
                    tooltipText: 'Save project & generate template'
                }
            ]
        };
    }

    handleClickOutside() {
        this.setState({
            isOpen: false
        });
    }

    render() {
        return (
            <nav className={ 'navigation-aside' + (this.state.isOpen ? ' is-open' : '') }>
                <ul className="list">
                    <li className="is-leader">
                        <Hamburger 
                            isOpen={this.state.isOpen}
                            handleClick={isOpen => this.setState({ isOpen: isOpen })} 
                        />
                    </li>
                    {this.state.items.map(item => {
                        return (
                            <li 
                                key={item.iconClassName}
                                className={item.themeClassName}
                            >
                                <a 
                                    href="javascript:;"
                                    onClick={item.onClick}
                                >
                                    <i className={item.iconClassName} />
                                </a>
                                <Tooltip text={item.tooltipText} />
                            </li>
                        );
                    })}
                    {/* <li>
                        <a href="javascript:;">
                            <i className="icon-user" />
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;">
                            <i className="icon-power_settings_new" />
                        </a>
                    </li> */}
                </ul>
            </nav>
        );
    }
}

NavigationAside.propTypes = {
    handleModalOpen: PropTypes.func,
    modalOpen: PropTypes.func
};

function mapStateToProps(state) {
    return {
        state: state
    };
}
  
function mapDispatchToProps(dispatch) {
    return {
        modalOpen: bodyHtml => {
            dispatch(actionModalOpen(bodyHtml));
        }
    };
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(onClickOutside(NavigationAside));