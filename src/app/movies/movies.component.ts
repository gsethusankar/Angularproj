import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { MovieService } from './movie.service';
import { Movie } from '../model/movie';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  private destroy$ = new Subject<void>();


  movies: Movie[];

  constructor(
    private movieService: MovieService
  ) { }

  ngOnInit() {
    this.movieService.getMovies().pipe(takeUntil(this.destroy$)).subscribe(
      ms => {
        this.movies = ms;
        this.movies.forEach(movie => {
          movie.warnAt = 10;
        });
      }
    );
  }


  showMovieAfter(event: any): void {
    event.preventDefault();
    let id = event.target.id.substr("warn_".length);
    let movie = this.findMovie(id);
    console.log("movie.warnAt: " + movie.warnAt);
    setTimeout(() => { alert(`alert('Hey! You asked us to remind you about your movie: ${movie.title}');`); }, movie.warnAt*1000);
  }

  private findMovie(id: String){
    return this.movies.find(m => m.id === id);
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}