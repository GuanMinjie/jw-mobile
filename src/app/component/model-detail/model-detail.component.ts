import { Component, OnInit } from '@angular/core';
import { Model } from '../../class/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { ModelDataService } from '../../service/model-data.service';
import vtkRenderOBJ from '../../class/vtkOBJRender';
import apiConfig from '../../config/api-config';

@Component({
  selector: 'app-model-detail',
  templateUrl: './model-detail.component.html',
  styleUrls: ['./model-detail.component.scss']
})
export class ModelDetailComponent implements OnInit {

  // 当前模型
  currentModel: Model;
  // 模型是否可以交互
  canInteractor: Boolean = true;
  // 页面显示类型
  showType: string
  // 类型为image时，图片的数量
  countImage: number = 1;
  // 类型为image时，当前显示图片的索引
  currentImageIndex: number = 0;

  asstesHost = apiConfig.assets
  constructor(private route: ActivatedRoute,
    private modelService: ModelDataService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit() {
    this.getModel();
  }

  // 获取当前模型
  getModel() {
    const id: number = +this.route.snapshot.paramMap.get('id');
    const type: string = this.route.snapshot.paramMap.get('type');
    this.modelService.getModel(id)
      .subscribe(model => {
        let { id, description, time, phone_model_urls: phoneModelUrl, pc_model_urls: pcModelUrl, dicom_image_urls: dicomImages, std_model_url: stdModelPath } = model;
        let model1 = { id, description, time, phoneModelUrl, pcModelUrl, dicomImages, stdModelPath };
        this.currentModel = model1;
        this.showContentByType(type)
        this.showType = type;
        this.countImage = dicomImages.length;
      })
  }

  //监听滑动条变化
  changeImage(index) {
    this.currentImageIndex = index - 1;
    let src = this.asstesHost + this.currentModel.dicomImages[this.currentImageIndex];
    document.getElementById('dicom').setAttribute('src', src)
  }

  /**
   * 根据类型显示不同的内容
   * @param type 显示类型
   */
  showContentByType(type: string) {
    switch (type) {
      case "image":
        this.showImage(0);
        break;
      case "stdModel":
        this.showModel(document.querySelector('#showModel'), [this.currentModel.stdModelPath]);
        break;
      case "model":
        this.showModel(document.querySelector('#showModel'), this.currentModel.phoneModelUrl);
        break;
    }
  }

  // 显示CT图像
  showImage(index) {
    let img: HTMLImageElement = document.createElement("img");
    img.id = "dicom";
    img.src = this.asstesHost + this.currentModel.dicomImages[index];
    img.setAttribute("style","margin-top: 20%;")
    document.querySelector('#showModel').appendChild(img);
    this.addEventForImage(img)
  }

  /**
   * 为图像添加事件
   * @param img IMG Dom
   */
  addEventForImage(img: HTMLImageElement) {
    let clientX_start , clientX_end,  minRange = 10;
    img.addEventListener("touchstart", (e) => {
      clientX_start = e.touches[0].clientX;
    }, false)
    img.addEventListener("touchmove", (e)=> {
      clientX_end = e.changedTouches[0].clientX;
    }, false)
    img.addEventListener("touchend", (e) => {
      if (clientX_start + minRange < clientX_end) {
        this.currentImageIndex < this.countImage-1 ? this.currentImageIndex += 1 : this.currentImageIndex = this.countImage-1
      }
      else if (clientX_start - minRange > clientX_end) {
        this.currentImageIndex > 0 ? this.currentImageIndex -= 1 : this.currentImageIndex = 0
      }
      this.changeImage(this.currentImageIndex + 1)
    }, false)
  }

  /**
   * 改变模型的不透明度
   */
  changeOpacity(value: number) {
    global["actors"][0].getProperty().setOpacity(1 - value);
    global["render"].render();
  }

  /**
   * 交互开关
   */
  toggleInteractor() {
    if (this.canInteractor) {
      global["render"].getInteractor().disable();
      this.canInteractor = !this.canInteractor
    } else {
      global["render"].getInteractor().enable();
      this.canInteractor = !this.canInteractor
    }
  }

  // 返回
  goback() {
    this.router.navigate(["/home"])
  }

  loading = true
  callback = () => {
    this.loading = false;
  }

  showModel(el: Element, url: string[]) {
    vtkRenderOBJ(el, url, this.callback);
  }


}
