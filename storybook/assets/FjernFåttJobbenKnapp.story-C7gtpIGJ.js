import{j as e,cA as c,h as m,r as g}from"./iframe-DP2kvpdg.js";import{A as o}from"./ActionMenu-Ht20ca2v.js";import{S as u}from"./MinusCircle-DBpkP1Lc.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-CZR20Tlo.js";import"./useControllableState-sfzBv1qc.js";import"./Portal-SR7fE7dw.js";import"./useClientLayoutEffect-Bpr87MFm.js";import"./FocusBoundary-CV1hE-L-.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BbQ9Uxvm.js";import"./useOpenChangeAnimationComplete-6jXXOB_P.js";import"./useDescendant-BErTj6TX.js";import"./DismissableLayer-DMLmqCA1.js";import"./Floating-DsQ-WkhZ.js";import"./ChevronRight-BF7wrvfV.js";const d=({endreUtfallForKandidat:n,loading:s,lukketKandidatliste:i,actionMenu:p})=>p&&p?e.jsxs(o.Item,{onSelect:()=>n(c.PRESENTERT),children:[e.jsx(u,{})," Fjern registrer fått jobben"]}):e.jsx(m,{disabled:i,icon:e.jsx(u,{}),variant:"tertiary",size:"small",loading:s,onClick:()=>n(c.PRESENTERT),children:"Fjern fått jobben registreringen"});d.__docgenInfo={description:"",methods:[],displayName:"FjernFåttJobbenKnapp",props:{endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!0,tsType:{name:"boolean"},description:""},lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""}}};const O={tags:["autodocs"],component:d},l=n=>alert("Utfall: "+n),r={args:{endreUtfallForKandidat:l,loading:!1}},t={args:{endreUtfallForKandidat:l,loading:!0}},a={args:{endreUtfallForKandidat:l,loading:!1,actionMenu:!0},render:n=>{const[s,i]=g.useState(!1);return e.jsxs(o,{open:s,onOpenChange:i,children:[e.jsx(m,{as:o.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(o.Content,{children:e.jsx(d,{...n})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IMenu,r as Knapp,t as Laster,O as default};
