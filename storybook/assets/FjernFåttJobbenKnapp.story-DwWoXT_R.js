import{r as l,j as n,d as c}from"./iframe-B2tryd13.js";import{F as i}from"./FjernFåttJobbenKnapp-DpC98K1E.js";import{A as o}from"./ActionMenu-DCWPAdME.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-b7jcTHLm.js";import"./useControllableState-C0QJmmOx.js";import"./Portal-Ci_5ypcq.js";import"./useClientLayoutEffect-BX_HQuof.js";import"./owner-CO0wgQ-G.js";import"./useLatestRef-0N3qYMzZ.js";import"./useDescendant-2rQY9f6i.js";import"./DismissableLayer-LPannaoJ.js";import"./Floating-Dt1zPpJw.js";import"./ChevronRight-BMzBV01d.js";const S={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[p,d]=l.useState(!1);return n.jsxs(o,{open:p,onOpenChange:d,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IMenu,e as Knapp,r as Laster,S as default};
