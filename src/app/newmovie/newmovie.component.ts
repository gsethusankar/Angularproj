import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Movie } from '../model/movie';
import { MovieService } from '../movies/movie.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-newmovie',
  templateUrl: './newmovie.component.html',
  styleUrls: ['./newmovie.component.css']
})
export class NewmovieComponent implements OnInit {
  private destroy$ = new Subject<void>();


  movie: Movie;

  constructor(
    private movieService: MovieService,
    private router: Router,
    private alertService: AlertService
  ) {
    this.movie = new Movie();
  }

  ngOnInit() {
  }

  addMovie(): void {
    this.movieService.createMovie(this.movie).pipe(takeUntil(this.destroy$)).subscribe(
        res => {
          console.log(res);
          this.router.navigateByUrl("/movies");
        },
        error => {
          console.log(error);
          this.alertService.error("Error during movie create.")
        });
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}