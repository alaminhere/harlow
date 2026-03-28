'use client';

import { Input } from '@/components/ui/input';

const CheckForm = ({ form, setForm }) => {
  const handleChange = e =>
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

  return (
    <div className="w-full space-y-3 rounded-lg border border-border bg-b p-4">
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          required
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full name"
        />
        <Input
          required
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
       
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          required
          name="country"
          value={form.country}
          onChange={handleChange}
          placeholder="Country"
         
        />
        <Input
          required
          name="city"
          value={form.city}
          onChange={handleChange}
          placeholder="City"
         
        />
        <Input
          required
          name="zip"
          value={form.zip}
          onChange={handleChange}
          placeholder="Zip code"
         
        />
      </div>
      <div className="flex flex-col gap-2 md:flex-row">
        <Input
          required
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="you@example.com"
         
        />
        <Input
          required
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+880 ..."
         
        />
      </div>
      <textarea
        name="notes"
        value={form.notes}
        onChange={handleChange}
        placeholder="Order Notes (Optional)"
        rows={3}
       className='w-full rounded-lg border border-border bg-transparent px-3 py-2 text-sm transition-colors outline-none  placeholder:text-placeholder focus-visible:ring-1 focus-visible:ring-primary'
      />
    </div>
  );
};

export default CheckForm;
