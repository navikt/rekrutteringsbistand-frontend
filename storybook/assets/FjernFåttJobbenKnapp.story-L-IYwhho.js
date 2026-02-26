import{j as e,dX as c,c as m,r as g}from"./iframe-FHkBCfVU.js";import{A as o}from"./ActionMenu-D6nRUrwb.js";import{S as u}from"./MinusCircle-DzxwEx0L.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-DfI42K82.js";import"./Portal-CwAZzS7w.js";import"./useDescendant-COL2doGN.js";import"./DismissableLayer-DAyJ5Ecl.js";import"./Floating-CNGg34o0.js";import"./useOpenChangeAnimationComplete-GbbXLZ1x.js";import"./useValueAsRef-Dzx2Ys5u.js";import"./FocusBoundary-Bhuz3AHl.js";import"./useControllableState-C70irtDf.js";import"./ChevronRight-CmKJcyXI.js";const d=({endreUtfallForKandidat:n,loading:s,lukketKandidatliste:i,actionMenu:p})=>p&&p?e.jsxs(o.Item,{onSelect:()=>n(c.PRESENTERT),children:[e.jsx(u,{})," Fjern registrer fått jobben"]}):e.jsx(m,{disabled:i,icon:e.jsx(u,{}),variant:"tertiary",size:"small",loading:s,onClick:()=>n(c.PRESENTERT),children:"Fjern fått jobben registreringen"});d.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const U={tags:["autodocs"],component:d},l=n=>alert("Utfall: "+n),r={args:{endreUtfallForKandidat:l,loading:!1}},t={args:{endreUtfallForKandidat:l,loading:!0}},a={args:{endreUtfallForKandidat:l,loading:!1,actionMenu:!0},render:n=>{const[s,i]=g.useState(!1);return e.jsxs(o,{open:s,onOpenChange:i,children:[e.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(o.Content,{children:e.jsx(d,{...n})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: false
  }
}`,...r.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log,
    loading: true
  }
}`,...t.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IMenu,r as Knapp,t as Laster,U as default};
