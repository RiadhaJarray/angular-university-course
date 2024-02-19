import {
    AfterContentInit,
    AfterViewInit,
    Component,
    ContentChildren,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnInit,
    Output,
    QueryList,
    Self,
    SkipSelf,
    ViewEncapsulation
} from '@angular/core';
import {Course} from '../model/course';
import {CourseImageComponent} from '../course-image/course-image.component';
import { CoursesService } from '../services/courses.service';
//import { COURSES_SERVICE } from '../app.component';

@Component({
    selector: 'course-card',
    templateUrl: './course-card.component.html',
    styleUrls: ['./course-card.component.css'],
    //we need to work with providers when we work with statefull service and we need a specific data for every card for exmple
    providers: [
        CoursesService
    ]
})
export class CourseCardComponent implements OnInit {

    @Input()
    course: Course;

    @Input()
    cardIndex: number;

    @Output('courseChanged')
    courseEmitter = new EventEmitter<Course>();


    constructor(
        //@Inject(COURSES_SERVICE) private coursesService : CoursesService
        //to override the default heirarchical dependency injection system (to have a specific version to our component) we add "@Self"
        //and add the providers property to the component declaration with injection of the wanted service
        @Self() private coursesService : CoursesService

        //the opposite is to tell angular that we want the global version of injectable service instance (the parent instance) and not see to the providrs section of the component 
        //we use "@SkipSelf"
       // @SkipSelf() private coursesService : CoursesService
    ) {

    }

    ngOnInit() {
        //console.log("card course", this.coursesService);
    }


    onSaveClicked(description:string) {

        this.courseEmitter.emit({...this.course, description});

    }




}


//the optionnal decorator : is used for situation where we are not sure if a dependency is going to be provided :  and then hundle programmatically where the dependency is undefined in our code
//angular has default dependency injection system : hierarchical , and it works fine in all perhaps situation
//self / skipself : used to breack default behaviour : self to force use local injection
//                                                     skipself to force avoid use local injection




//in general we use the tree scheckable injection 