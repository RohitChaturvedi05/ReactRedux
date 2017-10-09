
import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MultiSelectComponent } from "./multi-select";
import { } from "./multi-select.interfaces";
import { MaterialModule } from "../../material.module"
import { AgGridModule } from "ag-grid-angular";
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
    declarations: [
        MultiSelectComponent
    ],
    imports: [
        CommonModule,
        BrowserModule,
        MaterialModule,
        FormsModule,
        AgGridModule.withComponents([
            MultiSelectComponent
        ])
    ],
    providers: [],
    exports: [
        MultiSelectComponent
    ]
})
export class MultiSelectModule { }
