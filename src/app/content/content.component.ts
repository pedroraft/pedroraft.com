import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { Meta, Title } from '@angular/platform-browser';
import { postIndex } from '../../posts/post-index';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html'
})
export class ContentComponent implements OnInit {
  public post: Post;

  constructor (private title: Title,
               private meta: Meta) {
  }

  // TODO: include metadata and other seo optimizations
  ngOnInit () {
    // take the url http://localhost:4200/#/post/file
    // the window.location.hash = #/post/file
    // after substring = file
    this.post = postIndex.find((p) => p.slug === window.location.hash.substring(7));
    if (this.post) {
      this.title.setTitle(this.post.title);
    }
  }
}
