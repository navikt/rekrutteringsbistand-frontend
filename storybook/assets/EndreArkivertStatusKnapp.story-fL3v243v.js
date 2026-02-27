import{j as e,c as d,r as p}from"./iframe-BPmgH2Tx.js";import"./KandidatlisteContext-DtMrBJSR.js";import{A as i}from"./ActionMenu-Bn55CJD4.js";import{S as m}from"./KandidatHendelseTag-BCc5pevu.js";import{S as u}from"./Trash-3bORrV6d.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-BF-FmAnq.js";import"./VStack-FkDzzsLz.js";import"./BasePrimitive-oP1t9L8b.js";import"./Box-DmpKkvmh.js";import"./List-CG1-uwNh.js";import"./Link-D_8pAuw4.js";import"./index-p5qoiiL2.js";import"./index-CWbL8d4M.js";import"./util-D94mQNHJ.js";import"./Modal.context-Dp2nafXs.js";import"./Portal-Dw-ceXxH.js";import"./useDescendant-UJlNggKp.js";import"./DismissableLayer-nrhuz3N0.js";import"./Floating-Brsp-1wl.js";import"./useOpenChangeAnimationComplete-1HyoyVEm.js";import"./useValueAsRef-CQdmJPvZ.js";import"./FocusBoundary-B5rjCeTz.js";import"./useControllableState-NeFzMEdM.js";import"./ChevronRight-CKRtm_Lt.js";import"./Tag-BkLofOHG.js";import"./ChatExclamationmark-Dzsqno_z.js";import"./FileXMark-BJmYxrXd.js";import"./HandShakeHeart-CdY3ES18.js";import"./Calendar-Byxidj_3.js";import"./ThumbUp-Ca9HePGa.js";import"./ExclamationmarkTriangle-B781ayZI.js";import"./Table-DLLzaYr6.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
