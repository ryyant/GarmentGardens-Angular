import { Component, OnInit } from '@angular/core';
import { RatingResourceService } from 'src/app/services/rating-resource.service';
import { SessionService } from 'src/app/services/session.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Rating } from 'src/app/models/rating';


@Component({
  selector: 'app-view-all-ratings',
  templateUrl: './view-all-ratings.component.html',
  styleUrls: ['./view-all-ratings.component.css']
})
export class ViewAllRatingsComponent implements OnInit {

  ratings: Rating[];


  retrieveRatingError: boolean;
  retrieveRatingMessageError: string;
  productId: string | null;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    public sessionService: SessionService,
    private ratingService: RatingResourceService) {
      this.ratings = new Array();
      this.productId = null;
      this.retrieveRatingError = false;
      this.retrieveRatingMessageError ="";

    }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId');
    if (this.productId != null) {
      this.ratingService.getRatingsForProduct(parseInt(this.productId)).subscribe({
        next: (response) => {
          this.ratings = response;
        },
        error: (error) => {
          this.retrieveRatingError = true;
          this.retrieveRatingMessageError = error;
        }
      });
    }
  }

  parseDate(d: Date | undefined)
  {		
    if(d != null)
    {
        return d.toString().replace('[UTC]', '');
    }
    else
    {
        return '';
    }
  }

}
