import { Injectable, EventEmitter } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class AppService{
   titleUpdate = new EventEmitter<string>()
}