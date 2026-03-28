'use client';

import Image from 'next/image';
import { Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { handleActionAlert } from '@/libs/handleAlert';
import { submitProduct } from '@/actions/productAction';
import { useActionState, useEffect, useState } from 'react';

const style = {
  inputDiv: 'flex flex-col gap-3 md:flex-row',
  input:
    'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text outline-none placeholder:text-placeholder focus:border-primary',
  label:
    'mb-1 text-[10px] font-semibold uppercase tracking-wide text-text-muted',
  imageBox:
    'relative h-25 w-25 overflow-hidden rounded-md border border-border bg-surface',
};

const ProductAddForm = ({ category }) => {
  const [prevUrls, setPrevUrls] = useState([]);
  const [files, setFiles] = useState([]);

  // ser prev url and  files
  const handlePrev = e => {
    const file = e.target.files[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    setPrevUrls(prev => [...prev, url]);
    setFiles(prev => [...prev, file]);
  };

  // action => server
  const [state, formAction, pending] = useActionState(
    submitProduct.bind(null, files),
    null,
  );

  // response => server
  useEffect(() => {
    if (!state) return;
    const response = async () => {
      if (state.success) {
        handleActionAlert(state.success, state.message);
        setPrevUrls([]);
        setFiles([]);
        prevUrls.forEach(url => URL.revokeObjectURL(url));
      } else {
        handleActionAlert(state.success, state.message);
      }
    };
    response();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // remove
  const removeImage = (e, index) => {
    e.preventDefault();
    setPrevUrls(prev => prev.filter((_, value) => value !== index));
    setFiles(prev => prev.filter((_, value) => value !== index));
  };

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-3">
        <p className={style.label}>Basic info</p>
        <div className={style.inputDiv}>
          <Input
            placeholder="Product title"
            name="title"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
          <select
            className={style.input}
            name="category"
            required
            defaultValue=""
          >
            <option value="" disabled>
              Select category
            </option>
            {category?.map(item => (
              <option key={item._id} value={item._id}>
                {item.title}
              </option>
            ))}
          </select>
        </div>
        <Input
          placeholder="Brand"
          name="brand"
          required
          className="border-border bg-background text-text placeholder:text-placeholder"
        />
      </div>
      <hr className="border-border" />
      <div className="space-y-3">
        <p className={style.label}>Pricing & stock</p>
        <div className={style.inputDiv}>
          <Input
            type="number"
            placeholder="Price $"
            name="price"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
          <Input
            type="number"
            placeholder="Discount price $"
            name="discountprice"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
        </div>
        <div className={style.inputDiv}>
          <Input
            type="number"
            placeholder="Stock quantity"
            name="stock"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
          <Input
            type="number"
            placeholder="Packages"
            name="packages"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
        </div>
      </div>
      <hr className="border-border" />
      <div className="space-y-3">
        <p className={style.label}>Dimensions</p>
        <div className={style.inputDiv}>
          <Input
            type="number"
            placeholder="Width (cm)"
            name="width"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
          <Input
            type="number"
            placeholder="Height (cm)"
            name="height"
            required
            className="border-border bg-background text-text placeholder:text-placeholder"
          />
        </div>
        <div className={style.inputDiv}>
          <select name="isnew" className={style.input} required defaultValue="">
            <option value="" disabled>
              Is New?
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <select
            name="isfeatured"
            className={style.input}
            required
            defaultValue=""
          >
            <option value="" disabled>
              Is Featured?
            </option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <hr className="border-border" />
      <div className="w-fit space-y-3">
        <p className={style.label}>Product images</p>
        <div className="grid grid-cols-3 gap-3 md:grid-cols-5">
          {prevUrls.map((item, index) => (
            <div key={item} className={style.imageBox}>
              <Image
                src={item}
                alt={`Product preview ${index + 1}`}
                width={100}
                height={100}
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={e => removeImage(e, index)}
                aria-label={`Remove image ${index + 1}`}
                className="absolute top-1 right-1 flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-surface/90 text-text transition-colors hover:bg-danger-bg hover:text-danger"
              >
                <X size={12} />
              </button>
            </div>
          ))}
          {prevUrls.length < 4 && (
            <label
              htmlFor="file"
              className="flex h-25 w-25 cursor-pointer items-center justify-center rounded-md border-2 border-dashed border-border bg-background transition-colors hover:border-border-hover"
            >
              <Plus className="text-text-muted" />
            </label>
          )}
          <input
            onChange={e => handlePrev(e)}
            type="file"
            id="file"
            accept="image/*"
            className="hidden"
          />
        </div>
      </div>
      <div className="space-y-3">
        <p className={style.label}>Description</p>
        <textarea
          rows={4}
          placeholder="Write product description..."
          className={`${style.input} resize-y`}
          name="description"
          required
        />
      </div>
      <Button
        disabled={pending}
        type="submit"
        className="bg-btn-primary-bg px-5 text-btn-primary-text"
      >
        {pending ? 'Loading...' : 'Submit Product'}
      </Button>
    </form>
  );
};

export default ProductAddForm;
