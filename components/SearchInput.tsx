import { useState } from "react";
import { router, usePathname } from "expo-router";
import SearchBar from "./SearchBar";

interface SearchInputProps {
  styles?: string,
}

const SearchInput: React.FC<SearchInputProps> = ({ styles }) => {
  const [searchQuery, setQuery] = useState("");
  const pathname = usePathname();

  const handleSearch = () => {
    if (searchQuery.length === 0) {
      return;
    }

    if (pathname.startsWith('/search')) {
      router.setParams({ query: searchQuery });
    } else {
      router.push(`/search/${searchQuery}`);
    }
  }

  return (
    <SearchBar
      value={searchQuery}
      setValue={setQuery}
      handleSearch={handleSearch}
    />
  )
}

export default SearchInput;
