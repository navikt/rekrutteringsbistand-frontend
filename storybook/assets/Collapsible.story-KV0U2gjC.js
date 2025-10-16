import{j as e,di as a,r as d}from"./iframe-BXziY_Zi.js";import{R as p,a as c,b as m}from"./index-BlRVwd-K.js";import"./preload-helper-PPVm8Dsz.js";function l({...n}){return e.jsx(p,{"data-slot":"collapsible",...n})}function r({...n}){return e.jsx(c,{"data-slot":"collapsible-trigger",...n})}function t({...n}){return e.jsx(m,{"data-slot":"collapsible-content",...n})}l.__docgenInfo={description:"",methods:[],displayName:"Collapsible"};r.__docgenInfo={description:"",methods:[],displayName:"CollapsibleTrigger"};t.__docgenInfo={description:"",methods:[],displayName:"CollapsibleContent"};const b={component:l,tags:["autodocs"],args:{defaultOpen:!0}},s={render:n=>e.jsxs(l,{...n,children:[e.jsx(r,{asChild:!0,children:e.jsx(a,{variant:"secondary",children:"Toggle"})}),e.jsx(t,{children:e.jsx("div",{className:"mt-2 text-sm border rounded-md p-3",children:"Innhold som kan skjules"})})]})},o={render:()=>{const[n,i]=d.useState(!1);return e.jsxs(l,{open:n,onOpenChange:i,children:[e.jsx(r,{asChild:!0,children:e.jsx(a,{variant:n?"destructive":"default",children:n?"Lukk":"Åpne"})}),e.jsx(t,{children:e.jsx("div",{className:"mt-2 text-sm border rounded-md p-3",children:"Kontrollert innhold"})})]})}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`{
  render: args => <Collapsible {...args}>
      <CollapsibleTrigger asChild>
        <Button variant='secondary'>Toggle</Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className='mt-2 text-sm border rounded-md p-3'>
          Innhold som kan skjules
        </div>
      </CollapsibleContent>
    </Collapsible>
}`,...s.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => {
    const [open, setOpen] = useState(false);
    return <Collapsible open={open} onOpenChange={setOpen}>
        <CollapsibleTrigger asChild>
          <Button variant={open ? 'destructive' : 'default'}>
            {open ? 'Lukk' : 'Åpne'}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className='mt-2 text-sm border rounded-md p-3'>
            Kontrollert innhold
          </div>
        </CollapsibleContent>
      </Collapsible>;
  }
}`,...o.parameters?.docs?.source}}};export{o as Kontrollert,s as Standard,b as default};
