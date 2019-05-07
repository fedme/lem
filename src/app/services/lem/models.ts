import { Utils } from '../common/utils';

export const ALL_CONDITIONS = [
   {
       id: 0,
       rounds: [
           { set: 0, active: true },
           { set: 1, active: false },
           { set: 2, active: true },
           { set: 3, active: false }
       ]
   }
];

export class ItemSet {
    id: number;
    targets: string[];
    distractors: string[];
}

export const SETS: ItemSet[] = [
    {
        id: 1,
        targets: ['Apple1', 'Clownfish1', 'dasiy2', 'Owl2', 'Parrot1', 'Pine2', 'Shark2', 'tulip1'],
        distractors: [
            'Apple2', 'dasiy1', 'goldfish1', 'oak tree', 'octopus', 'owl1', 'palm tree', 'Parrot2',
            'Parrot3', 'Pine1', 'robin', 'Rose1', 'Shark3', 'Sunflower2', 'swan', 'tulip2', 'tulip3', 'turtle'
        ]
    },
    {
        id: 2,
        targets: ['blueberries', 'boot', 'green_apple', 'jumper', 'raspberry', 'sandal', 'Tshirt', 'yellow_apple'],
        distractors: [
            'banana', 'blackberry', 'boot2', 'cardigan', 'cherries', 'coat', 'coconut', 'cranberries', 'dress',
            'flipflop', 'grapes_purple', 'grapes_yellow', 'orange', 'peach', 'pear', 'sandal2', 'slipper',
            'sneaker', 'strawberry', 'tanktop'
        ]
    },
    {
        id: 3,
        targets: ['aeroplane', 'bus', 'car', 'desk', 'dining table', 'helicopter', 'rocking chair', 'stool'],
        distractors: [
            'armchair', 'bike', 'car2', 'desk2', 'digger', 'drone', 'hammock', 'hot air balloon', 'hydroplane',
            'office chair', 'paperplane', 'picnictable', 'pingpong', 'plane2', 'round table', 'stool2', 'truck'
        ]
    },
    {
        id: 4,
        targets: ['femaleface1', 'femaleface2', 'femaleface3', 'femaleface4', 'maleface1', 'maleface2', 'maleface3', 'maleface4'],
        distractors: [
            'femaleface10', 'femaleface11', 'femaleface12', 'femaleface5', 'femaleface6', 'femaleface7', 'femaleface8',
            'femaleface9', 'maleface10', 'maleface11', 'maleface12', 'maleface5', 'maleface6', 'maleface7', 'maleface8', 'maleface9'
        ]
    }
];

export class Condition {

    id: string;

    constructor(id: string) {
        this.id = id;
    }

    static getAll(): Condition[] {
        return [
            new Condition('freq-first'),
            new Condition('prob-first')
        ];
    }
}

export class PlanetRound {

    id: number;
    feature: string;
    term: string;
    term_type: string;
    planet: number;

    // feature dependent
    intro_text_a_b: string;
    intro_text_b_a: string;
    feature_label_a: string;
    feature_label_b: string;

    // feature and term dependent
    question_text_a: string;
    question_text_b: string;
    robot_text: string;
    slider_text_a: string;
    slider_text_b: string;

    // What was shown on the left and on the right
    layoutLeft: string;
    layoutRight: string;

    // Participant input
    slider_val: number;


    constructor(
        id: number,
        feature: string,
        term: string,
        planet: number
    ) {
        this.id = id;
        this.feature = feature;
        this.term = term;
        this.planet = planet;
        this.parseProperties();
    }

    parseProperties() {
        // gather info dependent on feature
        // for (const fm of FEATURE_MAPPING.slice()) {
        //     if (fm.feature === this.feature) {
        //         this.feature_label_a = fm.feature_label_a;
        //         this.feature_label_b = fm.feature_label_b;
        //         this.intro_text_a_b = fm.intro_text_a_b;
        //         this.intro_text_b_a = fm.intro_text_b_a;
        //         break;
        //     }
        // }

        // // gather info dependent on term and feature
        // for (const ftm of FEATURE_TERM_MAPPING.slice()) {
        //     if (ftm.feature === this.feature && ftm.term === this.term) {
        //         this.term_type = ftm.term_type;
        //         this.question_text_a = ftm.question_text_a;
        //         this.question_text_b = ftm.question_text_b;
        //         this.robot_text = ftm.robot_text;
        //         this.slider_text_a = ftm.slider_text_a;
        //         this.slider_text_b = ftm.slider_text_b;
        //         break;
        //     }
        // }
    }

    public toString(): string {
        return 'PlanetRound: ' + this.id + ' [' + this.feature + '] [' + this.term + '] [' + this.planet + ']';
    }

    public equals(obj: PlanetRound): boolean {
        return this.id === obj.id;
    }

}

export class TestBattery {

    constructor(planets: PlanetRound[]) {
        this.planets = planets;
        this.planetIndex = 0;
    }

    public get currentPlanet(): PlanetRound {
        if (this.planetIndex >= this.planets.length) { return null; }
        return this.planets[this.planetIndex];
    }
    planets: PlanetRound[];
    planetIndex: number;

    public static getDefault(features: string[], planets: number[]): TestBattery {

        // Get terms, features and planets
        // const freq_terms = TEST_FREQ_TERMS.slice();
        // const prob_terms = TEST_PROB_TERMS.slice();
        //const terms = freq_terms.concat(prob_terms);
        //const features = FEATURES.slice();
        //const planets = PLANETS.slice();

        // // Randomize their order
        // Utils.shuffleArray(terms);
        // Utils.shuffleArray(features);
        // Utils.shuffleArray(planets);

        // // Create planet rounds
        // const rounds: PlanetRound[] = [];
        // for (let i = 0; i < terms.length; i++) {
        //     rounds.push(
        //         new PlanetRound(i + 1, features[i], terms[i], planets[i])
        //     );
        // }

        // const battery = new TestBattery(rounds);
        // Utils.shuffleArray(battery.planets);
        // return battery;
        return null;
    }

    public isLastPlanet(): boolean {
        return this.planetIndex >= this.planets.length - 1;
    }

    public nextPlanet() {
        this.planetIndex++;
    }
}



