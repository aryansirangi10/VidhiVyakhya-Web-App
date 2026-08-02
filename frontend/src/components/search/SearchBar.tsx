import Input from "../ui/Input";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export function SearchBar({
  value,
  onChange
}: Props) {
  return (
    <Input
      placeholder="Search bills..."
      value={value}
      onChange={(e) =>
        onChange(e.target.value)
      }
    />
  );
}

export default SearchBar;
