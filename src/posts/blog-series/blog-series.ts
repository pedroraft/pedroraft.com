import { Post } from '../../app/content/post.model';

const path = 'blog-series';

export const blogSeries: Post[] = [
  {
    title: 'How to setup Travis CI with Angular and GitHub Pages',
    date: new Date('10/18/2017'),
    thumb: '/assets/logo/travis-ci.png',
    tags: ['angular', 'github', 'travis-ci'],
    slug: 'setup-travis-ci-angular-github-pages',
    path: path
  },
 /*{
    title: 'How to copy this blog for yourself',
    date: new Date('10/19/2017'),
    tags: [],
    slug: 'how-to-copy-this-blog-for-yourself',
    path: path
  },*/
  {
    title: 'Making my blog with angular and github pages like Jekyll',
    date: new Date('11/12/1996'),
    thumb: '/assets/logo/angular.png',
    tags: ['angular', 'github', 'sass', 'milligram'],
    slug: 'making-my-blog-angular-github-pages',
    path: path
  },
];
