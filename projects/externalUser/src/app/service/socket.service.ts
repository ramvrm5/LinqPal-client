import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class SocketService {

    socket: any;

    constructor() { }

    setupSocketConnection() {
        this.socket = io(environment.socket_url);
    }

    onaddUser(data) {
        this.socket.emit('new-user-add', data)
    }


    public getNewUsers = () => {
        return Observable.create((observer) => {
            this.socket.on('user-data', (data) => {
                console.log(data);
                observer.next(data);
            });
        });
    }



}