export interface IParams {
  patientId: number;
}

export interface ICreatePatient {
  name: string;
  email: string;
}

export interface IUpdatePatient {
  name?: string;
  email?: string;
}
