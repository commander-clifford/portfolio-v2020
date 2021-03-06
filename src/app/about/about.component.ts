import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Project } from '../project/project';
import { ProjectService } from '../project/project.service';
import { OrderPipe } from 'ngx-order-pipe';

// Contentful Dependancies
import { ContenfulApiService } from '../contenful-api.service';
import { Entry } from 'contentful';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})

export class AboutComponent implements OnInit {

  public isDataAvailable: boolean = false;
  public projects: object;
  public selectedProject: Project;
  public projects_cda: Entry<any>[] = []; // define a private class property to the class which defines that this component will include a collection of several projects
  public blogPosts_cda: Entry<any>[] = []; // define a private class property to the class which defines that this component will include a collection of several projects
  public aboutPage_cda: Entry<any>; // define a private class property to the class which defines that this component will include a collection of several projects

  constructor(

    public route: ActivatedRoute,
    public location: Location,
    public router: Router,
    public projectService: ProjectService,
    public contentfulApiService: ContenfulApiService,

  ) { }

  getProjects(): void {
    // this.projects = this.projectService.getProjects();

    // the contenful way
    this.contentfulApiService.getTopProjects()
      .then(projects_cda => this.projects_cda = projects_cda)
      .then(projects_cda => console.log('** Portfolio pieces:',projects_cda));

    this.contentfulApiService.getBlogPosts()
      .then(blogPosts_cda => this.blogPosts_cda = blogPosts_cda)
      .then(blogPosts_cda => console.log('** Blog Posts:',blogPosts_cda));

    this.contentfulApiService.getAboutPage()
      .then(aboutPage_cda => this.aboutPage_cda = aboutPage_cda[0])
      .then(aboutPage_cda => console.log('** About Page:',this.aboutPage_cda))
      .then(() => this.loadPage());

  }

  loadPage(){
    setTimeout(function(){
      this.isDataAvailable = true;
    }.bind(this), 40);
  }

  ngOnInit() {
    this.getProjects();
  }

  goBack(): void {
    this.location.back();
  }

}
