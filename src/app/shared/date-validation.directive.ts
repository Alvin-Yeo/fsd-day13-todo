import { AbstractControl, ValidatorFn } from '@angular/forms';

export function dateValidator():ValidatorFn {
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