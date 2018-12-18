import { Component, OnInit, Input } from '@angular/core';
import { TrackballControls, OBJLoader } from 'three-full';
import * as THREE from 'three';
@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnInit {

  @Input() modelPath: string;
  @Input() texturePath: string;
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.PerspectiveCamera;
  trackballControls: TrackballControls;

  constructor() { }

  ngOnInit() {
    this.initScene() 
    this.loadModel(this.modelPath,this.texturePath)
  }

  // 初始化场景
  initScene() {
    this.scene = new THREE.Scene();
    this.renderer = new THREE.WebGLRenderer();
    document.getElementById('showModel').appendChild(this.renderer.domElement);
    this.renderer.setClearColor(0xffffff);
    let light = new THREE.DirectionalLight(0xffffff, 1);
    this.renderer.setSize(350, 400);
    this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.trackballControls = new TrackballControls(this.camera);
    this.scene.add(this.camera);
    this.camera.position.set(0, 0, 8);
    this.scene.add(light);
    this.update();
  }

  /**
   * 读取模型文件
   * @param path 模型文件的路径 
   * @param texturePath 纹理贴图路径
   */
  private loadModel(path: string, texturePath: string = null) {
    let loader = new OBJLoader();
    let material = new THREE.MeshPhongMaterial();
    if (texturePath) {
      material.map = new THREE.TextureLoader().load(texturePath)
    }
    loader.load( path, (obj)  => {
      for (let i = 0; i < obj.children.length; i++) {
        obj.children[i].material = material;
      }
      obj.setRotationFromAxisAngle( new THREE.Vector3(1,0,0),-Math.PI/2);
      obj.scale.set(0.001, 0.001, 0.001);
      this.scene.add(obj);
    }
    )
  }

  /**
   * 更新场景
   */
  update = () => {
    this.renderer.render(this.scene, this.camera);
    this.trackballControls.update();
    requestAnimationFrame(this.update);
  }

}
