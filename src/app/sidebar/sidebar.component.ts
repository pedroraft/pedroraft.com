import { Component, OnInit } from '@angular/core';
import { config } from '../../config';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
})
export class SidebarComponent implements OnInit {
  links = config.sidebarLinks;
  funnyStrings = config.sidebarFunnyStrings;
  blogName = config.blogName;
  funnyString: string;

  constructor () {
  }

  ngOnInit () {
    this.funnyString = this.funnyStrings[Math.floor(Math.random() * this.funnyStrings.length)];
  }

}
