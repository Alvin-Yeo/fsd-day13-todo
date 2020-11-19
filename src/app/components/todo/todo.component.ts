import { IfStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { dateValidator } from 'src/app/shared/date-validation.directive';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styles: [
  ]
})
export class TodoComponent implements OnInit {

  todoForm:FormGroup;

  @Output() onAddTask = new EventEmitter<any>();

  constructor(private fb:FormBuilder) {  }

  ngOnInit(): void {
    this.todoForm = this.fb.group({
      desc: this.fb.control('', [ Validators.required ]),
      priority: this.fb.control('', [ Validators.required ]),
      due: this.fb.control('', [ Validators.required, dateValidator() ])
    });
  }

  get desc() { return this.todoForm.get('desc'); }
  get due() { return this.todoForm.get('due'); }

  processForm() {
    // console.log(this.todoForm.value);
    this.onAddTask.next(this.todoForm.value);
  }
}
