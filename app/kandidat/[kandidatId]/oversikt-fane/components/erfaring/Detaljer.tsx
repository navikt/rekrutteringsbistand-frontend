import * as React from 'react';

type DetaljerProps = {
  children: React.ReactNode;
};

const Detaljer: React.FC<DetaljerProps> = ({ children }) => {
  return (
    <div className='flex flex-wrap items-center'>
      {React.Children.map(children, (child, index) => (
        <React.Fragment key={index}>
          {child}
          {index < React.Children.count(children) - 1 && (
            <span className='px-2 text-4xl text-gray-300 last:hidden'>·</span>
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Detaljer;
