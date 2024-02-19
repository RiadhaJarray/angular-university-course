import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChild,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output, QueryList, TemplateRef,
    ViewChild,
    ViewEncapsulation
} from '@angular/core';
import {COURSES} from '../../db-data';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    //encapsulation : ViewEncapsulation.Emulated //default viewencapsulation : every component has its specific css
    //encapsulation : ViewEncapsulation.None //no ":host" applied //no specific css
    encapsulation : ViewEncapsulation.ShadowDom //i didn't understand it hhh (so when i need it i will understand it)

})
export class CourseCardComponent implements OnInit, AfterViewInit, AfterContentInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseSelected')
    courseEmitter = new EventEmitter<Course>();

    @ContentChildren(CourseImageComponent, {read: ElementRef})
    images: QueryList<ElementRef>;

    constructor() {

    }

    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

    ngOnInit() {

    }

    isImageVisible() {
        return this.course && this.course.iconUrl;
    }

    onCourseViewed() {

        this.courseEmitter.emit(this.course);

    }

    cardClasses() {
        if (this.course.category == 'BEGINNER') {
            return 'beginner';
        }
    }

    cardStyles() {
        return {
            'background-image': 'url(' + this.course.iconUrl + ')'

        };
    }



}
