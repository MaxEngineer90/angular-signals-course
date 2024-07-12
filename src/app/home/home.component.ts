import {Component, computed, effect, inject, Injector, signal} from '@angular/core';
import {MatTab, MatTabGroup} from '@angular/material/tabs';
import {CoursesCardListComponent} from '../courses-card-list/courses-card-list.component';
import {Course, sortCoursesBySeqNo} from '../models/course.model';
import {CoursesService} from '../services/courses.service';
import {from} from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';

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
  injector = inject(Injector);
  coursesService = inject(CoursesService);

  courses$ = from(this.coursesService.loadAllCourses());
  #courses = signal<Array<Course>>([]);
  beginnerCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'BEGINNER');
  });
  advancedCourses = computed(() => {
    const courses = this.#courses();
    return courses.filter(course => course.category === 'ADVANCED');
  });

  constructor() {
    effect(() => {
      console.log(`Beginner courses `, this.beginnerCourses());
      console.log(`Advanced courses `, this.advancedCourses());
    });

    this.loadCourses().then(() => console.log(`All curses loaded: `, this.#courses()));
  }

  onToSignalExample() {
    const courses = toSignal(this.courses$, {
      injector: this.injector,
      rejectErrors: true
    });

    effect(() => {
      console.log(`courses: `, courses());
    }, {
      injector: this.injector
    });
  }

  async loadCourses() {
    try {
      const courses = await this.coursesService.loadAllCourses();
      this.#courses.set(courses.sort(sortCoursesBySeqNo));
    } catch (err) {
      alert(`Error loading courses!`);
      console.error(err);
    }
  }

}













