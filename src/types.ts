import type { ReactNode } from "react";

export type CustomerResponse = {
  _embedded: {
    customers: Customer[];
  };
}

export type CustomerRequest = {
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export type AddTrainingRequest = {
    date: string;
    activity: string;
    duration: number;
    customer: string;
}

export type Customer = {
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

export type ModalSize = "sm" | "md" | "lg" | "xl";

export type ModalContextType = {
  openModal: (content: ReactNode, size?: ModalSize) => void;
  closeModal: () => void;
  isOpen: boolean;
  content: ReactNode;
  size: ModalSize;
}

export type CalendarEvent = {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay: boolean;
};

export type stat = {
  activity: string;
  minutes: number
}