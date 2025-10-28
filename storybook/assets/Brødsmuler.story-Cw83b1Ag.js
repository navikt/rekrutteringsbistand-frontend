import{j as e}from"./iframe-vxlhYioC.js";import{A as a,d as i}from"./Brødsmuler-Dto_UYD6.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatContext-Bx6A7y14.js";import"./breadcrumb-DBErklCX.js";import"./Person-D9XzLz9L.js";import"./Briefcase-B-Pp640L.js";import"./Reception-bFfKNGtW.js";const h={component:a,argTypes:{}},n={render:r=>e.jsx(a,{...r,forcedPath:"/stilling/123"}),args:{}},s={render:r=>e.jsx(a,{...r,forcedPath:"/kandidat/987654"}),args:{}},t={render:r=>{const d={...i,admin:{label:"Admin"},rapporter:{label:"Rapporter"}};return e.jsx(a,{...r,pathConfig:d,forcedPath:"/admin/rapporter/2024/kvartal-1"})}},o={render:r=>e.jsx("div",{style:{width:400,border:"1px dashed var(--ax-border-neutral-subtle)",padding:"4px"},children:e.jsx(a,{...r,forcedPath:"/stilling/avdeling/region/område/underområde/detalj/123"})}),name:"Ellipsis ved smal bredde (200px)",args:{},parameters:{docs:{description:{story:"Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px."}}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/stilling/123' />,
  args: {}
}`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <AutoBreadcrumbs {...args} forcedPath='/kandidat/987654' />,
  args: {}
}`,...s.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: (args: any) => <div style={{
    width: 400,
    border: '1px dashed var(--ax-border-neutral-subtle)',
    padding: '4px'
  }}>
      <AutoBreadcrumbs {...args} forcedPath='/stilling/avdeling/region/område/underområde/detalj/123' />
    </div>,
  name: 'Ellipsis ved smal bredde (200px)',
  args: {},
  parameters: {
    docs: {
      description: {
        story: 'Viser automatisk ellipsis når containerbredden er for liten. Containeren er satt til 200px.'
      }
    }
  }
}`,...o.parameters?.docs?.source}}};export{t as MedCustomMapping,n as Standard,s as UtenOverride,o as Width200,h as default};
