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
