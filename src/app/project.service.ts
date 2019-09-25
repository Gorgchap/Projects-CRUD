import { Injectable } from '@angular/core';
import { isMoment, Moment } from 'moment';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { projects } from './projects';

export interface Project {
  id: number;
  name: string;
  date_begin: Date | Moment;
  date_end: Date | Moment;
  cost: number;
  comment?: string;
  disabled: boolean;
}

export interface ProjectResponse {
  total: number;
  page: number;
  size: number;
  data: Array<Project>;
}

@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects: Array<Project> = projects;
  constructor() { }

  add(project: Project): Observable<Project> {
    project.id = this.projects.reduce((accum: number, cur: Project) => cur.id > accum ? cur.id : accum, 0) + 1;
    if (isMoment(project.date_begin)) {
      project.date_begin = project.date_begin.toDate();
    }
    if (isMoment(project.date_end)) {
      project.date_end = project.date_end.toDate();
    }
    this.projects.push(project);
    return of(project).pipe(delay(1000));
  }

  edit(project: Project): Observable<Project> {
    if (isMoment(project.date_begin)) {
      project.date_begin = project.date_begin.toDate();
    }
    if (isMoment(project.date_end)) {
      project.date_end = project.date_end.toDate();
    }
    this.projects = this.projects.map(oldProject => oldProject.id === project.id ? project : oldProject);
    return of(project).pipe(delay(1000));
  }

  delete(project: Project): Observable<Project> {
    this.projects = this.projects.filter(oldProject => oldProject.id !== project.id);
    return of(project).pipe(delay(1000));
  }

  get(id: number): Observable<Project> {
    return of(this.projects.find(project => project.id === id));
  }

  getProjects(page: number, size: number): Observable<ProjectResponse> {
    return of({
      total: this.projects.length, page, size,
      data: this.projects.slice(page * size, (page + 1) * size)
    }).pipe(delay(1000));
  }
}
