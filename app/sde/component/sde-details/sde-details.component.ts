import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '@progress/kendo-angular-notification';
import { SDEService } from '../../services/sde.service';
import { Guid } from 'guid-typescript';

@Component({
  selector: 'app-sde-details',
  templateUrl: './sde-details.component.html',
  styleUrls: ['./sde-details.component.scss']
})
export class SDEDetailsComponent implements OnInit {
  allCaseType: string[] = [];
  allBodySite: string[] = [];
  allSubSite: string[] = [];
  allSpecialProcedure: string[] = [];
  allDiagnosis: string[] = [];
  allTests: IGenericTestModel[] = [];
  allCPT: string[] = [];
  allICD: string[] = [];

  remaningBodySite: string[] = [];
  remaningSubSite: string[] = [];
  remaningSpecialProcedure: string[] = [];
  remaningDiagnosis: string[] = [];
  remaningTests: IGenericTestModel[] = [];

  sde: ISDETreeViewModel = { caseType: '', bodySites: [] };
  sdeBodySite: string[] = [];
  sdeSubSite: string[] = [];
  sdeSpecialProcedure: ISpecialProcedureModel[] = [];
  sdeDiagnosis: IDiagnosisModel[] = [];
  sdeTests: IGenericTestModel[] = [];

  selectedCaseType: string = '';
  selectedBodySite: string = '';
  selectedSubSite: string = '';
  selectedSpecialProcedure: string = '';
  selectedDiagnosis: string = '';
  selectedTests: IGenericTestModel = {
    idGenericTest: 0,
    genericTestName: '',
    cptTest: ''
  };

  anyShow: boolean = false;
  showBodySiteDDL: boolean = false;
  showSubSiteDDL: boolean = false;
  showSpecialProcedureDDL: boolean = false;
  showDiagnosisDDL: boolean = false;
  showTestsDDL: boolean = false;

  showSpecialProcedureCard: boolean = true;
  showDiagnosisCard: boolean = false;
  showTestsCard: boolean = false;

  constructor(
    public service: SDEService,
    private notification: NotificationService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.selectedCaseType = this.route.snapshot.params.caseType;
    if (this.selectedCaseType != null && this.selectedCaseType != '') {
      this.onCaseTypeChange(this.selectedCaseType);
    }
  }

  ngOnInit(): void {
    this.loadCaseType();
    this.loadBodySite();
    this.loadSubSite();
    this.loadSpecialProcedure();
    this.loadDiagnosis();
    this.loadTests();
    this.loadCPT();
    this.loadICD();
  }

  loadCaseType() {
    this.service.getCaseType().subscribe(res => {
      this.allCaseType = res;
    });
  }
  loadBodySite() {
    this.service.getBodySite().subscribe(res => {
      this.allBodySite = res;
    });
  }
  loadSubSite() {
    this.service.getSubSite().subscribe(res => {
      this.allSubSite = res;
    });
  }
  loadSpecialProcedure() {
    this.service.getSpecialProcedure().subscribe(res => {
      this.allSpecialProcedure = res;
    });
  }
  loadDiagnosis() {
    this.service.getDiagnosis().subscribe(res => {
      this.allDiagnosis = res;
    });
  }
  loadTests() {
    this.service.getGenericTest().subscribe(res => {
      this.allTests = res;
    });
  }
  loadCPT() {
    this.service.getCPTCode().subscribe(res => {
      this.allCPT = res;
    });
  }
  loadICD() {
    this.service.getICDCode().subscribe(res => {
      this.allICD = res;
    });
  }

  async onCaseTypeChange(caseType: string) {
    this.sde = await this.service.getStructedDataEntryTreeView(caseType);
    this.sdeBodySite = [];
    this.sdeSubSite = [];
    this.sdeSpecialProcedure = [];
    this.sdeDiagnosis = [];
    this.sdeTests = [];
    if (this.sde !== null && this.sde != undefined) {
      this.sdeBodySite = this.sde.bodySites.map(s => s.bodySite);
    }
  }

  onBodySiteSelect(bodySite: string) {
    this.sdeSubSite = [];
    this.sdeSpecialProcedure = [];
    this.sdeDiagnosis = [];
    this.sdeTests = [];
    this.selectedBodySite = bodySite;
    let selectBodySite = this.sde.bodySites.filter(
      x => x.bodySite == bodySite
    )[0];
    this.sdeSubSite = selectBodySite.subSites.map(s => s.subSite);
  }

  onBodySiteAdd(bodySite: string) {
    if (this.sde == null)
      this.sde = { caseType: this.selectedCaseType, bodySites: [] };

    this.sde.bodySites.push({ bodySite: bodySite, subSites: [] });
    this.sdeBodySite = this.sde.bodySites.map(s => s.bodySite);
    this.onShowBodySiteDDL();
  }

  onBodySiteDelete(bodySite: string) {
    let index = this.sde.bodySites.findIndex(d => d.bodySite === bodySite); //find index in your array
    this.sde.bodySites.splice(index, 1); //remove element from array
    this.sdeBodySite = this.sde.bodySites.map(s => s.bodySite);
  }

  onSubSiteSelect(subSite: string) {
    this.sdeSpecialProcedure = [];
    this.sdeDiagnosis = [];
    this.sdeTests = [];

    this.selectedSubSite = subSite;
    let selectBodySite = this.sde.bodySites.filter(
      x => x.bodySite == this.selectedBodySite
    )[0];
    let selectSubSite = selectBodySite.subSites.filter(
      x => x.subSite == subSite
    )[0];
    this.sdeSpecialProcedure = selectSubSite.specialProcedures;
    this.sdeDiagnosis = selectSubSite.diagnosis;
    this.sdeTests = selectSubSite.genericTests;
  }

  onSubSiteAdd(subSite: string) {
    let selectBodySite = this.sde.bodySites.filter(
      x => x.bodySite == this.selectedBodySite
    )[0];
    selectBodySite.subSites.push({
      subSite: subSite,
      specialProcedures: [],
      diagnosis: [],
      genericTests: []
    });
    this.sdeSubSite = selectBodySite.subSites.map(s => s.subSite);
    this.onShowSubSiteDDL();
  }

  onSubSiteDelete(subSite: string) {
    let selectBodySite = this.sde.bodySites.filter(
      x => x.bodySite == this.selectedBodySite
    )[0];
    let index = selectBodySite.subSites.findIndex(d => d.subSite === subSite); //find index in your array
    selectBodySite.subSites.splice(index, 1); //remove element from array
    this.sdeSubSite = selectBodySite.subSites.map(s => s.subSite);
  }

  onShowBodySiteDDL() {
    this.showBodySiteDDL = !this.showBodySiteDDL;
    if (this.showBodySiteDDL) {
      this.remaningBodySite = this.allBodySite.filter(
        item => this.sdeBodySite.indexOf(item) < 0
      );
    }
  }

  onShowSubSiteDDL() {
    this.showSubSiteDDL = !this.showSubSiteDDL;
    if (this.showSubSiteDDL) {
      this.remaningSubSite = this.allSubSite.filter(
        item => this.sdeSubSite.indexOf(item) < 0
      );
    }
  }
  onShowSpecialProcedureDDL() {
    this.showSpecialProcedureDDL = !this.showSpecialProcedureDDL;
    if (this.showSpecialProcedureDDL) {
      let temp = this.sdeSpecialProcedure.map(x => x.specialProcedureName);
      this.remaningSpecialProcedure = this.allSpecialProcedure.filter(
        item => temp.indexOf(item) < 0
      );
    }
  }
  onShowDiagnosisDDL() {
    this.showDiagnosisDDL = !this.showDiagnosisDDL;
    if (this.showDiagnosisDDL) {
      let temp = this.sdeDiagnosis.map(x => x.diagnosis);
      this.remaningDiagnosis = this.allDiagnosis.filter(
        item => temp.indexOf(item) < 0
      );
    }
  }
  onShowTestsDDL() {
    this.showTestsDDL = !this.showTestsDDL;
    if (this.showTestsDDL) {
      let temp = this.sdeTests.map(x => x.idGenericTest);
      this.remaningTests = this.allTests.filter(
        item => temp.indexOf(item.idGenericTest) < 0
      );
    }
  }

  onSpecialProcedureAdd(specialProcedure: string) {
    this.selectedSpecialProcedure = specialProcedure;
  }
  onSpecialProcedureCPTAdd(specialProcedureCPT: string) {
    this.getSubSite().specialProcedures.push({
      specialProcedureName: this.selectedSpecialProcedure,
      cptCode: specialProcedureCPT
    });
    this.onShowSpecialProcedureDDL();
  }
  onSpecialProcedureDelete(specialProcedure: ISpecialProcedureModel) {
    let selectSubSite = this.getSubSite();
    let index = selectSubSite.specialProcedures.findIndex(
      d => d.specialProcedureName == specialProcedure.specialProcedureName
    ); //find index in your array
    selectSubSite.specialProcedures.splice(index, 1); //remove element from array
    this.sdeSpecialProcedure = selectSubSite.specialProcedures;
  }

  getSubSite() {
    let selectBodySite = this.sde.bodySites.filter(
      x => x.bodySite == this.selectedBodySite
    )[0];
    return selectBodySite.subSites.filter(
      d => d.subSite == this.selectedSubSite
    )[0];
  }

  onDiagnosisAdd(diagnosis: string) {
    this.selectedDiagnosis = diagnosis;
  }
  onDiagnosisICDAdd(diagnosisICD: string) {
    this.getSubSite().diagnosis.push({
      diagnosis: this.selectedDiagnosis,
      icdCode: diagnosisICD
    });
    this.onShowDiagnosisDDL();
  }
  onDiagnosisDelete(diagnosis: IDiagnosisModel) {
    let selectSubSite = this.getSubSite();
    let index = selectSubSite.diagnosis.findIndex(
      d => d.diagnosis === diagnosis.diagnosis
    ); //find index in your array
    selectSubSite.diagnosis.splice(index, 1); //remove element from array
    this.sdeDiagnosis = selectSubSite.diagnosis;
  }

  onTestsAdd(tests: IGenericTestModel) {
    this.selectedTests.idGenericTest = tests.idGenericTest;
    this.selectedTests.genericTestName = tests.genericTestName;
  }
  onTestsCPTAdd(testsCPT: string) {
    this.getSubSite().genericTests.push({
      idGenericTest: this.selectedTests.idGenericTest,
      genericTestName: this.selectedTests.genericTestName,
      cptTest: testsCPT
    });
    this.onShowTestsDDL();
  }
  onTestsDelete(tests: IGenericTestModel) {
    let selectSubSite = this.getSubSite();
    let index = selectSubSite.genericTests.findIndex(
      d => d.genericTestName === tests.genericTestName
    ); //find index in your array
    selectSubSite.genericTests.splice(index, 1); //remove element from array
    this.sdeTests = selectSubSite.genericTests;
  }

  async onSubmit() {
    const res = await this.service.saveSDE(this.sde);
    if (res) {
      this.notification.show({
        content: 'Record added successfuly.',
        animation: { type: 'slide', duration: 400 },
        position: { horizontal: 'right', vertical: 'top' },
        type: { style: 'success', icon: true }
      });
    } else {
      alert('error');
    }
  }
}

export interface ISelectItemModel {
  value: string;
  text: string;
}
export interface ISDETreeViewModel {
  caseType: string;
  bodySites: IBodySiteModel[];
}

export interface IBodySiteModel {
  bodySite: string;
  subSites: ISubSiteModel[];
}

export interface ISubSiteModel {
  subSite: string;
  specialProcedures: ISpecialProcedureModel[];
  diagnosis: IDiagnosisModel[];
  genericTests: IGenericTestModel[];
}

export interface ISpecialProcedureModel {
  specialProcedureName: string;
  cptCode: string;
}

export interface IDiagnosisModel {
  diagnosis: string;
  icdCode: string;
}

export interface IGenericTestModel {
  idGenericTest: number;
  genericTestName: string;
  cptTest: string;
}
export interface IGenericTestModelDelete {
  IDGenericTest: number;
  GenericTestName: string;
  CPTTest: string;
}
export interface ISDEModel {
  rowId: Guid;
  caseType: string;
  bodySite: string;
  subSite: string;
  diagnosis: string;
  icd9: string;
  specProcedure: string;
  cpt: string;
  iDGenericTest: number;
  genericTestName: string;
  cptTest: string;
  lastUpdated: Date;
  updatedBy: string;
  status: string;
}
