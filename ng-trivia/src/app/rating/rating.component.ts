import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  activeLink: string;

  links = [
    { path: 'leader', label: 'LEADER BOARD' },
    { path: 'question', label: 'QUESTION BOARD' }
  ];

  constructor(private route: Router) {
  }

  ngOnInit(): void {
    this.activeLink = this.route.url.split('/').slice(-1)[0];
  }

}
