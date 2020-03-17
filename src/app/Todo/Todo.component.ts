import { Component, OnInit } from '@angular/core';
import { TodoService } from '../_services/todo.service';
import {Todo} from '../_models/Todo';


@Component({
  selector: 'app-Todo',
  templateUrl: './Todo.component.html',
  styleUrls: ['./Todo.component.scss']
})
export class TodoComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(todos => {
      this.todos = todos;
    });
  }

  deleteTodoo(todo:Todo) {
    // Remove From UI
    this.todos = this.todos.filter(t => t.id !== todo.id);
    // Remove From Server
    this.todoService.deletteTodo(todo).subscribe();
  }

  addTodoo(todo:Todo){
    this.todoService.adddTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    });
  }

}
