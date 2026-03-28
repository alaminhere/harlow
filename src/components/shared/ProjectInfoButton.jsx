'use client';

import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import ProjectShowcaseModal from './ProjectShowcaseModal';

const STORAGE_KEY = 'Harlow-showcase-seen';

const ProjectInfoButton = ({
  autoOpen = false,
  className,
  children = 'Project Info',
}) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!autoOpen) return;
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(true);
  }, [autoOpen]);

  return (
    <>
      <Button onClick={() => setOpen(true)} className={className}>
        {children}
      </Button>
      {open && <ProjectShowcaseModal onClose={() => setOpen(false)} />}
    </>
  );
};

export default ProjectInfoButton;
