import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class {{pascalCase name}} {

  private {{camelCase name}}Collection: AngularFirestoreCollection<{{pascalCase name}}>;

  constructor(private afs: AngularFirestore) { 
    this.{{camelCase name}}Collection = afs.collection<{{pascalCase name}}>('{{dashCase name}}');
  }
  
}