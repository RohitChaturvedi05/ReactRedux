import { NgModule } from "@angular/core"

import {
    CompatibilityModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
    MatInputModule, MatMenuModule, MatProgressBarModule, MatOptionModule, MatListModule,
    MatCommonModule, MatRadioModule, MatSelectModule, MatTabsModule, NativeDateModule
} from "@angular/material";

@NgModule({
    declarations: [

    ],
    imports: [
        CompatibilityModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
        MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
        MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
        MatInputModule, MatMenuModule, MatProgressBarModule, MatOptionModule, MatListModule,
        MatCommonModule, MatRadioModule, MatSelectModule, MatTabsModule, NativeDateModule
    ],
    exports: [
        CompatibilityModule, MatAutocompleteModule, MatButtonModule, MatButtonToggleModule,
        MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
        MatDialogModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
        MatInputModule, MatMenuModule, MatProgressBarModule, MatOptionModule, MatListModule,
        MatCommonModule, MatRadioModule, MatSelectModule, MatTabsModule, NativeDateModule
    ]
})
export class MaterialModule { }