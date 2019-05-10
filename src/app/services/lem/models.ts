import { Utils } from '../common/utils';

export class Stim {
    id: string;
    excluded: boolean = false;
    isTarget: boolean = false;

    exclusionOrder: number;
    questionNumber: number;
  
    constructor(id: string) {
      this.id = id;
    }
  
    exclude(exclusionOrder: number, questionNumber: number) {
      this.excluded = true;
      this.exclusionOrder = exclusionOrder;
      this.questionNumber = questionNumber;
    }

    cancelExclude() {
      this.excluded = false;
      this.exclusionOrder = null;
      this.questionNumber = null;
    }
  
    get borderColor() {
      if (this.excluded && !this.isTarget)
        return 'red';
      if (this.excluded && this.isTarget)
        return 'green';
      return 'gray';
    }

    public equals(obj: Stim): boolean {
        return this.id === obj.id;
    }
}

export class ItemSet {
    id: number;
    targets: Stim[];
    distractors: Stim[];
}

export const SETS: ItemSet[] = [
    {
        id: 1,
        targets: [new Stim('Apple1'), new Stim('Clownfish1'), new Stim('dasiy2'), new Stim('Owl2'), new Stim('Parrot1'), new Stim('Pine2'), new Stim('Shark2'), new Stim('tulip1')],
        distractors: [
            new Stim('Apple2'), new Stim('dasiy1'), new Stim('goldfish1'), new Stim('oak tree'), new Stim('octopus'), new Stim('owl1'), new Stim('palm tree'), new Stim('Parrot2'),
            new Stim('Parrot3'), new Stim('Pine1'), new Stim('robin'), new Stim('Rose1'), new Stim('Shark3'), new Stim('Sunflower2'), new Stim('swan'), new Stim('tulip2'), new Stim('tulip3'), new Stim('turtle')
        ]
    },
    {
        id: 2,
        targets: [new Stim('blueberries'), new Stim('boot'), new Stim('green_apple'), new Stim('jumper'), new Stim('raspberry'), new Stim('sandal'), new Stim('Tshirt'), new Stim('yellow_apple')],
        distractors: [
            new Stim('banana'), new Stim('blackberry'), new Stim('boot2'), new Stim('cardigan'), new Stim('cherries'), new Stim('coat'), new Stim('coconut'), new Stim('cranberries'), new Stim('dress'),
            new Stim('flipflop'), new Stim('grapes_purple'), new Stim('grapes_yellow'), new Stim('orange'), new Stim('peach'), new Stim('pear'), new Stim('sandal2'), new Stim('slipper'),
            new Stim('sneaker'), new Stim('strawberry'), new Stim('tanktop')
        ]
    },
    {
        id: 3,
        targets: [new Stim('aeroplane'), new Stim('bus'), new Stim('car'), new Stim('desk'), new Stim('dining table'), new Stim('helicopter'), new Stim('rocking chair'), new Stim('stool')],
        distractors: [
            new Stim('armchair'), new Stim('bike'), new Stim('car2'), new Stim('desk2'), new Stim('digger'), new Stim('drone'), new Stim('hammock'), new Stim('hot air balloon'), new Stim('hydroplane'),
            new Stim('office chair'), new Stim('paperplane'), new Stim('picnictable'), new Stim('pingpong'), new Stim('plane2'), new Stim('round table'), new Stim('stool2'), new Stim('truck')
        ]
    },
    {
        id: 4,
        targets: [new Stim('femaleface1'), new Stim('femaleface2'), new Stim('femaleface3'), new Stim('femaleface4'), new Stim('maleface1'), new Stim('maleface2'), new Stim('maleface3'), new Stim('maleface4')],
        distractors: [
            new Stim('femaleface10'), new Stim('femaleface11'), new Stim('femaleface12'), new Stim('femaleface5'), new Stim('femaleface6'), new Stim('femaleface7'), new Stim('femaleface8'),
            new Stim('femaleface9'), new Stim('maleface10'), new Stim('maleface11'), new Stim('maleface12'), new Stim('maleface5'), new Stim('maleface6'), new Stim('maleface7'), new Stim('maleface8'), new Stim('maleface9')
        ]
    }
];

export class Condition {

    id: string;
    yokedType: YokedType;

    constructor(id: string, yokedType: YokedType) {
        this.id = id;
        this.yokedType = yokedType;
    }

    static getAll(): Condition[] {
        return [
            new Condition('yoked-1', YokedType.HS3),
            new Condition('yoked-2', YokedType.HS8),
            new Condition('yoked-3', YokedType.CS),
        ];
    }
}

export enum GameRoundType {
    Active,
    Yoked
}

export enum YokedType {
    HS3,
    HS8,
    CS
}

export class GameRound {

    id: number;
    set: ItemSet;
    type: GameRoundType;
    yokedType: YokedType;
    yokedStrategy: YokedStrategy; // TODO: create class
    
    constructor(id: number, type: GameRoundType, set: ItemSet, yokedType: YokedType=null) {
        this.id = id;
        this.type = type;
        this.set = set;
        this.yokedType = yokedType;
        
        // choose random target for active round
        if (type == GameRoundType.Active) {
            this.set.targets[Math.floor(Math.random() * this.set.targets.length)].isTarget = true;
        }

        // choose yoked strategy
        if (type == GameRoundType.Yoked) {

            // TODO: choose randomly bettween yoked strategy 1 or 2

        }
        
    }

    public toString(): string {
        return `GameRound ${this.id} (${this.type}) - ${this.set.id}`;
    }

    public equals(obj: GameRound): boolean {
        return this.id === obj.id
            && this.set.id === obj.set.id 
            && this.type === obj.type;
    }

}

export class TestBattery {

    rounds: GameRound[];
    roundIndex: number;

    constructor(rounds: GameRound[]) {
        this.rounds = rounds;
        this.roundIndex = 0;
    }

    public get currentRound(): GameRound {
        if (this.roundIndex >= this.rounds.length) { return null; }
        return this.rounds[this.roundIndex];
    }
    
    public static getDefault(yokedType: YokedType): TestBattery {

        let rounds: GameRound[] = [];
        const sets = SETS.slice();
        Utils.shuffleArray(sets);
 
        // First active round
        rounds.push(new GameRound(1, GameRoundType.Active, sets[0]));

        // Second active round
        rounds.push(new GameRound(2, GameRoundType.Active, sets[1]));

        // First yoked round
        rounds.push(new GameRound(3, GameRoundType.Yoked, sets[2], yokedType=yokedType));

        // Second yoked round
        rounds.push(new GameRound(4, GameRoundType.Yoked, sets[3], yokedType=yokedType));

        return new TestBattery(rounds);
    }

    public isLastRound(): boolean {
        return this.roundIndex >= this.rounds.length - 1;
    }

    public nextRound() {
        this.roundIndex++;
    }
}



