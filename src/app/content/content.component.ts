import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { Meta, Title } from '@angular/platform-browser';
import { postIndex } from '../../posts/post-index';
import { ActivatedRoute } from '@angular/router';
import { config } from '../../config';

@Component({
  selector: 'app-content',
  templateUrl: 'content.component.html'
})
export class ContentComponent implements OnInit {
  public post: Post;
  public disqusEnabled = config.disqusName;

  constructor (private activatedRoute: ActivatedRoute,
               private title: Title,
               private meta: Meta) {
  }

  // TODO: include metadata and other seo optimizations
  ngOnInit () {
    this.activatedRoute.params.subscribe((val) => {
      this.post = postIndex.find((p) => p.slug === val.name);
      if (this.post) {
        this.title.setTitle(this.post.title);
      }
    });
  }
}
