import{j as e,h as d,r as p}from"./iframe-DP2kvpdg.js";import"./KandidatlisteContext-DEpcEx0V.js";import{A as i}from"./ActionMenu-Ht20ca2v.js";import{S as m}from"./KandidatHendelseTag-Cj42a-w_.js";import{S as u}from"./Trash-CuHVONvv.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CQQ9aCbz.js";import"./VStack-C25zxde3.js";import"./BasePrimitive-CWkv78-E.js";import"./Box-D-em4xIV.js";import"./List-3pEpFqVt.js";import"./Link-DRKZrfVD.js";import"./index-Dw9xAlZq.js";import"./index-B40KJ5b4.js";import"./util-fsuIS61f.js";import"./Modal.context-CZR20Tlo.js";import"./useControllableState-sfzBv1qc.js";import"./Portal-SR7fE7dw.js";import"./useClientLayoutEffect-Bpr87MFm.js";import"./FocusBoundary-CV1hE-L-.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BbQ9Uxvm.js";import"./useOpenChangeAnimationComplete-6jXXOB_P.js";import"./useDescendant-BErTj6TX.js";import"./DismissableLayer-DMLmqCA1.js";import"./Floating-DsQ-WkhZ.js";import"./ChevronRight-BF7wrvfV.js";import"./Tag-BHTVORAi.js";import"./ChatExclamationmark-CVdE9n6Y.js";import"./FileXMark-BWkn3Yak.js";import"./HandShakeHeart-B6f8TyQr.js";import"./Calendar-y0B4-QLG.js";import"./ThumbUp-BFsTNLwf.js";import"./ExclamationmarkTriangle-BMbtBjZB.js";import"./Table-Cp8DjJzM.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
