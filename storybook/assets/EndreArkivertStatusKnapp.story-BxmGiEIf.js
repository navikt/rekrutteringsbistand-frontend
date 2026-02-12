import{j as e,h as d,r as p}from"./iframe-DAHX0Bjj.js";import"./KandidatlisteContext-WH-4jCVF.js";import{A as i}from"./ActionMenu-DqhIx9-z.js";import{S as m}from"./KandidatHendelseTag-BaKlM6nr.js";import{S as u}from"./Trash-NIbn-yOz.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-1w7GRpU5.js";import"./VStack-DjyJ5Lnj.js";import"./BasePrimitive-COrbn2CY.js";import"./Box-C5SMW_Le.js";import"./List-B1F9M9FI.js";import"./Link-DVwJPMop.js";import"./index-DArxax8E.js";import"./index-B40KJ5b4.js";import"./util-8uAgNAeh.js";import"./Modal.context-BS0nfZmi.js";import"./useControllableState-BS1X3OKI.js";import"./Portal-CBSMkkY-.js";import"./useClientLayoutEffect-C4MzY1kV.js";import"./FocusBoundary-L2LTUl-7.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BJt7ifOO.js";import"./useOpenChangeAnimationComplete-0KADCysP.js";import"./useDescendant-BrQzWGHe.js";import"./DismissableLayer-DqBDfLE9.js";import"./Floating-Q_0j6Cqx.js";import"./ChevronRight-CUGqtJKD.js";import"./Tag-q9EhCUAn.js";import"./ChatExclamationmark-JIkkt030.js";import"./FileXMark-C7V2eX7R.js";import"./HandShakeHeart-BDFJwSR5.js";import"./Calendar-5QxyC_94.js";import"./ThumbUp-DGbIuKVI.js";import"./ExclamationmarkTriangle-ClxxjODN.js";import"./Table-H1BV-ceW.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    return <EndreArkivertStatusKnapp modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />;
  }
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  args: {
    lukketKandidatliste: false,
    actionMenu: true,
    modalRef: {
      current: null
    } as any
  },
  render: ({
    lukketKandidatliste
  }) => {
    const ref = useRef<HTMLDialogElement>(null);
    const [open, setOpen] = useState(false);
    return <ActionMenu open={open} onOpenChange={setOpen}>
        <Button as={ActionMenu.Trigger} size='small' variant='secondary'>
          Åpne meny
        </Button>
        <ActionMenu.Content>
          <EndreArkivertStatusKnapp actionMenu modalRef={ref as unknown as React.RefObject<HTMLDialogElement>} lukketKandidatliste={lukketKandidatliste} />
        </ActionMenu.Content>
      </ActionMenu>;
  }
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,V as default};
