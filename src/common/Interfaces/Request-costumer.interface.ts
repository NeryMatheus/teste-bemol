interface IRequestCustomer {
  name: string;
  email: string;
  password: string;
  cpf: string;
  street?: string;
  number?: string;
  complement?: string;
  city?: string;
  state?: string;
  zipcode?: string;
}

export { IRequestCustomer };
