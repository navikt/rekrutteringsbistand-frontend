import{r as l,j as n,d as c}from"./iframe-CW8P7ZDD.js";import{F as i}from"./FjernFåttJobbenKnapp-Djx7-Xlf.js";import{A as o}from"./ActionMenu-CD3v8x3m.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatTyper-CkRsvxsW.js";import"./Modal.context-7M0gvZj4.js";import"./useControllableState-lWfKsWES.js";import"./Portal-B3c0viRV.js";import"./useDescendant-BABlK5yx.js";import"./useClientLayoutEffect-CeFXz8eE.js";import"./DismissableLayer-2CrgPHwV.js";import"./ChevronRight-KzTy-Ro7.js";const C={tags:["autodocs"],component:i},s=t=>alert("Utfall: "+t),e={args:{endreUtfallForKandidat:s,loading:!1}},r={args:{endreUtfallForKandidat:s,loading:!0}},a={args:{endreUtfallForKandidat:s,loading:!1,actionMenu:!0},render:t=>{const[d,p]=l.useState(!1);return n.jsxs(o,{open:d,onOpenChange:p,children:[n.jsx(c,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),n.jsx(o.Content,{children:n.jsx(i,{...t})})]})}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
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
