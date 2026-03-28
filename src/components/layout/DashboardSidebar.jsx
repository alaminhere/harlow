import { Button } from '../ui/button';
import { LogOut, X } from 'lucide-react';
import { signOut } from 'next-auth/react';
import UserAvatar from '../shared/Avatar';
import DashboardMenu from './DashboardMenu';

const DashboardSidebar = ({ session, setOpen }) => {
  const user = session?.user;
  const role = session?.token?.user?.role;

  return (
    <div className="bg-text flex  w-60 h-full flex-col justify-between ">
      <div>
        <div className="flex items-center justify-start gap-2 border-b border-white/20 px-5 py-3">
          <UserAvatar className="h-10 w-10" className2="bg-surface text-text" />
          <div>
            <p className="text-[16px] font-bold text-white">{user?.name}</p>
            <p className="text-xs leading-[0.5em] text-white/70">
              {role === 'admin' ? 'Admin' : 'Customer'}
            </p>
          </div>
          <div className="absolute top-2 left-50 h-fit w-fit md:hidden">
            <X className="cursor-pointer text-primary" />
          </div>
        </div>
        <DashboardMenu setOpen={setOpen} />
      </div>
      <Button
        onClick={() => signOut()}
        className="w-full rounded-none bg-white/10 text-white hover:bg-white/20"
      >
        <LogOut />
        Logout
      </Button>
    </div>
  );
};

export default DashboardSidebar;
