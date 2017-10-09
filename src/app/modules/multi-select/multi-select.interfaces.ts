import { GridOptions, ColDef, ColGroupDef } from "ag-grid";


export interface IMultiSelectConfig {

    PopHeightInPx?: number,
    PopWidthInPx?: number,

    GridConfig: {
        ColumnDef: (ColDef | ColGroupDef)[] | null,
        ColGroupDef?: ColDef | null,

        SingleRowSelection?: boolean,
        EnableContextMenu?: boolean,

        GridHeader?: {
            hideHeadersRow?: boolean,
            headersHeight?: number,
            enableFiler?: boolean,
            enableSorting?: boolean,
            enableResize?: boolean,
            enableHeaderMenu?: boolean,
        },

        QuickFilter?: {
            placeholder?: string,
            toolTip?: string,
            enableQuickFilter?: boolean
        }

    }

}


