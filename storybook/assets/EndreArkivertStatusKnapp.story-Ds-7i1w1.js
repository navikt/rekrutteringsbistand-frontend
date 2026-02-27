import{j as e,c as d,r as p}from"./iframe-dHiPtB1K.js";import"./KandidatlisteContext-CeYyi7aC.js";import{A as i}from"./ActionMenu-CbRi5nsH.js";import{S as m}from"./KandidatHendelseTag-sc6nO4tw.js";import{S as u}from"./Trash-D-mbu_B_.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DIkYQKdd.js";import"./VStack-BRSuobsI.js";import"./BasePrimitive-B6AYqQ1F.js";import"./Box-B2aTq1Ly.js";import"./List-TP_Y8Wd_.js";import"./Link-d4G3MTaM.js";import"./index-Bbb8RcBC.js";import"./index-CWbL8d4M.js";import"./util-Cp_q5jyE.js";import"./Modal.context-CWapPCJW.js";import"./Portal-C15wJVTL.js";import"./useDescendant-BAnzLzJE.js";import"./DismissableLayer-wvdswCkQ.js";import"./Floating-DDchvw6B.js";import"./useOpenChangeAnimationComplete-eE25XS9y.js";import"./useValueAsRef-BDqELjZI.js";import"./FocusBoundary-Bbt9g0sP.js";import"./useControllableState-CQeteWjZ.js";import"./ChevronRight-Da88DWYK.js";import"./Tag-8SPP-xG4.js";import"./ChatExclamationmark-DDnS1859.js";import"./FileXMark-D8IlZbDS.js";import"./HandShakeHeart-EWCEHQQe.js";import"./Calendar-C_hozZAH.js";import"./ThumbUp-BSCzsSqX.js";import"./ExclamationmarkTriangle-BzkE6gMT.js";import"./Table-IaacpR-h.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,P as default};
