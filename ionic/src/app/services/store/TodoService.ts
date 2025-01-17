import { Injectable, signal, computed, effect } from '@angular/core';

export interface Todo {
  id: number;
  title: string;
}
// test todo
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private localStorageKey = 'todos2';

  // Initialiserer signalet fra Local Storage
  private todosSignal = signal<Todo[]>(this.loadTodosFromLocalStorage());

  // Read-only adgang til todos
  get todos$() {
    return computed(() => this.todosSignal());
  }

  constructor() {
    effect(() => {
        console.log('Todos er blevet opdateret:', this.todosSignal());
        this.saveTodosToLocalStorage(this.todosSignal());
      });

  }

  // Tilføj en ny todo og opdater Local Storage
  addTodo(todo: Todo) {
    this.todosSignal.update(currentTodos => {
      const updatedTodos = [...currentTodos, todo];
      this.saveTodosToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }

  // Fjern en todo og opdater Local Storage
  removeTodo(id: number) {
    this.todosSignal.update(currentTodos => {
      const updatedTodos = currentTodos.filter(todo => todo.id !== id);
      this.saveTodosToLocalStorage(updatedTodos);
      return updatedTodos;
    });
  }

  // Hent todos fra Local Storage
  private loadTodosFromLocalStorage(): Todo[] {
    const savedTodos = localStorage.getItem(this.localStorageKey);
    return savedTodos ? JSON.parse(savedTodos) : [];
  }

  // Gem todos i Local Storage
  private saveTodosToLocalStorage(todos: Todo[]) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(todos));
  }
}
