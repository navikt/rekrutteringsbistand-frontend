import { useSidebar } from '../../../../components/ui/sidebar';
import { LinkWithTitle, useGenerateLinks } from '../../modia/genererModiaLenke';
import { MenuGridIcon } from '@navikt/aksel-icons';
import { Button, Popover } from '@navikt/ds-react';
import Link from 'next/link';
import * as React from 'react';

const ModiaKnapp: React.FC = () => {
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [openState, setOpenState] = React.useState(false);
  const { open } = useSidebar();
  const links = useGenerateLinks();

  const mapLinks = (links: LinkWithTitle[]) => {
    return links?.map((link, index) => {
      return (
        <Link
          key={link.url + index}
          href={link.url + link.subPath}
          className='text-sm text-navds-link hover:text-navds-link-hover'
        >
          {link.title}
        </Link>
      );
    });
  };
  return (
    <>
      <Button
        ref={buttonRef}
        onClick={() => setOpenState(!openState)}
        variant='tertiary-neutral'
        icon={<MenuGridIcon />}
        className={open ? 'w-full text-left justify-start' : ''}
      >
        {open && 'Modia'}
      </Button>

      <Popover
        open={openState}
        onClose={() => setOpenState(false)}
        anchorEl={buttonRef.current}
      >
        <Popover.Content>
          <div>
            <div className='flex flex-row  gap-8 p-4'>
              {Object.keys(links).map((key) => {
                const section = links[key as keyof typeof links];
                return (
                  <div key={key} className='mb-2'>
                    <div className='underline font-bold mb-2  whitespace-nowrap'>
                      {section.title}
                    </div>
                    <div className='flex flex-col gap-2'>
                      {mapLinks(section.links)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Popover.Content>
      </Popover>
    </>
  );
};

export default ModiaKnapp;
