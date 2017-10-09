import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter, ElementRef, Renderer, HostListener } from "@angular/core";
import { IMultiSelectConfig } from "./multi-select.interfaces";
import { GridOptions } from "ag-grid"

@Component(
    {
        selector: "multi-select",
        templateUrl: "./multi-select.html",
        styleUrls: ['./multi-select.css']
    }
)
export class MultiSelectComponent implements OnInit, OnChanges {

    @Input() config: IMultiSelectConfig = {
        PopHeightInPx: 350,
        PopWidthInPx: 350,
        GridConfig: {
            ColumnDef: null,
        }
    };
    @Input() placeholder: string;
    @Input() cssClass: string;
    @Input() toolTip: string;
    @Input() Datasource: Array<any> | null;

    @Output() onValueChange: EventEmitter<any> = new EventEmitter();
    @Output() onClose: EventEmitter<any> = new EventEmitter();

    @HostListener("document:click", ['$event'])
    onOutSideComponentClick() {
        if (!this._eleRef.nativeElement.contains(event.target)) {
            this.togglePopup(false);
        }
    }

    _togglePopup: boolean = false;
    _searchGridOptions: GridOptions;
    _defConfig: IMultiSelectConfig = {
        PopHeightInPx: 350,
        PopWidthInPx: 350,

        GridConfig: {
            ColumnDef: null,
            ColGroupDef: null,

            SingleRowSelection: false,
            EnableContextMenu: false,

            GridHeader: {
                hideHeadersRow: false,
                headersHeight: 25,
                enableFiler: false,
                enableSorting: false,
                enableResize: false,
                enableHeaderMenu: false,
            },

            QuickFilter: {
                placeholder: "Search",
                toolTip: "Search",
                enableQuickFilter: false
            }
        }
    };
    _selectedDatasource = [];
    constructor(
        private _eleRef: ElementRef,
        private _renderer: Renderer
    ) {
        this._renderer.setElementStyle(this._eleRef.nativeElement, "position", "relative")
    }

    ngOnInit() { };
    ngOnChanges(simpleChange: SimpleChanges) {
        if (simpleChange.hasOwnProperty("config")) {
            if (simpleChange.config.currentValue)
                this.initGrid(this.config);
        } else if (simpleChange.hasOwnProperty("Datasource")) {
            this._searchGridOptions.onGridReady = _ => {
                console.log("Datasource", this.Datasource)
                this._searchGridOptions.api.setRowData(this.Datasource);
                this.selectAlreadyCheckRecords(this._selectedDatasource);
            }
            if (this._searchGridOptions.api) {
                this._searchGridOptions.api.setRowData(this.Datasource);
            }
        }
    };

    /**
     * 
     * @param config Intialize Search Grid and update column Def
     */
    initGrid(config: IMultiSelectConfig) {
        if (config) {
            this.config = config;
            this.config.PopHeightInPx = this.getValidValue(this.config.PopHeightInPx, this._defConfig.PopHeightInPx);
            this.config.PopWidthInPx = this.getValidValue(this.config.PopWidthInPx, this._defConfig.PopWidthInPx);
            this.config.PopWidthInPx = this.getValidValue(this.config.PopWidthInPx, this._defConfig.PopWidthInPx);

            this.config.GridConfig.SingleRowSelection = this.getValidValue(this.config.GridConfig.SingleRowSelection, this._defConfig.GridConfig.SingleRowSelection);
            this.config.GridConfig.EnableContextMenu = this.getValidValue(this.config.GridConfig.EnableContextMenu, this._defConfig.GridConfig.EnableContextMenu);

            if (this.config.GridConfig.GridHeader) {
                this.config.GridConfig.GridHeader.hideHeadersRow = this.getValidValue(this.config.GridConfig.GridHeader.hideHeadersRow, this._defConfig.GridConfig.GridHeader.hideHeadersRow);
                this.config.GridConfig.GridHeader.headersHeight = this.getValidValue(this.config.GridConfig.GridHeader.headersHeight, this._defConfig.GridConfig.GridHeader.headersHeight);
                this.config.GridConfig.GridHeader.enableFiler = this.getValidValue(this.config.GridConfig.GridHeader.enableFiler, this._defConfig.GridConfig.GridHeader.enableFiler);
                this.config.GridConfig.GridHeader.enableSorting = this.getValidValue(this.config.GridConfig.GridHeader.enableSorting, this._defConfig.GridConfig.GridHeader.enableSorting);
                this.config.GridConfig.GridHeader.enableResize = this.getValidValue(this.config.GridConfig.GridHeader.enableResize, this._defConfig.GridConfig.GridHeader.enableResize);
                this.config.GridConfig.GridHeader.enableHeaderMenu = this.getValidValue(this.config.GridConfig.GridHeader.enableHeaderMenu, this._defConfig.GridConfig.GridHeader.enableHeaderMenu);


            } else {
                this.config.GridConfig.GridHeader = this._defConfig.GridConfig.GridHeader;
            }

            if (this.config.GridConfig.QuickFilter) {
                this.config.GridConfig.QuickFilter.placeholder = this.getValidValue(this.config.GridConfig.QuickFilter.placeholder, this._defConfig.GridConfig.QuickFilter.placeholder);

                this.config.GridConfig.QuickFilter.toolTip = this.getValidValue(this.config.GridConfig.QuickFilter.toolTip, this._defConfig.GridConfig.QuickFilter.toolTip);

                this.config.GridConfig.QuickFilter.enableQuickFilter = this.getValidValue(this.config.GridConfig.QuickFilter.enableQuickFilter, this._defConfig.GridConfig.QuickFilter.enableQuickFilter);

            } else {
                this.config.GridConfig.QuickFilter = this._defConfig.GridConfig.QuickFilter;
            }


        } else {
            this.config = this._defConfig;
        }


        this._searchGridOptions = {
            headerHeight: this.config.GridConfig.GridHeader.hideHeadersRow ? 0 : this.config.GridConfig.GridHeader.headersHeight,

            defaultColDef: {
                width: 100,
                headerCheckboxSelection: this.isFirstColumn,
                checkboxSelection: this.isFirstColumn
            },

            rowSelection: this.config.GridConfig.SingleRowSelection ? "single" : "multiple",
            columnDefs: this.config.GridConfig.ColumnDef,
            groupColumnDef: this.config.GridConfig.ColGroupDef,
            rowData: this.Datasource || null,
            enableFilter: this.config.GridConfig.GridHeader.enableFiler,
            enableSorting: this.config.GridConfig.GridHeader.enableSorting,
            enableColResize: this.config.GridConfig.GridHeader.enableResize,
            suppressContextMenu: this.config.GridConfig.EnableContextMenu,
            suppressMenuHide: this.config.GridConfig.GridHeader.enableHeaderMenu,
            onSelectionChanged: params => { this.onSelectionChanged(params) }
        }

    };
    getValidValue(value1, value2) {
        if (typeof value1 == "undefined" || value1 == null) {
            return value2;
        } else {
            return value1;
        }
    }
    isFirstColumn(params) {
        var displayedColumns = params.columnApi.getAllDisplayedColumns();
        var thisIsFirstColumn = displayedColumns[0] === params.column;
        return thisIsFirstColumn;
    }

    onSelectionChanged(param) {
        this._selectedDatasource = this._searchGridOptions.api.getSelectedRows();
    }
    selectAlreadyCheckRecords(selArr: Array<any>) {
        if (selArr.length == 0) {
            return;
        } else if (selArr == this.Datasource) {
            this._searchGridOptions.api.selectAll()
        } else {
            this._searchGridOptions.api.forEachNode(node => {
                if (selArr.includes(node.data)) {
                    node.setSelected(true);
                }
            });
        }

    }
    /**
     * 
     * @param param Optional
     * True: if want to open Search Resut popup
     */
    togglePopup(param?: boolean): void {
        if (param)
            this._togglePopup = param;
        else {
            this._togglePopup = !this._togglePopup;
        }
    }
}