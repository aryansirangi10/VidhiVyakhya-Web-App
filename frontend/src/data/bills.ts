export interface Bill {
  id: number;
  title: string;
  summary: string;
  category: string;
  ministry: string;
  introduced: string;
  status: "Implemented" | "Pending" | "Committee";
  readingTime: number;
  pages: number;
}

export const bills: Bill[] = [
  {
    id: 1,
    title: "Finance Bill 2024",
    summary: "Revised income tax slabs and increased standard deduction.",
    category: "Income Tax",
    ministry: "Finance",
    introduced: "23 Jul 2024",
    status: "Implemented",
    readingTime: 4,
    pages: 412
  },
  {
    id: 2,
    title: "DPDP Act 2023",
    summary: "Digital Personal Data Protection framework.",
    category: "Privacy",
    ministry: "MeitY",
    introduced: "11 Aug 2023",
    status: "Implemented",
    readingTime: 6,
    pages: 48
  },
  {
    id: 3,
    title: "Capital Gains Amendment",
    summary: "LTCG changes and exemption revision.",
    category: "Capital Gains",
    ministry: "Finance",
    introduced: "23 Jul 2024",
    status: "Pending",
    readingTime: 3,
    pages: 64
  }
];

export default bills;
