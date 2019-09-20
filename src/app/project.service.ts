import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { projects } from './projects';

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
  private projects: Array<Project> = projects;
  constructor() { }

  add(project: Project): Observable<Project> {
    this.projects.push(project);
    return of(project);
  }

  edit(project: Project): Observable<Project> {
    this.projects.map(oldProject => oldProject.id === project.id ? project : oldProject);
    return of(project);
  }

  delete(project: Project): Observable<Project> {
    this.projects.filter(oldProject => oldProject.id !== project.id);
    return of(project);
  }

  get(id: number): Observable<Project> {
    return of(this.projects.find(project => project.id === id));
  }

  getAll(page: number, size: number): Observable<Array<Project>> {
    return of(this.projects.slice(page * size)).pipe(delay(5000));
  }
}
