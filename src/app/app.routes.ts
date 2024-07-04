import {Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {LessonsComponent} from './lessons/lessons.component';
import {CourseComponent} from './course/course.component';
import {courseResolver} from './course/course.resolver';
import {courseLessonsResolver} from './course/course-lessons.resolver';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    'path': 'courses/:courseId',
    component: CourseComponent,

    resolve: {
      course: courseResolver,
      lessons: courseLessonsResolver
    }
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'lessons',
    component: LessonsComponent
  },
  {
    path: '**',
    redirectTo: '/'
  }
];
