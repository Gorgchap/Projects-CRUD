import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Project {
  id: number;
  name: string;
  date_begin: Date;
  date_end: Date;
  cost: number;
  comment?: string;
  disabled: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private projects: Array<Project> = [
    {
      id: 1,
      name: 'LimeTime',
      date_begin: new Date(2018, 10, 1),
      date_end: new Date(2019, 11, 25),
      cost: 500000.00,
      comment: 'Attempt to substitute JIRA',
      disabled: true
    },
    {
      id: 2,
      name: 'Something',
      date_begin: new Date(2017, 1, 1),
      date_end: new Date(2017, 1, 28),
      cost: 100000.00,
      disabled: false
    }
  ];
  constructor() { }

  add(project: Project): Observable<Array<Project>> {
    this.projects.push(project);
    return of(this.projects);
  }

  edit(project: Project): Observable<Array<Project>> {
    return of(this.projects.map(oldProject => oldProject.id === project.id ? project : oldProject));
  }

  get(id: number): Observable<Project> {
    return of(this.projects.find(project => project.id === id));
  }

  getAll(): Observable<Array<Project>> {
    return of(this.projects).pipe(delay(5000));
  }
}
