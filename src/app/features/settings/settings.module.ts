import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from "./settings.routing.module";
import { SpinnerModule } from "../../shared/components/spinner/spinner.module";

@NgModule({
    declarations: [
        SettingsComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        SpinnerModule
    ]
})
export class SettingsModule {
}
