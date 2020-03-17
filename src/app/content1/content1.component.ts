import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content1',
  templateUrl: './content1.component.html',
  styleUrls: ['./content1.component.scss']
})
export class Content1Component implements OnInit {

  constructor() { }

  ngOnInit() {
  }

seeMoreClickHandler(){
  document.getElementById('hide').style.display='block'; 
  document.getElementById('see_more').style.display='none';
}
seeLessClickHandler(){
  document.getElementById('hide').style.display='none';
  document.getElementById('see_more').style.display='block';
}

}
