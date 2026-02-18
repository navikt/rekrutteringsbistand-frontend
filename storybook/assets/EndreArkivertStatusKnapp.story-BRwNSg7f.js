import{j as e,c as d,r as p}from"./iframe-CICabUNg.js";import"./KandidatlisteContext-uRRlq49D.js";import{A as i}from"./ActionMenu-CNkUCziD.js";import{S as m}from"./KandidatHendelseTag-Bvd3bv-a.js";import{S as u}from"./Trash-6IQGakom.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-67p7D-UP.js";import"./VStack-mOgv7mOp.js";import"./BasePrimitive-Q5SXqBPp.js";import"./Box-bCAH4nym.js";import"./List-C71F1ED3.js";import"./Link-Cc-1o-tt.js";import"./index-tkkqveR9.js";import"./index-B40KJ5b4.js";import"./util-FewNhbmB.js";import"./Modal.context-BPOBanTz.js";import"./useControllableState-jDf_Tnei.js";import"./Portal-CYXNw3oh.js";import"./useClientLayoutEffect-BwRbPqqF.js";import"./FocusBoundary-vVZee2JR.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-B4HVVfsT.js";import"./useOpenChangeAnimationComplete-Bf0SL2XR.js";import"./useDescendant-DrAnnTKW.js";import"./DismissableLayer-Dqvg0Hjc.js";import"./Floating-bHO9CII1.js";import"./ChevronRight-Dj8WbnNd.js";import"./Tag-Ci9U1P_l.js";import"./ChatExclamationmark-CG04mwJo.js";import"./FileXMark-Drv5C4mg.js";import"./HandShakeHeart-jgUBH5fs.js";import"./Calendar-3mw3CxSC.js";import"./ThumbUp-DnZdUywu.js";import"./ExclamationmarkTriangle-BphOHuZJ.js";import"./Table-nlMImI8d.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
