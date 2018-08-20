import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';

@Component({
  selector: 'app-evaluation-topic',
  templateUrl: './evaluation-topic.component.html',
  styleUrls: ['./evaluation-topic.component.scss']
})
export class EvaluationTopicComponent implements OnInit {

  topicId;

  constructor(private activeRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.activeRoute.params.subscribe((param) => {
      console.log(param);
      this.topicId = param['id'];
    });
  }

}
