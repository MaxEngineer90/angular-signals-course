import {Component, computed, signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';


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
  counter = signal<number>(0);

  tenXCounter = computed(() => {
    const val = this.counter();

    return val * 10;
  });

  hundredXCounter = computed(() => {
    const val = this.tenXCounter();

    return val * 10;
  });

  increment() {
    this.counter.update(counter => counter + 1);
  }

}













