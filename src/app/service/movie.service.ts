import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Icourse } from '../model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {


  BASE_URL :string = environment.BASE_URL

  COURSE_URL :string = `${this.BASE_URL}/course.json`

  private  NewCourseSub$ : Subject<Icourse> = new Subject<Icourse>()
  private removeCourseSub$ : Subject<string> = new Subject<string>()
  private editCourseSub$ : Subject<Icourse> = new Subject<Icourse>()
  private updateCourseSub$ :  Subject<Icourse> = new Subject<Icourse>()

   NewCourseObs$ : Observable<Icourse> = this.NewCourseSub$.asObservable()
   removeCourseObs$ : Observable<string> = this.removeCourseSub$.asObservable()
   editCourseObs$ : Observable<Icourse> = this.editCourseSub$.asObservable()
   updateCourseObse$ : Observable<Icourse> = this.updateCourseSub$.asObservable()

  constructor(
    private _http : HttpClient
  ) { }

  setupdateCourse(course :Icourse){
    this.updateCourseSub$.next(course)
  }

  setEditCourse (course:Icourse){
    this.editCourseSub$.next(course)
  }

  setremoveCourse(id:string){
    this.removeCourseSub$.next(id)
  }

  setNewCourse(course :Icourse){
    this.NewCourseSub$.next(course)
  }



  fetchCourse(){
    return this._http.get<any>(this.COURSE_URL)
       .pipe(
        map(obj =>{
          let courseArr : Array<Icourse> =[]
          for (const key in obj) {
             courseArr.unshift({...obj[key],id:key})
          }
          return courseArr
        })
       )
  }

   createCourse (courseObj : Icourse){
    return this._http.post<any>(this.COURSE_URL,courseObj)
   }

   updateCourse(updateObj:Icourse){
         let UPDATE_URL :string = `${this.BASE_URL}/course/${updateObj.id}.json`
         return this._http.patch(UPDATE_URL,updateObj)
   }

    removeCourse(id :string){
      let REMOVE_URL : string =`${this.BASE_URL}/course/${id}.json`

      return this._http.delete(REMOVE_URL)
    }
}
