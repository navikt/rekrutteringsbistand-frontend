import{r as l,j as n,d as c}from"./iframe-D_5AEIMH.js";import{F as i}from"./FjernFåttJobbenKnapp-DWz7y3Mp.js";import{A as o}from"./ActionMenu-DgXl4Fyj.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-D728kc9W.js";import"./useControllableState-BSJWGsuF.js";import"./Portal-L3EL--qL.js";import"./useDescendant-CRcgWPAd.js";import"./useClientLayoutEffect-uCjqBNwN.js";import"./DismissableLayer-D30TSvf3.js";import"./Floating-CsOMTDFZ.js";import"./ChevronRight-BZnvS-mv.js";const C={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[d,p]=l.useState(!1);return n.jsxs(o,{open:d,onOpenChange:p,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false
  }
}`,...e.parameters?.docs?.source}}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: true
  }
}`,...r.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false,
    actionMenu: true
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <FjernFåttJobbenKnapp {...args} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...a.parameters?.docs?.source}}};export{a as IMenu,e as Knapp,r as Laster,C as default};
