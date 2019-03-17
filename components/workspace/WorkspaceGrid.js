import React from 'react';
import SliceVertical from '@/components/slice/SliceVertical';
import './WorkspaceGrid.scss';

class WorkspaceGrid extends React.Component {
    render() {
        return (
            <div className="workspace-grid">
                <SliceVertical />
                <SliceVertical />
            </div>
        );
    }
}

export default WorkspaceGrid;