declare var require: any;
import { Injectable } from '@angular/core';
import { PeriodicTableData } from './periodic-table.datasource';
import { PeriodicTableElement, ElementGroupBlock, MaterState, ElementBondingType, PeriodicTable } from './periodic-table.model';

@Injectable({
  providedIn: 'root'
})
export class PeriodicTableElementService {

  private elements: PeriodicTableElement[];

  constructor() {
    this.init();
  }

  getElements(): PeriodicTableElement[] {
    return this.elements.map(e => Object.assign({}, e));
  }

  private init() {
    // build periodic table elements
    this.elements = PeriodicTableData
      // .filter(item => item.fields.atomicnumber > 30)
      .map<PeriodicTableElement>((item) => {
        const fields = item.fields;
        const eleConfigAbbr = this.getElectronicConfigurationAbbr(fields.electronicconfiguration);
        const eleConfigAbbrHtml = this.buildElectronicConfigurationHtml(eleConfigAbbr);
        return {
          symbol: fields.symbol,
          name: fields.name,
          atomicNumber: fields.atomicnumber,
          atomicMass: fields.atomicmass,
          density: fields.density,
          groupBlock: this.convertToGroupBlock(fields.groupblock),
          standardState: this.convertToMaterState(fields.standardstate),
          boilingPoint: fields.boilingpoint,
          electroNegativity: fields.electronegativity,
          ionizationEnergy: fields.ionizationenergy,
          ionRadius: fields.ionradius,
          bondingType: this.convertToElementBondingType(fields.bondingtype),
          electronicConfiguration: fields.electronicconfiguration,
          electronicConfigurationHtml: this.buildElectronicConfigurationHtml(fields.electronicconfiguration),
          electronicConfigurationAbbr: eleConfigAbbr,
          electronicConfigurationAbbrHtml: eleConfigAbbrHtml,
          oxidationStates: fields.oxidationstates ? fields.oxidationstates.split(',').map(i => parseInt(i, 10)) : null,
          blankElement: false,
        };
      }).sort((a, b) => a.atomicNumber - b.atomicNumber);
  }

  private getElectronicConfigurationAbbr(fullConfig: string): string {
    return fullConfig.replace(/\[\w+\]\s{1}/, '');
  }

  private buildElectronicConfigurationHtml(configStr: string): string {
    if (!configStr) {
      return null;
    }
    let prefix = '';
    const prefixArr = /\[\w+\]\s{1}/.exec(configStr);
    if (prefixArr != null) {
      prefix = prefixArr[0];
      configStr = configStr.replace(prefix, '');
    }
    const configArr = configStr.split(' ');
    const arr = configArr.map(c => {
      try {
        const obitSymbol = /[spdfg]/.exec(c)[0];
        const parts = c.split(obitSymbol);
        return `${parts[0]}${obitSymbol}<sup>${parts[1]}</sup>`;
      } catch (err) {
        console.warn(`failed to build config for '${configStr}'`);
        return null;
      }
    });
    return `${prefix.trim()}${arr.join('')}`;
  }

  private convertToElementBondingType(btStr: string): ElementBondingType {
    switch (btStr) {
      case 'covalent network': return ElementBondingType.CovalentNetwork;
      case 'metallic': return ElementBondingType.Metallic;
      case 'atomic': return ElementBondingType.Atomic;
      case 'diatomic': return ElementBondingType.Diatomic;
      default: return ElementBondingType.Unknown;
    }
  }

  private convertToMaterState(msStr: string): MaterState {
    switch (msStr) {
      case 'solid': return MaterState.Solid;
      case 'liquid': return MaterState.Liquid;
      case 'gas': return MaterState.Gas;
      default: return MaterState.Unknown;
    }
  }

  private convertToGroupBlock(gbStr: string): ElementGroupBlock {
    switch (gbStr) {
      case 'halogen': return ElementGroupBlock.Halogen;
      case 'metal': return ElementGroupBlock.Metal;
      case 'transition metal': return ElementGroupBlock.TransitionMetal;
      case 'noble gas': return ElementGroupBlock.NobleGas;
      case 'metalloid': return ElementGroupBlock.Metalloid;
      case 'lanthanoid': return ElementGroupBlock.Lanthanoid;
      case 'alkali metal': return ElementGroupBlock.AlkaliMetal;
      case 'actinoid': return ElementGroupBlock.Actinoid;
      case 'alkaline earth metal': return ElementGroupBlock.AlkalineEarthMetal;
      case 'nonmetal': return ElementGroupBlock.Nonmetal;
      case 'post-transition metal': return ElementGroupBlock.PostTransitionMetal;
      default: return null;
    }
  }



}
