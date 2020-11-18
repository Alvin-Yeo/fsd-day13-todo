import { IfStmt } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, ControlContainer, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';

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
      due: this.fb.control('', [ Validators.required, this.dateValidator() ])
    });
  }

  get desc() { return this.todoForm.get('desc'); }
  get due() { return this.todoForm.get('due'); }

  dateValidator():ValidatorFn {
    return (control:AbstractControl):{ [key:string] : boolean } | null => {
      if(control.value !== '') {
        const inputDate = new Date(Date.parse(control.value)).setHours(0,0,0,0);
        const todayDate = new Date().setHours(0,0,0,0);
        
        // console.log('Validating >>> ', inputDate);
        // console.log('Today Date >>> ', todayDate);
  
        if(inputDate < todayDate) {
          // console.log('Due');
          return { 'dateValidator': true };
        } else {
          // console.log('Not Due');
          return null;
        }
      }
  
      return null;
    };
  }

  processForm() {
    // console.log(this.todoForm.value);
    this.onAddTask.next(this.todoForm.value);
  }
}
