export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Partner {
  name: string;
  logo: string; // URL or placeholder text
}
