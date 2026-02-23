import{j as e,c as d,r as p}from"./iframe-BcafLp1P.js";import"./KandidatlisteContext-CGY16HKw.js";import{A as i}from"./ActionMenu-D9V_VEta.js";import{S as m}from"./KandidatHendelseTag-CVkbCg1g.js";import{S as u}from"./Trash--x60bOrt.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-t2yePXnP.js";import"./VStack-BUYffyo0.js";import"./BasePrimitive-Cu0275kf.js";import"./Box-xMHjpoe3.js";import"./List-DwnSYGzg.js";import"./Link-C1BCDRkt.js";import"./index-C-IARwxn.js";import"./index-B40KJ5b4.js";import"./util-B2_wk1ag.js";import"./Modal.context-DBs681lM.js";import"./useControllableState-B1nYmOK4.js";import"./Portal-Dkq63Bdj.js";import"./useClientLayoutEffect-CKRhGgNk.js";import"./FocusBoundary-DYYBbK81.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-D_qWsl4I.js";import"./useOpenChangeAnimationComplete-peQ34UeY.js";import"./useDescendant-DxsEflnR.js";import"./DismissableLayer-BGB0hYDt.js";import"./Floating-B3V9G3EE.js";import"./ChevronRight-DidAEWnF.js";import"./Tag-Dv6zkSQ9.js";import"./ChatExclamationmark-kWyARzrM.js";import"./FileXMark-BI0ZAUr1.js";import"./HandShakeHeart-DQrVkoWy.js";import"./Calendar-DrETUeCk.js";import"./ThumbUp-Cu_3J7Cj.js";import"./ExclamationmarkTriangle-Duk46aag.js";import"./Table-Q-vYZ7yy.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
