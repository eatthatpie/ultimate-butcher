import React from 'react';
import LayoutMask from '@/components/layout/LayoutMask';
import NavigationAside from '@/components/navigation/NavigationAside';
import withCircularMenu from '@/components/hoc/HOCwithCircularMenu';
import WorkspaceGrid from '@/components/workspace/WorkspaceGrid';
import '@/assets/scss/app.scss';

export default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const WorkspaceGridWithCircularMenu = withCircularMenu(WorkspaceGrid);

        return (
            <React.Fragment>
                <WorkspaceGridWithCircularMenu />
                <NavigationAside />
                <LayoutMask />
            </React.Fragment>
        );
    }
}