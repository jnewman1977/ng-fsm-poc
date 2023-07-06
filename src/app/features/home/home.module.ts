import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from "./home.routing.module";
import { SpinnerModule } from "../../shared/components/spinner/spinner.module";


@NgModule({
    declarations: [
        HomeComponent
    ],
    imports: [
        CommonModule,
        HomeRoutingModule,
        SpinnerModule,
        NgOptimizedImage
    ]
})
export class HomeModule {
}
