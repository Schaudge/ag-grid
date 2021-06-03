import React, { useEffect, useRef, useState } from "react";
import {
    Context,
    FocusService,
    GridCtrl,
    IGridComp,
    AgStackComponentsRegistry
} from "@ag-grid-community/core";
import { GridBodyComp } from "./gridBodyComp";
import { classesList } from "./utils";

export function GridComp(params: {context: Context}) {

    const [rtlClass, setRtlClass] = useState<string>('');
    const [keyboardFocusClass, setKeyboardFocusClass] = useState<string>('');
    const [layoutClass, setLayoutClass] = useState<string>('');
    const [cursor, setCursor] = useState<string | null>(null);
    const [userSelect, setUserSelect] = useState<string | null>(null);

    const eRootWrapper = useRef<HTMLDivElement>(null);
    const eGridBodyParent = useRef<HTMLDivElement>(null);

    const {context} = params;

    useEffect( ()=> {
        const beansToDestroy: any[] = [];

        const ctrl = context.createBean(new GridCtrl());
        beansToDestroy.push(ctrl);

        const compProxy: IGridComp = {
            destroyGridUi:
                ()=> {}, // do nothing, as framework users destroy grid by removing the comp
            setRtlClass: setRtlClass,
            addOrRemoveKeyboardFocusClass:
                (addOrRemove: boolean) => setKeyboardFocusClass(addOrRemove ? FocusService.AG_KEYBOARD_FOCUS : ''),
            forceFocusOutOfContainer: ()=> {},//this.forceFocusOutOfContainer.bind(this),
            updateLayoutClasses: setLayoutClass,
            getFocusableContainers: ()=>[],//this.getFocusableContainers.bind(this)
            setCursor: setCursor,
            setUserSelect: setUserSelect
        };

        ctrl.setComp(compProxy, eRootWrapper.current!, eRootWrapper.current!);

        // should be shared
        const insertFirstPosition = (parent: HTMLElement, child: HTMLElement) => parent.insertBefore(child, parent.firstChild);

        const agStackComponentsRegistry: AgStackComponentsRegistry = context.getBean('agStackComponentsRegistry');
        const HeaderDropZonesClass = agStackComponentsRegistry.getComponentClass('AG-GRID-HEADER-DROP-ZONES');
        if (ctrl.showDropZones() && HeaderDropZonesClass) {
            const headerDropZonesComp = context.createBean(new HeaderDropZonesClass());
            insertFirstPosition(eRootWrapper.current!, headerDropZonesComp.getGui());
            beansToDestroy.push(headerDropZonesComp);
        }

        return ()=> {
            beansToDestroy.forEach( b => context.destroyBean(b) );
        };
    }, []);

    const rootWrapperClasses = classesList('ag-root-wrapper', rtlClass, keyboardFocusClass, layoutClass);
    const rootWrapperBodyClasses = classesList('ag-root-wrapper-body', layoutClass);

    return (
        <div ref={eRootWrapper} className={rootWrapperClasses}>
            <div className={rootWrapperBodyClasses} ref={eGridBodyParent}>
                <GridBodyComp context={context}/>
            </div>
        </div>
    );
}