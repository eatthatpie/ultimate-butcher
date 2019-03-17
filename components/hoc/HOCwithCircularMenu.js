import React from 'react';
import CircularMenu from '@/components/circular/CircularMenu';

function withCircularMenu(WrappedComponent) {
    class HOCwithCircularMenu extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <React.Fragment>
                    <WrappedComponent {...this.props} />
                    <CircularMenu />
                </React.Fragment>
            );
        }
    }

    return HOCwithCircularMenu;
}

export default withCircularMenu;