import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { ModelDataService } from '../../service/model-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-model-info',
  templateUrl: './model-info.page.html',
  styleUrls: ['./model-info.page.scss'],
})
export class ModelInfoPage implements OnInit {

  constructor(private route: ActivatedRoute,
    private modelService: ModelDataService,
    private location: Location,
    private router: Router
  ) { }

  modelId

  ngOnInit() {
    this.getModel()
  }

    // 获取当前模型
    getModel(){
      const id: number = +this.route.snapshot.paramMap.get('id');
      this.modelId = id;
    }
  
  showImage() {
    this.router.navigate([`/models`,{id: this.modelId, type: 'image'}])
  }

  showStdModel() {
    this.router.navigate([`/models`,{id: this.modelId, type: 'stdModel'}])
  }

  showModel() {
    this.router.navigate([`/models`,{id: this.modelId, type: 'model'}])
  }
}
