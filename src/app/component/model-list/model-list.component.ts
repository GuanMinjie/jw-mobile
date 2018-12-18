import { Component, OnInit, HostListener } from '@angular/core';
import { Model } from '../../class/model';
import { ModelDataService } from '../../service/model-data.service';
import { LoadingController } from '../../../../node_modules/@ionic/angular';
import { Router } from '../../../../node_modules/@angular/router';

@Component({
  selector: 'app-model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.scss']
})
export class ModelListComponent implements OnInit {
   models: Model[];
   color: string = 'black';
  constructor( private modelDataService: ModelDataService,
               public loadingController: LoadingController,
               private router: Router) { }

  ngOnInit() {
    this.getModelList();
  }

  getModelList() {
    
    this.modelDataService.getModelList().subscribe( (models) => { 
                                      this.models = models; 
                                    })                           
  }
  async presentLoading() {
    const loading = await this.loadingController.create({
      message: '数据加载中',
      duration: 2000
    });
    return await loading.present();
  }

  showImage(id) {
    this.router.navigate([`/models`,{id: id, type: 'image'}])
  }

  showStdModel(id) {
    this.router.navigate([`/models`,{id: id, type: 'stdModel'}])
  }

  showModel(id) {
    this.router.navigate([`/models`,{id: id, type: 'model'}])
  }

}
