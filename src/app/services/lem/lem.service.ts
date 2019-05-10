import { Injectable } from '@angular/core';
import { IExperiment } from '../common/experiment.interface';
import { Condition, TestBattery} from './models';
import { Utils } from '../common/utils';
import { SourceNode } from 'source-list-map';

@Injectable({
  providedIn: 'root'
})
export class LemService implements IExperiment {

  condition: Condition;
  testBattery: TestBattery;
  experimenterNotes: string;

  constructor() { }

  public setupExperiment(): void {
    console.log('[lemService] setupExperiment()');
    this.resetData();
    this.chooseCondition();
    this.setupPracticeAndTest();
    //this.loadSounds();
  }

  public resetData() {
    this.condition = null;
    this.testBattery = null;
    this.experimenterNotes = null;
  }

  setupPracticeAndTest() {
    this.testBattery = TestBattery.getDefault(this.condition.yokedType);
  }

  chooseCondition() {

    // Get condition ids from local storage
    let ids = [];
    try {
      ids = JSON.parse(localStorage.getItem('isrc-lem-conds'));
    } catch (error) {
      console.log('Error parsing condition ids from json', error);
    }

    // If not present, set initial condition ids
    if (ids == null || ids.length === 0) {
      ids = this.setInitialConditions();
    }

    // Shuffle the condition ids
    ids = Utils.getShuffledCopy(ids);

    // Pick condition
    const conds = Condition.getAll();
    const id = ids.shift();
    this.condition = conds[id];

    // Update condition ids in local storage
    localStorage.setItem('isrc-lem-conds', JSON.stringify(ids));

    console.log('[lemService] Condition chosen', this.condition);

  }

  setInitialConditions(): number[] {
    // Save an array with 20 possible condition ids to local Storage
    let ids = Array(10).fill(0).concat(Array(10).fill(1).concat(Array(10).fill(2)));
    ids = Utils.getShuffledCopy(ids);
    localStorage.setItem('isrc-lem-conds', JSON.stringify(ids));
    return ids;
  }

  public getExperimentData() {

    const data = {
      condition: this.condition,
      test: this.testBattery,
      notes: this.experimenterNotes
    };

    return data;
  }

}
