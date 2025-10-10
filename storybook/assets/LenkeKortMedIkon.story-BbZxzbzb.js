import{j as e,r as v}from"./iframe-DYYFo0EH.js";import{L as t}from"./LenkeKortMedIkon-Bp3jSmD0.js";import{S as n}from"./Person-DUIDYUaj.js";import{S as m}from"./FileText-BDiM7PGw.js";import{H as j}from"./VStack-j-RBo0EF.js";import{S as u}from"./Briefcase-BA2G993m.js";import{S as C}from"./Calendar-DiB-DZyk.js";import{S as x}from"./EnvelopeClosed-8cTXyHag.js";import"./preload-helper-BWMAHTUm.js";import"./ArrowRight-BNkcmy4-.js";import"./Box-CIYjCFdX.js";import"./BasePrimitive-B0IXe4ka.js";const A={tags:["autodocs"],component:t,decorators:[c=>e.jsx("div",{style:{width:"400px"},children:e.jsx(c,{})})]},r={args:{tittel:"Se kandidater",beskrivelse:"Bla gjennom alle kandidater i systemet",onClick:()=>alert("Kort klikket"),ikon:e.jsx(n,{})}},s={args:{tittel:"Opprett stilling",beskrivelse:"Lag en ny stillingsannonse",onClick:()=>alert("Opprett stilling"),ikon:"💼"}},i={args:{tittel:"Min side",onClick:()=>alert("Min side"),ikon:e.jsx(n,{})}},o={args:{tittel:"Laster data...",beskrivelse:"Vennligst vent",onClick:()=>{},ikon:e.jsx(n,{}),loading:!0}},l={args:{tittel:"Dette er en veldig lang tittel som kanskje må bryte til flere linjer",beskrivelse:"Beskrivelsen er også ganske lang og detaljert for å teste hvordan kortet håndterer mye tekst",onClick:()=>alert("Langt kort"),ikon:e.jsx(m,{})}},a={args:{tittel:"",onClick:()=>{},ikon:e.jsx(n,{})},render:()=>e.jsxs(j,{gap:"4",wrap:!1,children:[e.jsx(t,{tittel:"Kandidater",beskrivelse:"Se alle kandidater",onClick:()=>alert("Kandidater"),ikon:e.jsx(n,{})}),e.jsx(t,{tittel:"Stillinger",beskrivelse:"Administrer stillinger",onClick:()=>alert("Stillinger"),ikon:e.jsx(u,{})}),e.jsx(t,{tittel:"Kalender",beskrivelse:"Se dine avtaler",onClick:()=>alert("Kalender"),ikon:e.jsx(C,{})})]})},k={args:{tittel:"",onClick:()=>{},ikon:e.jsx(n,{})},render:()=>e.jsxs("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"1rem",width:"800px"},children:[e.jsx(t,{tittel:"Person",beskrivelse:"Med Aksel-ikon",onClick:()=>{},ikon:e.jsx(n,{})}),e.jsx(t,{tittel:"Emoji",beskrivelse:"Med emoji-ikon",onClick:()=>{},ikon:"📧"}),e.jsx(t,{tittel:"Dokument",beskrivelse:"Dokumenthåndtering",onClick:()=>{},ikon:e.jsx(m,{})}),e.jsx(t,{tittel:"Kalender",beskrivelse:"Avtaler og møter",onClick:()=>{},ikon:"📅"})]})},d={args:{tittel:"",onClick:()=>{},ikon:e.jsx(n,{})},render:()=>{const[c,g]=v.useState(0);return e.jsx("div",{children:e.jsx(t,{tittel:"Klikk meg",beskrivelse:`Klikket ${c} ganger`,onClick:()=>g(p=>p+1),ikon:e.jsx(x,{})})})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Se kandidater',
    beskrivelse: 'Bla gjennom alle kandidater i systemet',
    onClick: () => alert('Kort klikket'),
    ikon: <PersonIcon />
  }
}`,...r.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Opprett stilling',
    beskrivelse: 'Lag en ny stillingsannonse',
    onClick: () => alert('Opprett stilling'),
    ikon: '💼'
  }
}`,...s.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Min side',
    onClick: () => alert('Min side'),
    ikon: <PersonIcon />
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Laster data...',
    beskrivelse: 'Vennligst vent',
    onClick: () => {},
    ikon: <PersonIcon />,
    loading: true
  }
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: 'Dette er en veldig lang tittel som kanskje må bryte til flere linjer',
    beskrivelse: 'Beskrivelsen er også ganske lang og detaljert for å teste hvordan kortet håndterer mye tekst',
    onClick: () => alert('Langt kort'),
    ikon: <FileTextIcon />
  }
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />
  },
  render: () => <HStack gap='4' wrap={false}>
      <LenkeKortMedIkon tittel='Kandidater' beskrivelse='Se alle kandidater' onClick={() => alert('Kandidater')} ikon={<PersonIcon />} />
      <LenkeKortMedIkon tittel='Stillinger' beskrivelse='Administrer stillinger' onClick={() => alert('Stillinger')} ikon={<BriefcaseIcon />} />
      <LenkeKortMedIkon tittel='Kalender' beskrivelse='Se dine avtaler' onClick={() => alert('Kalender')} ikon={<CalendarIcon />} />
    </HStack>
}`,...a.parameters?.docs?.source}}};k.parameters={...k.parameters,docs:{...k.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />
  },
  render: () => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '1rem',
    width: '800px'
  }}>
      <LenkeKortMedIkon tittel='Person' beskrivelse='Med Aksel-ikon' onClick={() => {}} ikon={<PersonIcon />} />
      <LenkeKortMedIkon tittel='Emoji' beskrivelse='Med emoji-ikon' onClick={() => {}} ikon='📧' />
      <LenkeKortMedIkon tittel='Dokument' beskrivelse='Dokumenthåndtering' onClick={() => {}} ikon={<FileTextIcon />} />
      <LenkeKortMedIkon tittel='Kalender' beskrivelse='Avtaler og møter' onClick={() => {}} ikon='📅' />
    </div>
}`,...k.parameters?.docs?.source}}};d.parameters={...d.parameters,docs:{...d.parameters?.docs,source:{originalSource:`{
  args: {
    tittel: '',
    onClick: () => {},
    ikon: <PersonIcon />
  },
  render: () => {
    const [klikket, setKlikket] = useState(0);
    return <div>
        <LenkeKortMedIkon tittel='Klikk meg' beskrivelse={\`Klikket \${klikket} ganger\`} onClick={() => setKlikket(prev => prev + 1)} ikon={<EnvelopeClosedIcon />} />
      </div>;
  }
}`,...d.parameters?.docs?.source}}};export{a as FlereKort,k as ForskjelligeIkoner,d as Interaktiv,l as LangTittel,o as Loading,s as MedEmoji,r as MedIkon,i as UtenBeskrivelse,A as default};
