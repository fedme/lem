import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LemService } from '../services/lem/lem.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss']
})
export class IntroPage implements OnInit {


  constructor(
    public lem: LemService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    public app: AppService
  ) {
    // this.lem.setupExperiment(); // TODO: REMOVE!
  }

  ngOnInit() {
  }

  async next() {

    this.navCtrl.navigateRoot('/game');

  }

}
