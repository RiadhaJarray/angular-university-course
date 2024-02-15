import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../model/course';
import { CourseImageComponent } from '../course-image/course-image.component';

@Component({
  selector: 'course-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.css'
})
export class CourseCardComponent implements OnInit , AfterViewInit, AfterContentInit{




  @Input({
    required: true
  })
  course : Course;


  @Input({
    required: true
  })
  index :number;

  //this the courseImage that reference the courseImage from app-component using ng-content
  //with view child of course we can not see the image " console.log(this.image);" the normal behaviour of ViewChild
  /*@ViewChild('courseImage')
  image;*/

  //so we use "ContentChild"
  @ContentChild('courseImage')
  image;

  /*we tried to reference the global container of the card-component.html but we can't see it "console.log(this.container);" 
    in the AfterInit methode , so : 
    the scope of ViewContent is restricted in the ng-content 
    it can see only the content part of the component tag call*/

  /*@ContentChild('container')
  container;*/
  //"ContentChild" : can be used to query : template references, component instance 
  /*@ContentChild(CourseImageComponent, {read : ElementRef})
  container : ElementRef;*/


//using @ContentChildren : to refer many images here for ewample
  @ContentChildren(CourseImageComponent, {read: ElementRef})
  container : QueryList<ElementRef>;
  


//here we say to the attribute the it will send the event with the name "courseSelected" from the local eventEmitter named "courseEmitt" 
  //it's optionnal features, or we use the same name from the two side without need to declare a specification between paretheses ('courseSelected')
@Output('courseSelected')
  courseEmitt = new EventEmitter<Course>();




  //we recieve here the template 
  @Input()
  noImageTpl: TemplateRef<any>;

  constructor(){

  }
  ngAfterContentInit(): void {
    //throw new Error('Method not implemented.');
    console.log(this.container);

  }
  ngAfterViewInit(): void {
    //throw new Error('Method not implemented.');
    console.log(this.container);
  }
  ngOnInit(): void {
   // throw new Error('Method not implemented.');
  }

  onCourseView() {
    //throw new Error('Method not implemented.');
    console.log("card compoennt clickked ...");

    this.courseEmitt.emit(this.course);
    }

    courseImgAvailable(): any {
     // throw new Error('Method not implemented.');
     return this.course && this.course.iconUrl;
      }

      cardClasses(){

        if(this.course.category == 'BEGINNER'){
          return ['beginner'];
        }


       /* return {
          'beginner': this.course.category == 'BEGINNER',
          'course-card': true
        }*/
      }


      /*instead of using the tag img 
      we will use the image as background*/
    
      cardStyles(){
        return {
          'background-image' : 'url('+ this.course.iconUrl +')'
        };
      }
      titleStyles(){
        return {
          'text-decoration' : 'underline'
        };
      }

}


/* --------------- Resume : ViewChild  /  ContentChild -----------*/

/*
<!-- 
    ContentChild :  ++ Used when dealing with content projection and accessing elements or components projected into the component
                    -- Applies to elements projected into the component through <ng-content>.
    ViewChild :     ++ used to access elements or components within the view of the same component
                    -- Restricted to the view of the component where it is used
-->

exple: 
  <!-- html part chez parent -->
  <!-- parent.component.html -->
  <app-child>
    <!-- This content is projected into the app-child component -->
    <app-some-component></app-some-component>
  </app-child>

  #################

  <!-- ts part chez fils -->

    // child.component.ts
    import { Component, ViewChild, ContentChild } from '@angular/core';
    import { SomeComponent } from './some.component';

    @Component({
      selector: 'app-child',
      template: `
        <!-- This is the content area where content is projected -->
        <ng-content></ng-content>

        <!-- ViewChild usage -->
        <app-some-component></app-some-component>
      `,
    })
    export class ChildComponent {
      // Accessing SomeComponent within the view of ChildComponent
      @ViewChild(SomeComponent) viewChildSomeComponent: SomeComponent;

      // Accessing SomeComponent projected into ChildComponent
      @ContentChild(SomeComponent) contentChildSomeComponent: SomeComponent;
    }


*/
