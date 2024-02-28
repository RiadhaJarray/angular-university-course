import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Course } from '../model/course';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

let counter : number = 0;

//with options here : the service is instentiated only when it is called 
@Injectable({
  providedIn: 'root' //singleton : means that we should create an instance and one instance and make it available to the root of the application
                      //that instance will be available for all the app 
                    //we will remove this to create the provider ourselves
})
export class CoursesService {

  id : number;
  constructor(private http : HttpClient) {
    counter++;
    this.id = counter;
    console.log("creating courseService");
   }

  loadCourses(): Observable<Course[]>{
    const params = new HttpParams()
              .set("page", "1")
              .set("pageSize", "10");

    return this.http.get<Course[]>('/api/courses', {params});
    
  }


  saveCourse(course : Course){

    const headers = new HttpHeaders()
      .set("X-Auth", "userId");

    return this.http.put(`/api/courses/${course.id}`, course, {headers});
  }
}


//no state = tree schakeable providers at the level of the service it self
//with state = using providers property at the level of the component declaration
