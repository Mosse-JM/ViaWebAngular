import { Component, OnInit } from '@angular/core';
import {DataService} from '../_services/data.service';
import { Observable} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  user$: Object;

  constructor(private data: DataService, private route: ActivatedRoute) { 
    this.route.params.subscribe( params => this.user$ = params.id)
  }

  ngOnInit() {
    this.data.getUser(this.user$).subscribe(
      data => this.user$ = data
    )
  }

}
