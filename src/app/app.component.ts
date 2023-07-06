import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'ng-fsm';

    public async home(): Promise<void> {
    }

    public async settings(): Promise<void> {
    }
}
