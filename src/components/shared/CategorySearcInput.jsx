'use client';

import { SearchIcon } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';

const CategorySearchInput = () => {
  return (
    <div className="flex flex-1 justify-end gap-4">
      <ButtonGroup className="overflow-hidden rounded-full">
        <Input
          className="rounded-l-full border-border bg-surface text-text placeholder:text-placeholder"
          placeholder="Search..."
        />
        <Button
          variant="outline"
          aria-label="Search"
          className="rounded-r-full border-border bg-surface hover:bg-background"
        >
          <SearchIcon className="text-primary" />
        </Button>
      </ButtonGroup>
      <Button className="bg-btn-primary-bg text-btn-primary-text hover:opacity-90">
        Clear
      </Button>
    </div>
  );
};

export default CategorySearchInput;
