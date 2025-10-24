import{r as l,j as n,o as c}from"./iframe-DjWAYC3X.js";import{F as i}from"./FjernFåttJobbenKnapp-Dx2ei4YF.js";import{A as o}from"./ActionMenu-Bf8ZwH8y.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-C1cH-4SS.js";import"./useControllableState-B_dAdZ-G.js";import"./Portal-CSnYFtNM.js";import"./useDescendant-DApziTPC.js";import"./useClientLayoutEffect-Bu2a2BR2.js";import"./DismissableLayer-DGq0BrI1.js";import"./Floating-DA6FkBNw.js";import"./ChevronRight-Q2zHiNqf.js";const C={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[p,d]=l.useState(!1);return n.jsxs(o,{open:p,onOpenChange:d,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
