import {AfterViewInit, Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import { HignlightedDirective } from './directives/hignlighted.directive';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {

    courses = COURSES;

    /*@ViewChild(HignlightedDirective)
    highlighed : HignlightedDirective;*/

    @ViewChild(CourseCardComponent, {read: HignlightedDirective})
    highlighed : HignlightedDirective;

    @ViewChildren(CourseCardComponent, {read: ElementRef})
    cards : QueryList<ElementRef>;


    constructor() {

    }

    ngAfterViewInit() {
      console.log(this.highlighed);
    }

    onCourseSelected(course:Course) {

    }

    onToggle(isHighlighted : boolean){
      console.log(isHighlighted);
    }

}
