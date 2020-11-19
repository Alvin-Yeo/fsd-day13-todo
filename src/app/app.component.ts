import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { dateValidator } from './shared/date-validation.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop-three';
  
  fb:FormBuilder = new FormBuilder();

  taskFormArray:FormArray = this.fb.array([
    this.fb.group({
      desc: this.fb.control('Task 1', [ Validators.required ]),
      priority: this.fb.control({ value: 'High', disabled: true }, [ Validators.required ]),
      due: this.fb.control({ value: '2020-12-12', disabled: true }, [ Validators.required, dateValidator() ]),
      isCompleted: this.fb.control(false),
      readOnly: this.fb.control(true)
    })
  ]);

  processNewTask(newTask) {
    // newTask.due = new Date(Date.parse(newTask.due));
    this.taskFormArray.push(this.fb.group({
      desc: this.fb.control(newTask.desc, [ Validators.required ]),
      priority: this.fb.control({ value: newTask.priority, disabled: true }, [ Validators.required ]),
      due: this.fb.control({ value: newTask.due, disabled: true }, [ Validators.required, dateValidator() ]),
      isCompleted: this.fb.control(false),
      readOnly: this.fb.control(true)
    }));
  }

  completeTask(index) {
    this.taskFormArray.at(index).patchValue({ isCompleted: true });
  }

  editTask(index) {
    this.taskFormArray.at(index).patchValue({ readOnly: false });
  }

  updateTask(index) {
    // console.log(index);
  }

  deleteTask(index) {
    // console.log(index);
    this.taskFormArray.removeAt(index);
  }
}
