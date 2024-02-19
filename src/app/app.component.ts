import { CoursesService } from './services/courses.service';
import {AfterViewInit, Component, ElementRef, Inject, InjectionToken, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {COURSES} from '../db-data';
import {Course} from './model/course';
import {CourseCardComponent} from './course-card/course-card.component';
import {HighlightedDirective} from './directives/highlighted.directive';
import {Observable} from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { APP_CONFIG, AppConfig, CONFIG_TOKEN } from './config';







//our provider : function to be called and give the deoenedency needed : with http dependency injection
/*function coursesServiceProvider(http: HttpClient) : CoursesService {
  return new CoursesService(http);
}*/


// a unique injection token for this service with name 'COURSES_SERVICE' //unique identifier //with export identification to be available 
//export const COURSES_SERVICE = new InjectionToken<CoursesService>('COURSES_SERVICE');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  //we delete the providers herer to replace it wwith tree schackable
  /*providers : [
    {
      provide: CONFIG_TOKEN,
      useValue : APP_CONFIG
      //useFactory : () => APP_CONFIG
    }
  ]*/

      //instead of declaring the service here : the probleme is that the service is called and injected always even when it is not needed
    //so the solution is to delete provider from here and define this behaviour at the level of the service itself
    //it is the options in the @injectable annotation : "provideIn"
//  providers: [ //providers property via configuration object
    //{
      /**
       here instead of calling "@Inject(COURSES_SERVICE)" by its name 
       we can use the service class name (in the provide property) and angular will know that we need to inject that service with that token we specify before
      */
      //provide : COURSES_SERVICE, //name of the injectable service :called InjectionToken



      //instead of doing the next two lines, we can simplify redondency by directly only calling the service class
      /*provide : CoursesService,
      useClass : CoursesService,*/

      


      //instad of "useFactory" : we can use "useClass" and angular will know taht he need to call the constructor on this class
      //and will know the dependencies needed by tha constructor : so thats why we don't need the function or the injactionToken explicitely
      //useFactory : coursesServiceProvider, //the function for the service provider
     // deps : [HttpClient] //dependencies of the service provider //function provider parameters
    //}


    //de cette façon : angular knows that how to create the dpendency on that service and provide it to the component
    //every component has its own providres list
//    CoursesService


//  ]
})
export class AppComponent implements OnInit {


  //course$ : the $ is conevention to say that this variable is an observable
  courses$ : Observable<Course[]>;
  //courses = COURSES;
  courses;

  constructor(/*private http : HttpClient,*/
      // @Inject(COURSES_SERVICE) : specify the nalme of the injectiontoken for that service 
      //@Inject(COURSES_SERVICE) private coursesService : CoursesService
      //we can add @Optional() : a decorator to tell that this injection is not mandatory
      private coursesService : CoursesService,

      //"AppConfig" : is interface so it can not be used as depenedency injection token so we add @Inject
      //after using "useValue : APP_CONFIG" in providers : we can delete this injection here 
      //---
      //after working with tree scheckable injection : we can use injection here 
      //the difference is that that injected element will be availeble and displayed in the bundle 
      @Inject(CONFIG_TOKEN)private config : AppConfig
      ) {
        console.log( this.config);
  }

  //initialisation //called by angular it self
  ngOnInit() {

   console.log( this.coursesService);

    //parametre to add to our http call 
    /*const params = new HttpParams()
              .set("page", "1")
              .set("pageSize", "10");*/

    /*this.http.get('/api/courses', {params}).subscribe(
      courses =>this.courses = courses
    );*/

    //instead of subscibing : we assign the return of the api call to an abservable variable //we just add the type of the return 
    /*this.courses$= this.http.get<Course[]>('/api/courses', {params});*/


    this.courses$ = this.coursesService.loadCourses();

  }


  save(course : Course){
    this.coursesService.saveCourse(course).subscribe(
      ()=> console.log('Course Saved! ')
    );
  }

}


//every dependency has its unique identifier called "injectionToken" and a providerfactory function created in order to create dependencies
//and we add a provider property to define the name , the factoryuse and the dependencies
//so angualr systeme of dependency injection works like this : it create a token and a fucnction factory




/*dependency injection :
 we can identify dependency via service class name is unique and exists at runtime under the format of constructer function
 we can not use an interface as a injection token bacause interface does not existe on runtime, it is a compile tme construct
*/