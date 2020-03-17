import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Todo } from 'src/app/_models/Todo';
import { TodoService } from '../../_services/todo.service';

@Component({
  selector: 'app-Todo-list',
  templateUrl: './Todo-list.component.html',
  styleUrls: ['./Todo-list.component.scss']
})
export class TodoListComponent implements OnInit {
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService:TodoService) { }

  ngOnInit() {
  }

  //set dynamic classes
  setClasses() {
    let classes = {
      todo:true,
      'is-complete' : this.todo.completed
    }
    return classes;
  }

  onToggle(todo) {
    //toggle in UI
    todo.completed = !todo.completed;
    //toggle on server
    this.todoService.toggleCompleted(todo).subscribe(todo =>
    console.log(todo));
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
  }

}
