import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';

// test todo
export interface Todo {
  id: number;
  title: string;
}

export class AddTodo {
  static readonly type = '[Todo] Add';
  constructor(public payload: Todo) {}
}

export class RemoveTodo {
  static readonly type = '[Todo] Remove';
  constructor(public payload: number) {}
}

export interface TodoStateModel {
  todos: Todo[];
}

@State<TodoStateModel>({
  name: 'todos',
  defaults: {
    todos: []
  }
})
@Injectable()
export class TodoState {
  
  @Selector()
  static getTodos(state: TodoStateModel) {
    return state.todos;
  }

  @Action(AddTodo)
  add({ getState, patchState }: StateContext<TodoStateModel>, { payload }: AddTodo) {
    const state = getState();
    patchState({
      todos: [...state.todos, payload]
    });
  }

  @Action(RemoveTodo)
  remove({ getState, patchState }: StateContext<TodoStateModel>, { payload }: RemoveTodo) {
    patchState({
      todos: getState().todos.filter(todo => todo.id !== payload)
    });
  }
}
