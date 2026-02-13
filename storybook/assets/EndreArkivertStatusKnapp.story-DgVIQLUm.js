import{j as e,c as d,r as p}from"./iframe-DajSqrUA.js";import"./KandidatlisteContext-D9_fQrfR.js";import{A as i}from"./ActionMenu-CZksC1TL.js";import{S as m}from"./KandidatHendelseTag-Cel334R7.js";import{S as u}from"./Trash-BiOWVvKm.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-ttuyWZZE.js";import"./VStack-6eko35wq.js";import"./BasePrimitive-B5cN4ML1.js";import"./Box-B1A3Jx9S.js";import"./List-Cdmy6Ve6.js";import"./Link-Cnq_3oR_.js";import"./index-BHJY8bfe.js";import"./index-B40KJ5b4.js";import"./util-N9G6fNXg.js";import"./Modal.context-DdYEpb6k.js";import"./useControllableState-BvXX11tZ.js";import"./Portal-CYosBueg.js";import"./useClientLayoutEffect-CA3gNj2M.js";import"./FocusBoundary-4ffRQmnx.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-CXpS1qhr.js";import"./useOpenChangeAnimationComplete-BIxUa1yB.js";import"./useDescendant-Cz5hTgOA.js";import"./DismissableLayer-BcMxi2MV.js";import"./Floating-Df4tQLRv.js";import"./ChevronRight-C5eDQV12.js";import"./Tag-DDA00Iqw.js";import"./ChatExclamationmark-D-WTVOep.js";import"./FileXMark-CRJALD2q.js";import"./HandShakeHeart-CvYj85-E.js";import"./Calendar-DO7nAsmi.js";import"./ThumbUp-DRZr661s.js";import"./ExclamationmarkTriangle-M_FMFCMD.js";import"./Table-DYn-RzEP.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
