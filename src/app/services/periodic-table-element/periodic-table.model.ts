
export class PeriodicTableCell {
    colnum: number;
    header: string;
    ele?: PeriodicTableElement;
}


export class PeriodicTableRow {
    rownum: number;
    header: string;
    cols: PeriodicTableCell[];
}

export class PeriodicTable {
    mainRows: PeriodicTableRow[];
    lanthanoidSeries: PeriodicTableRow;
    actinoidSeries: PeriodicTableRow;
}

export enum ElementGroupBlock {
    AlkaliMetal = 'alkali-metal',
    AlkalineEarthMetal = 'alkaline-earth-metal',
    TransitionMetal = 'transition-metal',
    Metal = 'metal',
    Metalloid = 'metalloid',
    Nonmetal = 'nonmetal',
    Halogen = 'halogen',
    NobleGas = 'noble-gas',
    Lanthanoid = 'lanthanoid',
    Actinoid = 'actinoid',
    PostTransitionMetal = 'post-transition-metal',
}

export enum MaterState {
    Solid,
    Liquid,
    Gas,
    Unknown,
}

export enum ElementBondingType {
    CovalentNetwork,
    Metallic,
    Atomic,
    Diatomic,
    Unknown,
}

export const ColHeadAtomNumbers = [
    1, 2, 4, 5, 6, 7, 8, 9, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
];

export const PeriodicTableColumnNames = [
    'IA',
    'IIA',

    'IIIB',
    'IVB',
    'VB',
    'VIB',
    'VIIB',
    'VIII',
    'VIII',
    'VIII',
    'IB',
    'IIB',

    'IIIA',
    'IVA',
    'VA',
    'VIA',
    'VIIA',
    'VIIA',
];

export class PeriodicTableElement {
    symbol: string;
    name: string;
    atomicNumber: number;
    atomicMass: string;
    density: number;
    groupBlock: ElementGroupBlock;
    standardState: MaterState;
    boilingPoint: number;
    electroNegativity: number;
    ionizationEnergy: number;
    ionRadius: string;
    bondingType: ElementBondingType;
    electronicConfiguration: string;
    electronicConfigurationHtml: string;
    electronicConfigurationAbbr: string;
    electronicConfigurationAbbrHtml: string;
    oxidationStates?: number[];
    blankElement = false;
}

