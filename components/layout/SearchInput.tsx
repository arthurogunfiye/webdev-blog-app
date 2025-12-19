import { Search } from 'lucide-react';
import { Input } from '../ui/input';

const SearchInput = () => {
  return (
    <div className='relative hidden sm:block'>
      <Search className={searchIconStyles} />
      <Input
        placeholder='Search...'
        className={searchInputStyles}
        id='search-input'
      />
    </div>
  );
};

export default SearchInput;

const searchInputStyles = 'pl-10 bg-primary/10';
const searchIconStyles = 'absolute top-2.5 left-3 size-4 text-muted-foreground';
