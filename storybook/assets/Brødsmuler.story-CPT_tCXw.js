import{j as e}from"./iframe-BZGI7Ig_.js";import{A as a,d as i}from"./Brødsmuler-D_xDSyQe.js";import"./preload-helper-BWMAHTUm.js";import"./breadcrumb-C3UjrvP4.js";import"./Person-C2Tebu51.js";import"./Briefcase-myqMCsx5.js";const b={component:a,argTypes:{overrideLastLabel:{control:"text"}}},n={render:r=>e.jsx(a,{...r,forcedPath:"/stilling/123"}),args:{overrideLastLabel:"Servitørstilling"}},t={render:r=>e.jsx(a,{...r,forcedPath:"/kandidat/987654"}),args:{overrideLastLabel:void 0}},s={render:r=>{const d={...i,admin:{label:"Admin"},rapporter:{label:"Rapporter"}};return e.jsx(a,{...r,pathConfig:d,forcedPath:"/admin/rapporter/2024/kvartal-1"})}},o={render:r=>e.jsx("div",{style:{width:400,border:"1px dashed var(--ax-border-neutral-subtle)",padding:"4px"},children:e.jsx(a,{...r,forcedPath:"/stilling/avdeling/region/område/underområde/detalj/123"})}),name:"Ellipsis ved smal bredde (200px)",args:{overrideLastLabel:"Detalj"},parameters:{docs:{description:{story:"Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px."}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/stilling/123' />,
  args: {
    overrideLastLabel: 'Servitørstilling'
  }
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/kandidat/987654' />,
  args: {
    overrideLastLabel: undefined
  }
}`,...t.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
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
    overrideLastLabel: 'Detalj'
  },
  parameters: {
    docs: {
      description: {
        story: 'Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};export{s as MedCustomMapping,n as Standard,t as UtenOverride,o as Width200,b as default};
