import {Component, effect, EffectRef, inject, Injector, signal} from '@angular/core';
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

  counter = signal(0);

  injector = inject(Injector);
  effectRef: EffectRef | null = null;

  constructor() {

    this.effectRef = effect((onCleanup) => {

      const counter = this.counter();

      const timeout = setTimeout(() => {
        console.log(`counter value: ${counter}`);
      }, 1000);


      onCleanup(() => {
        console.log('Calling clean up');
        clearTimeout(timeout);
      });

    });
    /* effect(() => {
         console.log(`counter value: ${this.counter()}`);

         this.increment();
       },
       {
         injector: this.injector,
         //Be careful with this configuration permanent loop
         allowSignalWrites: false
       });*/

  }

  increment() {
    this.counter.update(val => val + 1);
  }

  cleanup() {


    this.effectRef?.destroy();
  }
}













