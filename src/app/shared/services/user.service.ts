import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { delay, map, Observable, share, take, timeout } from "rxjs";
import { UserGroup } from "../models";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    loadUserGroups(): Observable<UserGroup[]> {
        return this.http.get<UserGroup[]>('https://api.json-generator.com/templates/oDmRX4C65Yxt/data', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'bearer 2s71n4rzj6ryegl5bgvj0bds9ndn4o18vxhav7bi'
            }
        }).pipe(
                share(),
                timeout({ each: 2000 }),
                delay(400) // simply for demonstration purposes.
        );
    }
}
