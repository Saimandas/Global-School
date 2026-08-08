import React from "react";
import { Search } from "lucide-react";

const SearchBar = ({
  value,
  onChange,
  placeholder="Search..."
}) => {
  return (
    <div className="mt-8 rounded-2xl border border-border bg-card p-5">

      <div className="flex items-center rounded-xl border border-border bg-background px-4">

        <Search
          size={18}
          className="text-muted-foreground"
        />

        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent px-4 py-4 outline-none"
        />

      </div>

    </div>
  );
};

export default SearchBar;