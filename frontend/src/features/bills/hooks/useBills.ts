import { useQuery } from "@tanstack/react-query";
import { billService } from "../services/bill.service";
import { Bill } from "../types/bill.types";

export function useBills() {
  return useQuery<Bill[]>({
    queryKey: ["bills"],
    queryFn: () => billService.getBills(),
  });
}

export function useBill(id: number) {
  return useQuery<Bill | undefined>({
    queryKey: ["bill", id],
    queryFn: () => billService.getBillById(id),
    enabled: !!id,
  });
}
