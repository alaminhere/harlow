import Link from 'next/link';

const variants = {
  default: {
    box: 'bg-primary text-background',
    text: 'text-primary',
  },

  inverse: {
    box: 'bg-background text-primary',
    text: 'text-background',
  },
};

const Logo = ({ variant = 'default', className = '' }) => {
  const style = variants[variant] || variants.default;

  return (
    <Link href="/" className={`flex items-center gap-2 ${className}`}>
      <div
        className={`flex h-7.5 w-7.5 items-center justify-center rounded-lg text-lg font-bold ${style.box}`}
      >
        H
      </div>

      <span className={`text-xl font-bold tracking-tight font-primary ${style.text}`}>
        Harlow
      </span>
    </Link>
  );
};

export default Logo;
