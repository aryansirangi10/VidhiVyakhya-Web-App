import { useMemo, useState } from "react";
import SearchBar from "../search/SearchBar";
import BillCard from "./BillCard";
import { bills } from "../../data/bills";

export function FeaturedBills() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return bills.filter(
      bill =>
        bill.title
          .toLowerCase()
          .includes(query.toLowerCase()) ||
        bill.category
          .toLowerCase()
          .includes(query.toLowerCase())
    );
  }, [query]);

  return (
    <section>
      <div className="flex items-center justify-between">
        <h2 className="text-4xl font-bold">
          Featured Bills
        </h2>
      </div>

      <div className="mt-8">
        <SearchBar
          value={query}
          onChange={setQuery}
        />
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-3">
        {filtered.map(bill => (
          <BillCard
            key={bill.id}
            bill={bill}
          />
        ))}
      </div>
    </section>
  );
}

export default FeaturedBills;
