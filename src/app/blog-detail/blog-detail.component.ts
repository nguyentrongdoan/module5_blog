import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PostService} from '../post.service';
import {error} from '@angular/compiler/src/util';
import {IPost} from '../IPost';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {
  post: IPost;

  constructor(private route: ActivatedRoute,
              private postService: PostService) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => (this.post = next),
      // tslint:disable-next-line:no-shadowed-variable
        error => {
        console.log(error);
        this.post = null;
      }
    );
  }
}
