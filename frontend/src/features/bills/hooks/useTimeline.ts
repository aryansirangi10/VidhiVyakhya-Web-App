import { useQuery } from "@tanstack/react-query";
import { TimelineEvent } from "../types/rule.types";

const MOCK_TIMELINE: TimelineEvent[] = [
  {
    id: "t-1",
    stage: "Introduced",
    date: "23 Jul 2024",
    description: "Introduced in Lok Sabha by Minister of Finance.",
    reference: "Lok Sabha Bulletin Part-II",
    isCompleted: true,
  },
  {
    id: "t-2",
    stage: "Lok Sabha Passage",
    date: "29 Jul 2024",
    description: "Passed by Lok Sabha with oral amendments.",
    reference: "Hansard Record p. 142",
    isCompleted: true,
  },
  {
    id: "t-3",
    stage: "Rajya Sabha Return",
    date: "31 Jul 2024",
    description: "Returned by Rajya Sabha without recommendations.",
    reference: "Rajya Sabha Journal 2024",
    isCompleted: true,
  },
  {
    id: "t-4",
    stage: "Presidential Assent",
    date: "16 Aug 2024",
    description: "Assented to by Hon'ble President of India.",
    reference: "Gazette of India Extraordinary Part II",
    isCompleted: true,
  },
];

export function useTimeline(billId: number) {
  return useQuery<TimelineEvent[]>({
    queryKey: ["timeline", billId],
    queryFn: async () => MOCK_TIMELINE,
    enabled: !!billId,
  });
}

export default useTimeline;
