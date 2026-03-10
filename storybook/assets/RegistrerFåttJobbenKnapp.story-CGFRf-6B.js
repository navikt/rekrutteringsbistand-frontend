import{cq as x,j as e,a as f,dw as d,r as j}from"./iframe-dQW9Z_zk.js";import{u as v}from"./useKandidatlisteForEier-BCQwQdoa.js";import{A as i}from"./ActionMenu-DMkVfzaa.js";import{S as g}from"./CheckmarkCircle-DfKaI5EN.js";import"./preload-helper-PPVm8Dsz.js";import"./Modal.context-EZhP1nV5.js";import"./Portal-BKVXHdDH.js";import"./useDescendant-DsVI7Fw8.js";import"./DismissableLayer-D1nM_yGb.js";import"./Floating-BnVtHlP3.js";import"./useOpenChangeAnimationComplete-BhjMQTWC.js";import"./useValueAsRef-Bwqba-Yp.js";import"./FocusBoundary-CgBLaS5M.js";import"./useControllableState-BaYeSWn8.js";import"./ChevronRight-C_Xno_FI.js";const p=({loading:t,lukketKandidatliste:s,endreUtfallForKandidat:l,actionMenu:K,visFullførStillingModal:c})=>{const{stillingsData:b,refetch:k,erEier:T}=x(),a=v(b,T),u=async()=>{l(d.FATT_JOBBEN),await a.mutate(),k?.();const F=(a.data?.kandidater?.filter(n=>!n.arkivert)??[]).filter(n=>n.utfall===d.FATT_JOBBEN).length+(a.data?.formidlingerAvUsynligKandidat?.filter(n=>n.utfall===d.FATT_JOBBEN)?.length||0),m=a.data?.antallStillinger,h=m?F>=m:!1;c&&h&&c(!0)};return K?e.jsx(e.Fragment,{children:e.jsxs(i.Item,{onSelect:()=>u(),children:[e.jsx(g,{})," Registrer fått jobben"]})}):e.jsx(f,{size:"small",variant:"secondary",disabled:s,icon:e.jsx(g,{}),onClick:()=>u(),loading:t,children:"Registrer fått jobben"})};p.__docgenInfo={description:"",methods:[],displayName:"RegistrerFåttJobbenKnapp",props:{lukketKandidatliste:{required:!1,tsType:{name:"boolean"},description:""},endreUtfallForKandidat:{required:!0,tsType:{name:"signature",type:"function",raw:"(utfall: KandidatutfallTyper) => void",signature:{arguments:[{type:{name:"KandidatutfallTyper"},name:"utfall"}],return:{name:"void"}}},description:""},loading:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},visFullførStillingModal:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:""}}};const D={tags:["autodocs"],component:p},y=t=>alert("Utfall valgt: "+t),r={args:{endreUtfallForKandidat:y}},o={args:{endreUtfallForKandidat:y},render:t=>{const[s,l]=j.useState(!1);return e.jsxs(i,{open:s,onOpenChange:l,children:[e.jsx(f,{as:i.Trigger,size:"small",variant:"secondary",children:"Meny"}),e.jsx(i.Content,{children:e.jsx(p,{actionMenu:!0,...t})})]})}};r.parameters={...r.parameters,docs:{...r.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  }
}`,...r.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    endreUtfallForKandidat: log
  },
  render: args => {
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Meny
        </Button>
        <ActionMenu.Content>
          <RegistrerFåttJobbenKnapp actionMenu {...args} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...o.parameters?.docs?.source}}};export{o as IMenu,r as Knapp,D as default};
