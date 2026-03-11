import{j as e,dw as c,a as m,r as g}from"./iframe-9QB-DaFS.js";import{A as o}from"./ActionMenu-5ZoroV8A.js";import{S as u}from"./MinusCircle-DYWcGxim.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-BarcoW_3.js";import"./Portal-DASJv-o5.js";import"./useDescendant-CkJWxJMR.js";import"./DismissableLayer-C7A3ZHit.js";import"./Floating-DVRzCse3.js";import"./useOpenChangeAnimationComplete-HXIJRsU1.js";import"./useValueAsRef-CEAsTMFf.js";import"./FocusBoundary-DXVXOPi0.js";import"./useControllableState-D55ZSACu.js";import"./ChevronRight-CMUenV_0.js";const d=({endreUtfallForKandidat:n,loading:s,lukketKandidatliste:i,actionMenu:p})=>p&&p?e.jsxs(o.Item,{onSelect:()=>n(c.PRESENTERT),children:[e.jsx(u,{})," Fjern registrer fått jobben"]}):e.jsx(m,{disabled:i,icon:e.jsx(u,{}),variant:"tertiary",size:"small",loading:s,onClick:()=>n(c.PRESENTERT),children:"Fjern fått jobben registreringen"});d.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const U={tags:["autodocs"],component:d},l=n=>alert("Utfall: "+n),r={args:{endreUtfallForKandidat:l,loading:!1}},t={args:{endreUtfallForKandidat:l,loading:!0}},a={args:{endreUtfallForKandidat:l,loading:!1,actionMenu:!0},render:n=>{const[s,i]=g.useState(!1);return e.jsxs(o,{open:s,onOpenChange:i,children:[e.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(o.Content,{children:e.jsx(d,{...n})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
