import{j as e,c as d,r as p}from"./iframe-Bl6ayYNX.js";import"./KandidatlisteContext-BT7YG90M.js";import{A as i}from"./ActionMenu-RabOHdb5.js";import{S as m}from"./KandidatHendelseTag-0PkozSXb.js";import{S as u}from"./Trash-unLryNgO.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-Bik6-JYn.js";import"./VStack-CA2QhmkG.js";import"./BasePrimitive-D0grWxJZ.js";import"./Box-0sLJeGaP.js";import"./List-auM7tRHU.js";import"./Link-DEishlH_.js";import"./index-CV8msX1I.js";import"./index-B40KJ5b4.js";import"./util-CZV-I1Pz.js";import"./Modal.context-DXDsLaYB.js";import"./useControllableState-CWh0NMBF.js";import"./Portal-t_qovnB_.js";import"./useClientLayoutEffect-C9jJEFvX.js";import"./FocusBoundary-LpzX28ny.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-uEeH37WG.js";import"./useOpenChangeAnimationComplete-snIzfLIT.js";import"./useDescendant-D4rf8XBP.js";import"./DismissableLayer-CdKLlNKO.js";import"./Floating-Dugra9_I.js";import"./ChevronRight-r3-Ndj0O.js";import"./Tag-Boi_htjO.js";import"./ChatExclamationmark-BobvnP0I.js";import"./FileXMark-D4fNmJgc.js";import"./HandShakeHeart-nGR3n6oX.js";import"./Calendar-CKxz3_L5.js";import"./ThumbUp-BxrMO-Ff.js";import"./ExclamationmarkTriangle-DSpXpKdr.js";import"./Table-DwbONn7s.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
