import {
  Calendar,
  BookOpen,
  Building2,
  ArrowRight
} from "lucide-react";

import Badge from "../ui/Badge";
import Card from "../ui/Card";
import Button from "../ui/Button";
import { Bill } from "../../data/bills";

interface Props {
  bill: Bill;
}

export function BillCard({
  bill
}: Props) {
  const variant =
    bill.status === "Implemented"
      ? "success"
      : bill.status === "Pending"
      ? "warning"
      : "info";

  return (
    <Card className="p-6 group">
      <div className="flex justify-between">
        <Badge>
          {bill.category}
        </Badge>
        <Badge variant={variant}>
          {bill.status}
        </Badge>
      </div>

      <h3 className="mt-5 text-2xl font-bold">
        {bill.title}
      </h3>

      <p className="mt-3 text-slate-600">
        {bill.summary}
      </p>

      <div className="mt-6 space-y-3 text-sm">
        <div className="flex items-center gap-2">
          <Building2 size={16} />
          {bill.ministry}
        </div>
        <div className="flex items-center gap-2">
          <Calendar size={16} />
          {bill.introduced}
        </div>
        <div className="flex items-center gap-2">
          <BookOpen size={16} />
          {bill.pages} pages • {bill.readingTime} min
        </div>
      </div>

      <Button
        className="mt-8 w-full"
        rightIcon={<ArrowRight size={18} />}
      >
        View Bill
      </Button>
    </Card>
  );
}

export default BillCard;
