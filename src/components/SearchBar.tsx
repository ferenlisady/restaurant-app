import { TextField } from "@mui/material";

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearchChange }) => {
  return (
    <TextField
      label="Search Menu"
      fullWidth
      value={search}
      onChange={(e) => onSearchChange(e.target.value)}
      sx={{ mb: 5 }}
    />
  );
};

export default SearchBar;
