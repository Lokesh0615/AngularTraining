import { Injectable, EventEmitter } from '@angular/core'
import { Subject } from 'rxjs'

@Injectable()
export class DataService {
    // dataEmitter=new EventEmitter<string>();
    dataEmitter = new Subject<string>()

    raiseDataEmmotterEvent(data: string) {
        // this.dataEmitter.emit(data);
        this.dataEmitter.next(data)
    }
}