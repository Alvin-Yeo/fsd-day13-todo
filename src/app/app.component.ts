import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'workshop-three';
  
  tasks:{ desc:string, priority:string, due:Date }[] = [
    { desc: 'Task 1', priority: 'High', due: new Date() }
  ];

  processNewTask(newTask) {
    newTask.due = new Date(Date.parse(newTask.due));
    // console.log('New Task: ', newTask);
    this.tasks.push(newTask);
  }
}
