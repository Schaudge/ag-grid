import React from 'react';

import type { CustomInnerHeaderProps } from 'ag-grid-react';

export interface MyCustomInnerHeaderProps extends CustomInnerHeaderProps {
    icon: string;
}

export default (props: MyCustomInnerHeaderProps) => {
    return (
        <div className="customInnerHeader">
            {props.icon && <i className={`fa ${props.icon}`}></i>}
            <span>{props.displayName}</span>
        </div>
    );
};
