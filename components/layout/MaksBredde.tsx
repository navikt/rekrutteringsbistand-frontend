export interface MaksBreddeProps {
  children: React.ReactNode;
}

export default function MaksBredde({ children }: MaksBreddeProps) {
  return (
    <div className='max-w-[1440px] mx-auto w-full h-full p-5 '>{children}</div>
  );
}
