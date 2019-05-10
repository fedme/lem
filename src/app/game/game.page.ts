import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { LemService } from '../services/lem/lem.service';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/common/app.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss']
})
export class GamePage implements OnInit {

  exclusionCounter: number = 0;
  questionCounter: number = 0;
  revealedTarget: boolean = false;
  nextConfirmed: boolean = false;

  constructor(
    public lem: LemService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private translate: TranslateService,
    public app: AppService
  ) {
    this.lem.setupExperiment(); // TODO: REMOVE!
  }

  ngOnInit() {
  }

  async next() {

    this.navCtrl.navigateRoot('/exp-notes');

  }

  revealTarget() {
    // let alert = this.alertCtrl.create({
    //   title: 'Reveal target?',
    //   message: 'Are you sure you want to reveal the target?',
    //   buttons: [
    //     {
    //       text: 'Yes, reveal',
    //       handler: () => {
    //         this.revealedTarget = true;
    //       }
    //     },
    //     {
    //       text: 'Cancel',
    //       role: 'cancel',
    //       handler: () => {}
    //     }
    //   ]
    // });
    // alert.present();
  }

  unrevealTarget() {
    this.revealedTarget = false;
  }

  stimClicked(stim: string) {

  //   if (this.mode == Mode.View && !stim.excluded) {
  //     return;
  //   }

  //   if (this.stimuli.targetStim.excluded && !stim.isTarget && !stim.excluded) {
  //     let toast = this.toastCtrl.create({
  //       message: 'Target stimuli already found',
  //       duration: 3000,
  //       position: 'bottom'
  //     });
  //     return toast.present();
  //   }
     
  //   if (!stim.excluded) {
  //     this.exclusionCounter++;
  //     return stim.exclude(
  //       this.exclusionCounter, 
  //       this.mode, 
  //       this.questionCounter, 
  //       this.guessCounter,
  //       this.queryCounter
  //     );
  //   }
    
  //   let alert = this.alertCtrl.create({
  //     title: 'Re-include?',
  //     message: 'Do you want to include back ' + stim.id + '?',
  //     buttons: [
  //       {
  //         text: 'Yes, re-include',
  //         handler: () => {
  //           stim.cancelExclude();
  //         }
  //       },
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {}
  //       }
  //     ]
  //   });
  //   alert.present();
  }

}
