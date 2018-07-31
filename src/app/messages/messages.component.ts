import {Component, OnInit} from '@angular/core';

import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';

import {Observable} from 'rxjs';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.css']
})

export class MessagesComponent implements OnInit {

    itemsRef: AngularFireList<any>;

    items: Observable<any[]>;

    projectsObservable: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {

    }

    ngOnInit() {

        this.db.list('usuarios')
            .valueChanges()
            .subscribe(res => {
                this.items = res;
            });


    }

    addItem(newName: string) {
        this.db.list('usuarios').push({name: newName, created: (new Date()).toLocaleString(), modified: (new Date()).toLocaleString()});
    }

    updateItem(key: string, newText: string) {

        this.itemsRef.update(key, {text: newText, modified: (new Date()).toLocaleString()});

    }

    deleteItem(key: string) {

        this.itemsRef.remove(key);

    }

    deleteEverything() {

        this.itemsRef.remove();

    }

}


