'use client';

import Image from 'next/image';
import { useActionState, useEffect, useState } from 'react';

import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { submitCategory } from '@/actions/categoryAction';

const style = {
  label: 'text-[10px] font-semibold uppercase tracking-wide text-grey mb-1',
  imageBox:
    'w-25 h-25 relative overflow-hidden rounded-md border border-gray-200',
};

const CategoryForm = () => {
  const [prevURl, setPrevURl] = useState(null);
  const [state, formAction, pending] = useActionState(submitCategory, null);

  // handle prev url set
  const handleChange = e => {
    const file = e.target.files[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setPrevURl(url);
  };

  // remove image url
  const removeImage = e => {
    e.preventDefault();
    setPrevURl(null);
  };

  // response
  useEffect(() => {
    const res = () => {
      if (!state) return;
      handleActionAlert(state?.success, state?.message);
      setPrevURl(null);
    };
    res();
  }, [state]);

  // remove createObjectURL
  useEffect(() => {
    return () => URL.revokeObjectURL(prevURl);
  }, [prevURl]);

  return (
    <form
      action={formAction}
      className="max-w-2xl space-y-5 rounded-md border border-border bg-background p-5"
    >
      <p className={style.label}>Basic info</p>

      <Input
        required
        placeholder="Title"
        name="title"
        className="border-border bg-background text-text placeholder:text-placeholder"
      />
      <div className="w-fit space-y-3">
        <p className={style.label}>Category image</p>
        <div className="grid grid-cols-2 gap-3">
          {prevURl ? (
            <div className={style.imageBox}>
              <Image
                src={prevURl}
                alt="Category preview"
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                aria-label="Remove image"
                className="absolute top-0.5 right-0.5 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-text transition-colors hover:bg-danger-bg hover:text-danger"
              >
                <X size={12} />
              </button>
            </div>
          ) : (
            <label
              htmlFor="file"
              className="flex h-25 w-25 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-background transition-colors hover:border-border-hover"
            >
              <Plus className="text-text-muted" />
            </label>
          )}
          <input
            onChange={handleChange}
            type="file"
            name="file"
            id="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <Button
        disabled={pending}
        type="submit"
        className="bg-btn-primary-bg px-5 text-btn-primary-text"
      >
        {pending ? 'Loading...' : 'Submit Category'}
      </Button>
    </form>
  );
};

export default CategoryForm;
