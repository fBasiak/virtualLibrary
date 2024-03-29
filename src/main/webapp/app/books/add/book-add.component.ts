import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';

import SharedModule from 'app/shared/shared.module';
import {Book} from "../../core/auth/boook.model";
import {BookService} from "../../core/auth/book.service";
import {SortByDirective, SortDirective} from "../../shared/sort";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  standalone: true,
  selector: 'jhi-book-add',
  templateUrl: './book-add.component.html',
  styleUrl: './book-add.component.scss',
  imports: [SharedModule, RouterModule, SortDirective, SortByDirective],
})
export default class BookAddComponent implements OnInit, OnDestroy {
  book: Book | null = null;

  private readonly destroy$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    // this.bookService
    //   .subscribe(book => (this.book = book));
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
