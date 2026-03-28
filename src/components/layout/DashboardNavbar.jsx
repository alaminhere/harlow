'use client';
import Image from 'next/image';
import Logo from '../shared/Logo';

const DashboardNavbar = ({ open, setOpen }) => {
  return (
    <header className="bg-background border-b border-b-border z-100">
      <div className=" flex justify-between items-center gap-4 px-5 py-3">
        <Logo />
        <div className="md:hidden rounded-[5px] p-1 bg-primary">
          <Image
            onClick={() => setOpen(!open)}
            className=" "
            src={`/icons/${!open ? 'bards.svg' : 'close.svg'}`}
            alt="cart"
            width={25}
            height={25}
          />
        </div>
      </div>
    </header>
  );
};

export default DashboardNavbar;
