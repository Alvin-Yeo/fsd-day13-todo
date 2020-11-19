import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  @Input() importedTasks;
  @Output() onDeleteTask = new EventEmitter<any>();
  @Output() onEditTask = new EventEmitter<any>();
  @Output() onUpdateTask = new EventEmitter<any>();
  @Output() onCancelUpdate = new EventEmitter<any>();
  @Output() onCompleteTask = new EventEmitter<any>();

  taskForm:FormGroup;
  taskArray:FormArray;
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.taskArray = this.importedTasks;
    this.taskForm = this.fb.group({
      tasks: this.taskArray
    });
  }

  onComplete(index) {
    // console.log(index);
    this.onCompleteTask.next(index);
  }

  onEdit(index, task) {
    // console.log(index);
    task.controls.priority.enable();
    task.controls.due.enable();
    this.onEditTask.next(index);
  }

  onUpdate(index, task) {
    task.controls.priority.disable();
    task.controls.due.disable();
    this.taskArray.at(index).patchValue({ readOnly: true });
  }

  onDelete(index) {
    // console.log(index);
    this.onDeleteTask.next(index);
  }
}
