import{r as n,j as t}from"./iframe-pQ4IQbGd.js";import{V as s}from"./ValgteFiltre-CDS-hf5N.js";import"./preload-helper-BWMAHTUm.js";import"./style-Dd5MSelD.js";import"./FilterChip-BKtAP29T.js";import"./util-XB808C3G.js";import"./Chips-D6itg5CE.js";import"./TømFiltre-DsesyPWa.js";import"./umamiEvents-D8PysN3T.js";import"./Tooltip-C0by9le_.js";import"./floating-ui.react-BD46vR57.js";import"./Modal.context-Cgn_yqR3.js";import"./Portal-CQosx2dy.js";import"./useControllableState-CnnhnPcF.js";const N={title:"Filter/ValgteFiltre",component:s,parameters:{layout:"padded",docs:{description:{component:"Komponent for å vise valgte filtre med mulighet for å fjerne alle eller individuelle filtre. Beregner automatisk hvor mange filtre som får plass basert på tilgjengelig bredde og viser resten i en utvidbar seksjon."}}},tags:["autodocs"]},e=(r,k)=>({type:r,setVerdi:d=>{alert(`${k} oppdatert: ${d.join(", ")}`)},mapVerdiNavn:d=>d}),a={name:"Standard visning",parameters:{docs:{description:{story:"Standard visning med flere filtre hvor de siste skjules bak en utvidbar knapp."}}},render:()=>{const[r]=n.useState([e(["Oslo"],"Sted"),e(["Følges opp"],"Status"),e(["Tømrer"],"Kompetanse"),e(["Deltid"],"Stillingsstørrelse"),e(["Junior"],"Erfaring"),e(["Norsk"],"Språk")]);return t.jsx(s,{filtre:r,tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")}}})}},i={name:"Mange filtre",parameters:{docs:{description:{story:"Eksempel med mange filtre hvor komponenten automatisk beregner hvor mange som får plass basert på tilgjengelig bredde. Resten skjules bak utvidbar knapp."}}},render:()=>{const[r]=n.useState([e(["Oslo","Bergen","Trondheim"],"Sted"),e(["Følges opp","Aktiv"],"Status"),e(["Tømrer","Snekker","Elektriker","Maler"],"Kompetanse"),e(["Deltid","Heltid"],"Stillingsstørrelse"),e(["Junior","Senior"],"Erfaring"),e(["Norsk","Engelsk"],"Språk")]);return t.jsx("div",{className:"w-full max-w-4xl",children:t.jsx(s,{filtre:r,tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")}}})})}},l={name:"Få filtre",parameters:{docs:{description:{story:"Eksempel med få filtre hvor alle vises uten behov for utvidbar knapp."}}},render:()=>{const[r]=n.useState([e(["Oslo"],"Sted"),e(["Følges opp"],"Status")]);return t.jsx(s,{filtre:r,tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")}}})}},o={name:"Ingen filtre",parameters:{docs:{description:{story:"Når det ikke er valgt noen filtre vises komponenten ikke (returnerer null)."}}},render:()=>t.jsx(s,{filtre:[],tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")}}})},p={name:'Uten "Fjern alle" knapp',parameters:{docs:{description:{story:'Visning uten "Fjern alle filtre" knapp når tømFiltreProps ikke er oppgitt.'}}},render:()=>{const[r]=n.useState([e(["Oslo"],"Sted"),e(["Følges opp"],"Status"),e(["Tømrer"],"Kompetanse")]);return t.jsx(s,{filtre:r})}},m={name:"Med ekskluderte parametere",parameters:{docs:{description:{story:'Eksempel hvor "Fjern alle filtre" ikke fjerner alle URL-parametere, men beholder spesifiserte parametere.'}}},render:()=>{const[r]=n.useState([e(["Oslo","Bergen"],"Sted"),e(["Følges opp"],"Status"),e(["Tømrer","Snekker"],"Kompetanse")]);return t.jsx(s,{filtre:r,tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")},exlude:["customParam","anotherParam"]}})}},c={name:"Flere linjer når åpen",parameters:{docs:{description:{story:"Viser hvordan filtre brytes over flere linjer når de ekspanderes, med toggle-knappen til slutt."}}},render:()=>{const[r]=n.useState([e(["Oslo"],"Sted"),e(["Følges opp"],"Status"),e(["Tømrer"],"Kompetanse"),e(["Deltid"],"Stillingsstørrelse"),e(["Junior"],"Erfaring"),e(["Norsk"],"Språk"),e(["Bachelor"],"Utdanning"),e(["5+ år"],"Arbeidserfaring"),e(["Remote"],"Arbeidssted"),e(["Heltid"],"Stillingsprosent")]);return t.jsxs("div",{className:"w-full max-w-2xl border p-4",children:[t.jsx("h3",{className:"mb-2 font-semibold",children:"Åpne for å se flere linjer:"}),t.jsx(s,{filtre:r,tømFiltreProps:{fjernFritekst:()=>{alert("Fjern fritekst kalt")}}})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  name: 'Standard visning',
  parameters: {
    docs: {
      description: {
        story: 'Standard visning med flere filtre hvor de siste skjules bak en utvidbar knapp.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo'], 'Sted'), createMockFilter(['Følges opp'], 'Status'), createMockFilter(['Tømrer'], 'Kompetanse'), createMockFilter(['Deltid'], 'Stillingsstørrelse'), createMockFilter(['Junior'], 'Erfaring'), createMockFilter(['Norsk'], 'Språk')]);
    return <ValgteFiltre filtre={filters} tømFiltreProps={{
      fjernFritekst: () => {
        alert('Fjern fritekst kalt');
      }
    }} />;
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  name: 'Mange filtre',
  parameters: {
    docs: {
      description: {
        story: 'Eksempel med mange filtre hvor komponenten automatisk beregner hvor mange som får plass basert på tilgjengelig bredde. Resten skjules bak utvidbar knapp.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo', 'Bergen', 'Trondheim'], 'Sted'), createMockFilter(['Følges opp', 'Aktiv'], 'Status'), createMockFilter(['Tømrer', 'Snekker', 'Elektriker', 'Maler'], 'Kompetanse'), createMockFilter(['Deltid', 'Heltid'], 'Stillingsstørrelse'), createMockFilter(['Junior', 'Senior'], 'Erfaring'), createMockFilter(['Norsk', 'Engelsk'], 'Språk')]);
    return <div className='w-full max-w-4xl'>
        <ValgteFiltre filtre={filters} tømFiltreProps={{
        fjernFritekst: () => {
          alert('Fjern fritekst kalt');
        }
      }} />
      </div>;
  }
}`,...i.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  name: 'Få filtre',
  parameters: {
    docs: {
      description: {
        story: 'Eksempel med få filtre hvor alle vises uten behov for utvidbar knapp.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo'], 'Sted'), createMockFilter(['Følges opp'], 'Status')]);
    return <ValgteFiltre filtre={filters} tømFiltreProps={{
      fjernFritekst: () => {
        alert('Fjern fritekst kalt');
      }
    }} />;
  }
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  name: 'Ingen filtre',
  parameters: {
    docs: {
      description: {
        story: 'Når det ikke er valgt noen filtre vises komponenten ikke (returnerer null).'
      }
    }
  },
  render: () => {
    return <ValgteFiltre filtre={[]} tømFiltreProps={{
      fjernFritekst: () => {
        alert('Fjern fritekst kalt');
      }
    }} />;
  }
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  name: 'Uten "Fjern alle" knapp',
  parameters: {
    docs: {
      description: {
        story: 'Visning uten "Fjern alle filtre" knapp når tømFiltreProps ikke er oppgitt.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo'], 'Sted'), createMockFilter(['Følges opp'], 'Status'), createMockFilter(['Tømrer'], 'Kompetanse')]);
    return <ValgteFiltre filtre={filters} />;
  }
}`,...p.parameters?.docs?.source}}};m.parameters={...m.parameters,docs:{...m.parameters?.docs,source:{originalSource:`{
  name: 'Med ekskluderte parametere',
  parameters: {
    docs: {
      description: {
        story: 'Eksempel hvor "Fjern alle filtre" ikke fjerner alle URL-parametere, men beholder spesifiserte parametere.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo', 'Bergen'], 'Sted'), createMockFilter(['Følges opp'], 'Status'), createMockFilter(['Tømrer', 'Snekker'], 'Kompetanse')]);
    return <ValgteFiltre filtre={filters} tømFiltreProps={{
      fjernFritekst: () => {
        alert('Fjern fritekst kalt');
      },
      exlude: ['customParam', 'anotherParam']
    }} />;
  }
}`,...m.parameters?.docs?.source}}};c.parameters={...c.parameters,docs:{...c.parameters?.docs,source:{originalSource:`{
  name: 'Flere linjer når åpen',
  parameters: {
    docs: {
      description: {
        story: 'Viser hvordan filtre brytes over flere linjer når de ekspanderes, med toggle-knappen til slutt.'
      }
    }
  },
  render: () => {
    const [filters] = useState([createMockFilter(['Oslo'], 'Sted'), createMockFilter(['Følges opp'], 'Status'), createMockFilter(['Tømrer'], 'Kompetanse'), createMockFilter(['Deltid'], 'Stillingsstørrelse'), createMockFilter(['Junior'], 'Erfaring'), createMockFilter(['Norsk'], 'Språk'), createMockFilter(['Bachelor'], 'Utdanning'), createMockFilter(['5+ år'], 'Arbeidserfaring'), createMockFilter(['Remote'], 'Arbeidssted'), createMockFilter(['Heltid'], 'Stillingsprosent')]);
    return <div className='w-full max-w-2xl border p-4'>
        <h3 className='mb-2 font-semibold'>Åpne for å se flere linjer:</h3>
        <ValgteFiltre filtre={filters} tømFiltreProps={{
        fjernFritekst: () => {
          alert('Fjern fritekst kalt');
        }
      }} />
      </div>;
  }
}`,...c.parameters?.docs?.source}}};export{c as FlereLinjerNårÅpen,l as FåFiltre,o as IngenFiltre,i as MangeFiltre,m as MedEksluderteParametre,a as Standard,p as UtenFjernAlle,N as default};
