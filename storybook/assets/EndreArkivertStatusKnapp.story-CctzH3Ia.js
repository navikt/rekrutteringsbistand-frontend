import{j as e,c as d,r as p}from"./iframe-D70-n2m-.js";import"./KandidatlisteContext-D6hOQxYx.js";import{A as i}from"./ActionMenu-C3EwmFi2.js";import{S as m}from"./KandidatHendelseTag-BKKVJMW8.js";import{S as u}from"./Trash-BgCW-nHH.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-BMx9ggBB.js";import"./VStack-BAHy_GRE.js";import"./BasePrimitive-D2DrK62W.js";import"./Box-D6RALtuO.js";import"./List-Bhscd6Ad.js";import"./Link-Dldcqx0Y.js";import"./index-DboKPwRt.js";import"./index-B40KJ5b4.js";import"./util-CHmFCC2K.js";import"./Modal.context-5ghY98ha.js";import"./useControllableState-Dn9P7nNK.js";import"./Portal-C_8PE2Fc.js";import"./useClientLayoutEffect-CvdKidsR.js";import"./FocusBoundary-BW_DM_Wl.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-CcSFP9Z6.js";import"./useOpenChangeAnimationComplete-CMyLHETi.js";import"./useDescendant-DeHEQ902.js";import"./DismissableLayer-DMCbA-3c.js";import"./Floating-C2odtffN.js";import"./ChevronRight-CtHl_IvS.js";import"./Tag-BnMe-z74.js";import"./ChatExclamationmark-jc2LIyOp.js";import"./FileXMark-n_z89ONK.js";import"./HandShakeHeart-CG_iTudN.js";import"./Calendar-DiZ7MSVX.js";import"./ThumbUp-BK8dis7h.js";import"./ExclamationmarkTriangle-Dg1zkN6a.js";import"./Table-B7oTFh85.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
