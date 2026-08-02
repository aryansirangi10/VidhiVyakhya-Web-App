export interface StatItem {
  id: string;
  label: string;
  value: number;
  suffix?: string;
  decimals?: number;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HowItWorksStep {
  number: string;
  title: string;
  description: string;
  icon: string;
}
