import { Guid } from 'guid-typescript';

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
