import { Component, OnInit, OnDestroy } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', this.scroll, true);
  }

  ngOnDestroy(){
    window.removeEventListener('scroll', this.scroll);
  }

  scroll = (): void => {

    if(document.getElementById("myImg")){
      if (document.documentElement.clientWidth > 970){
        if (document.body.scrollTop > 130 || document.documentElement.scrollTop > 130) {
        document.getElementById("myImg").className = "blur";
        } else {
        document.getElementById("myImg").className = "";
        }
      } else{
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 30) {
        document.getElementById("myImg").className = "blur";
        } else {
        document.getElementById("myImg").className = "";
        }
      } 
    }
    
  };

}
