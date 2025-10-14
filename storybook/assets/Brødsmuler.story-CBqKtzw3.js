import{j as e}from"./iframe-pQ4IQbGd.js";import{A as a,d as i}from"./Brødsmuler-9ZI7B68V.js";import"./preload-helper-BWMAHTUm.js";import"./breadcrumb-De842Tyz.js";import"./Person-CDhZbJdE.js";import"./Briefcase-DSixTrI9.js";import"./Reception-BMnaW2Ws.js";const b={component:a,argTypes:{erstattPath:{control:"object",description:"Tuple [originalSegment, nyLabel] – erstatter ett segment i path'en"}}},t={render:r=>e.jsx(a,{...r,forcedPath:"/stilling/123"}),args:{erstattPath:["123","Servitørstilling"]}},n={render:r=>e.jsx(a,{...r,forcedPath:"/kandidat/987654"}),args:{erstattPath:void 0}},s={render:r=>{const d={...i,admin:{label:"Admin"},rapporter:{label:"Rapporter"}};return e.jsx(a,{...r,pathConfig:d,forcedPath:"/admin/rapporter/2024/kvartal-1"})}},o={render:r=>e.jsx("div",{style:{width:400,border:"1px dashed var(--ax-border-neutral-subtle)",padding:"4px"},children:e.jsx(a,{...r,forcedPath:"/stilling/avdeling/region/område/underområde/detalj/123"})}),name:"Ellipsis ved smal bredde (200px)",args:{erstattPath:["123","Detalj"]},parameters:{docs:{description:{story:"Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px."}}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/stilling/123' />,
  args: {
    erstattPath: ['123', 'Servitørstilling']
  }
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/kandidat/987654' />,
  args: {
    erstattPath: undefined
  }
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: (args: any) => {
    const custom: PathConfig = {
      ...defaultPathConfig,
      admin: {
        label: 'Admin'
      },
      rapporter: {
        label: 'Rapporter'
      }
    };
    return <AutoBreadcrumbs {...args} pathConfig={custom} forcedPath='/admin/rapporter/2024/kvartal-1' />;
  }
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <div style={{
    width: 400,
    border: '1px dashed var(--ax-border-neutral-subtle)',
    padding: '4px'
  }}>
      <AutoBreadcrumbs {...args} forcedPath='/stilling/avdeling/region/område/underområde/detalj/123' />
    </div>,
  name: 'Ellipsis ved smal bredde (200px)',
  args: {
    erstattPath: ['123', 'Detalj']
  },
  parameters: {
    docs: {
      description: {
        story: 'Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};export{s as MedCustomMapping,t as Standard,n as UtenOverride,o as Width200,b as default};
