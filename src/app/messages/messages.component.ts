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

    items: {};

    projectsObservable: Observable<any[]>;

    constructor(private db: AngularFireDatabase) {
        this.itemsRef = this.db.list('usuarios');
    }

    ngOnInit() {
        this.itemsRef
            .valueChanges()
            .subscribe(res => {
                this.items = res;
            });
    }

    addItem(newName: string) {
        this.itemsRef.push({name: newName, created: (new Date()).toLocaleString(), modified: (new Date()).toLocaleString()});
    }

    updateItem(key: string, newText: string) {
        this.itemsRef.update(key, {text: newText, modified: (new Date()).toLocaleString()});
    }

    deleteItem(key) {

        console.info(key);


        this.itemsRef.remove(key);

        // this.itemsRef.remove(key).then(function(res){
        //     console.info(res);
        // });
    }

    deleteEverything() {
        this.itemsRef.remove();
    }

}


