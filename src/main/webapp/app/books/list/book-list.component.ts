import { Component, OnInit, OnDestroy } from '@angular/core';
import {ActivatedRoute, Router, RouterModule} from '@angular/router';
import {combineLatest, Subject} from 'rxjs';

import SharedModule from 'app/shared/shared.module';
import {Book} from "../../core/auth/boook.model";
import {BookService} from "../../core/auth/book.service";
import {SortByDirective, SortDirective} from "../../shared/sort";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ASC, DESC, SORT} from "../../config/navigation.constants";
import {ITEMS_PER_PAGE} from "../../config/pagination.constants";
import {NgForOf, NgIf} from "@angular/common";
import {User} from "../../admin/user-management/user-management.model";
import {HttpHeaders, HttpResponse} from "@angular/common/http";
import {IBook} from "../book.model";
import {AccountService} from "../../core/auth/account.service";
import {Account} from "../../core/auth/account.model";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  standalone: true,
  selector: 'jhi-book-list',
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.scss',
  imports: [SharedModule, RouterModule, SortDirective, SortByDirective, NgForOf, NgIf, FaIconComponent],
})
export default class BookListComponent implements OnInit, OnDestroy {
  book: Book | null = null;
  books: IBook[] | null = null;
  predicate!: string;
  ascending!: boolean;
  isLoading = false;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  currentAccount: Account | null = null;
  isAdmin: boolean = false;


  private readonly destroy$ = new Subject<void>();

  constructor(
    private bookService: BookService,
    private router: Router,
    private modalService: NgbModal,
    private activatedRoute: ActivatedRoute,
    private accountService: AccountService,
  ) {}

  ngOnInit(): void {
    this.accountService.identity().subscribe(account => (this.currentAccount = account));
    this.handleNavigation();
    this.checkIsAdmin(this.currentAccount);
  }

  checkIsAdmin(account: Account | null): void{
    if(account?.authorities.filter(e => e == "ROLE_ADMIN")){
      this.isAdmin = true;
    }
  }

  private handleNavigation(): void {
    combineLatest([this.activatedRoute.data, this.activatedRoute.queryParamMap]).subscribe(([data, params]) => {
      const page = params.get('page');
      this.page = +(page ?? 1);
      const sort = (params.get(SORT) ?? data['defaultSort']).split(',');
      this.predicate = sort[0];
      this.ascending = sort[1] === ASC;
      this.loadAll();
    });
  }

  private loadAll(): void {
    this.isLoading = true;
    this.bookService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe({
        next: (res: HttpResponse<IBook[]>) => {
          this.isLoading = false;
          this.onSuccess(res.body, res.headers);
        },
        error: () => (this.isLoading = false),
      });
  }

  private onSuccess(books: IBook[] | null, headers: HttpHeaders): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.books = books;
  }

  private sort(): string[] {
    const result = [`${this.predicate},${this.ascending ? ASC : DESC}`];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  bringBook(id: number): void{
    this.bookService.bringBook(id);
  }


  transition(): void {
    this.router.navigate(['./'], {
      relativeTo: this.activatedRoute.parent,
      queryParams: {
        page: this.page,
        sort: `${this.predicate},${this.ascending ? ASC : DESC}`,
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
