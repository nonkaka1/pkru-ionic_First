import { Component } from '@angular/core';
import { ModalController,NavController } from 'ionic-angular';
import { AddItemPage } from '../add-item/add-item'
import { ViewItemPage } from '../view-item/view-item';
import { DataProvider } from '../../providers/data/data';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //items = [];
  items:any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController,public dataProvider: DataProvider) {this.dataProvider.getData().then((todos) => {
    if(todos){
      this.items = todos;
    }
  });
}

  ngOnInit(){
    this.items = [
      {title: 'RoseSkeleton', description: 'test1'},
      {title: 'RoseDale', description: 'test2'},
      {title: 'RoseBlue', description: 'test3'}
    ];
  }

  /*addItem(){
    this.navCtrl.push(AddItemPage);
  }*/
  addItem(){
    let addModal = this.modalCtrl.create(AddItemPage);
    addModal.onDidDismiss((item) => { //onDidDismiss ส่งค่า Item กลับ
      if(item){
        this.saveItem(item);
      }
    });
    addModal.present();
  }
  saveItem(item){   //save จะอยู่ตรงนี้
    this.items.push(item);
    this.dataProvider.save(this.items);

  }

  viewItem(item){
    this.navCtrl.push(ViewItemPage,{item:item});
}

 
}
