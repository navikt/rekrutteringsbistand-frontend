import { Children, FC, Fragment, ReactNode } from 'react';

type DetaljerProps = {
  children: ReactNode;
};

const Detaljer: FC<DetaljerProps> = ({ children }) => {
  return (
    <div className='flex flex-wrap items-center'>
      {Children.map(children, (child, index) => (
        <Fragment key={index}>
          {child}
          {index < Children.count(children) - 1 && (
            <span className='px-2 text-4xl text-gray-300 last:hidden'>·</span>
          )}
        </Fragment>
      ))}
    </div>
  );
};

export default Detaljer;
