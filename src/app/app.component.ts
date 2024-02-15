import { COURSES } from "./../db-data";
import { AfterViewInit, Component, ElementRef, EventEmitter, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Course } from "./model/course";
import { CourseCardComponent } from "./course-card/course-card.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements AfterViewInit{

  //pipe variables start
  startDate = new Date(2000, 0, 1);
  title = COURSES[1].description;
  price = 9.99;
  rate = 0.67;
  course = COURSES[2];
  //pipe variable end

  courses = [...COURSES];

  coreCourse = COURSES[0];

  rxjsCourse = COURSES[1];

  ngrxCourse = COURSES[2];

  //here we used the componennt class name
  //@ViewChild(CourseCardComponent) 

//here we used the template reference feature
//usefull when we have multiple cards for example and we want to query them seperately
/*"{read: ElementRef}" : optionnal
  by default : the veiw child return the component instance it self
  so we use the options: read to specify the type tha we want to query : (exple: ElementRef)
*/
  @ViewChild('cardRef1' , {read: ElementRef}) 
  card1 : CourseCardComponent;

  @ViewChild('cardRef2') 
  card2 : CourseCardComponent;

 /* @ViewChild('containerRef') 
  conntainerDiv: ElementRef;*/

//we add this to check if the image reference from the card-component is readeable here or not 
  @ViewChild('courseImage') 
  courseImage: ElementRef;




  //viewchildren
  // "cards; " : return querylist : it shows all the CourseCardComponent occurence called from the app-component : with some properties : and not an array  
  //"cards : QueryList<CourseCardComponent>;" : de cet façon nous avons acces from "this.card" to some features and properties of querylist like : first, last,foreach,....
  @ViewChildren(CourseCardComponent , {read: ElementRef})
  cards : QueryList<ElementRef>;
  //cards : QueryList<CourseCardComponent>;

  onCardClicked() {
    //throw new Error('Method not implemented.');
    console.log("app rxjsCourse compoennt clickked ...");
  }



  constructor()
  {
    //console.log("conatinerDiv : " , this.card1);
  } 


  //angular life cycle event : the framework call this method
  //the earliest moment to populate child
  ngAfterViewInit() {
   // throw new Error("Method not implemented.");
  // console.log("conatinerDiv : " , this.card1);

   /* try to avoid any data operation modification traitment in this methode
   not use synchrone function*/
   //this.courses[1].description ="test";



   //we got here undefined : it is not possible to acces deeper in the child component using "@ViewChild"
   //so we can't use "@ViewChild" to go deep in the component structure and to see the elements of the current component
   //"@ViewChild" is a local query template mechanisme
   //we can not query several levels down the compoannt architecture
   //we can not see where the component is used 
   //console.log("courseImage : " , this.courseImage);


   //view children
   //we subscribed to this observable : observable will emit multiple value over time
   /*this.cards.changes.subscribe(
    cards => console.log(cards)
   );*/

   //example of reading from cards ViewChildren
   //console.log("cards : " , this.cards.first);

   //@ViewChildren(CourseCardComponent , {read: ElementRef})
   //de cette façon the eleeemnt de querylist sont des elementRef : liste de reference to DOM elements
   console.log("cards : " , this.cards);


   //to resume : ViewChildren and ViewChild : are two local query mechanisme 
   //we can only query elements of the component template 
   //the two can not see inside the child or the parent component 
  }



 onCourseSelected(course: Course) {
    //throw new Error('Method not implemented.');
    //console.log("app coreCourse compoennt clickked ...", course);

    /*console.log("card1");
    console.log(this.card1);
    console.log("card2");
    console.log(this.card2);*/

    console.log("conatinerDiv : " , this.card1);

  }

  trackCourse(index: number, course: Course) {
    return course.id;
  }


  onCourseEdited() {
    //throw new Error('Method not implemented.');
    this.courses.push(
      {
        id: 2,
        description: "RxJs In Practice Course",
        iconUrl: 'https://s3-us-west-1.amazonaws.com/angular-university/course-images/rxjs-in-practice-course.png',
        longDescription: "Understand the RxJs Observable pattern, learn the RxJs Operators via practical examples",
        category: 'BEGINNER',
        lessonsCount: 10
      }
    );
    }
}
