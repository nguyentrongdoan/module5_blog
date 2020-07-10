import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {PostService} from '../post.service';
import {IPost} from '../IPost';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.scss']
})
export class BlogEditComponent implements OnInit {
  post: IPost;
  postForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private postService: PostService,
              private fb: FormBuilder,
              private router: Router) { }

  ngOnInit(): void {
    this.postForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(10)]],
      body: ['', [Validators.required, Validators.minLength(10)]]
    });
    const id = +this.route.snapshot.paramMap.get('id');
    this.postService.getPostById(id).subscribe(
      next => {
        this.post = next;
        this.postForm.patchValue(this.post);
      },
      error => {
        console.log(error);
        this.post = null;
      }
    );
  }
  // tslint:disable-next-line:typedef
  onSubmit() {
    if (this.postForm.valid) {
      const {value} = this.postForm;
      const data = {
        ...this.post,
        ...value
      };
      this.postService.updatePost(data).subscribe(
        next => {
          this.router.navigate(['/blog']);
        },
        error => console.log(error)
      );
    }
  }
}
