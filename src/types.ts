export type CustomerResponse = {
  _embedded: {
    customers: Customer[];
  };
}

export type Customer = {
  id?: number
  firstname: string
  lastname: string
  streetaddress: string
  postcode: string
  city: string
  email: string
  phone: string
  _links: {
    self: { href: string }
    customer: { href: string }
    trainings: { href: string }
  }
}

export type Training = {
  id?: number
  date: string
  duration: number
  activity: string
  _links: {
    self: { href: string }
    training: { href: string }
    customer: { href: string }
  }
}

export type TrainingWithCustomer = {
  id: number
  date: string
  duration: number
  activity: string
  customer: {
    id: number
    firstname: string
    lastname: string
    streetaddress: string
    postcode: string
    city: string
    email: string
    phone: string
  }
}