import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {
  @Output() addTodo: EventEmitter <any> = new EventEmitter();

  title:string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    const todo = {
      title: this.title,
      completed:false
    }
    this.addTodo.emit(todo);
  }

}
