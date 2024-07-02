import {Component, signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';


type counter = {
  value: number;
}

@Component({
  selector: 'home',
  standalone: true,
  imports: [
    MatTabGroup,
    MatTab,
    CoursesCardListComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  counter = signal<counter>({
    value: 0
  });
  values = signal<number[]>([1, 2, 3, 4]);


  increment() {
    //DOSN'T work with Signal ChangeDetection
    //this.counter().value++

    this.counter.update(counter => ({
      ...counter,
      value: counter.value + 1
    }));
    
  }

  append() {
    //DOSN'T work with Signal ChangeDetection
    /*  const values = this.values();
      const last = values[values.length - 1];
      values.push(last +1);*/

    this.values.update(values => ([
      ...values,
      values[values.length - 1] + 1
    ]));
  }
}













