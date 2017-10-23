import { Post } from '../app/content/post.model';
import { blogSeries } from './blog-series/blog-series';
import { random } from './random/random';

export const postIndex: Post[] = []
  .concat(random)
  .concat(blogSeries)
;
