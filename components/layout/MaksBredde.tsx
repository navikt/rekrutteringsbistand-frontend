export interface MaksBreddeProps {
  children: React.ReactNode;
}

export default function MaksBredde({ children }: MaksBreddeProps) {
  return (
    <div className='mx-auto h-full w-full max-w-[1440px] p-5'>{children}</div>
  );
}
