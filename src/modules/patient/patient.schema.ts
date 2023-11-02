export interface IParams {
  patientId: string;
}

export interface ICreatePatient {
  name: string;
  email: string;
}

export interface IUpdatePatient {
  name?: string;
  email?: string;
}
