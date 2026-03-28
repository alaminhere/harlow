'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, RefreshCw } from 'lucide-react';

const InvoiceButton = () => {
  return (
    <>
      <Button className="w-full cursor-not-allowed" disabled>
        <Download size={14} />
        Download invoice
      </Button>
      <Button
        className="w-full cursor-not-allowed"
        variant="secondary"
        disabled
      >
        <RefreshCw size={14} />
        Request return
      </Button>
    </>
  );
};

export default InvoiceButton;
