'use client';

export default function HoppTilHovedinnhold() {
  return (
    <a
      href='#maincontent'
      className='sr-only z-1000 rounded-md bg-(--ax-bg-default) px-4 py-2 text-(--ax-text-default) shadow-lg outline-2 outline-(--ax-border-focus) focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:outline'
      onClick={(e) => {
        e.preventDefault();
        const mål = document.getElementById('maincontent');
        if (mål) {
          mål.focus();
          mål.scrollIntoView();
        }
      }}
    >
      Hopp til hovedinnhold
    </a>
  );
}
