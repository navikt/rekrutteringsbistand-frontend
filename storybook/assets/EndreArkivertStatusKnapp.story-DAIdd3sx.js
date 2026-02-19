import{j as e,c as d,r as p}from"./iframe-DSUVO1db.js";import"./KandidatlisteContext-B3z-Rlqv.js";import{A as i}from"./ActionMenu-CFdYekzp.js";import{S as m}from"./KandidatHendelseTag-kk3lKhbZ.js";import{S as u}from"./Trash-DvPYmWaC.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-BdVa-zDv.js";import"./VStack-Dxa2ykuQ.js";import"./BasePrimitive-Cd9npuWI.js";import"./Box-InfC8s2B.js";import"./List-D_1txQZ1.js";import"./Link-DTGJsR9W.js";import"./index-DtWzaQSg.js";import"./index-B40KJ5b4.js";import"./util-DAFQcwBC.js";import"./Modal.context-Cln_0uc1.js";import"./useControllableState-CRyIFUSe.js";import"./Portal-D0sfeQ2U.js";import"./useClientLayoutEffect-BWijcyp9.js";import"./FocusBoundary-DTm723mU.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-CR0WNttm.js";import"./useOpenChangeAnimationComplete-tuCdV679.js";import"./useDescendant-CCDSkWeb.js";import"./DismissableLayer-C8GykZcW.js";import"./Floating-B4CYA2-Y.js";import"./ChevronRight-DrqswHUB.js";import"./Tag-DOqfPotY.js";import"./ChatExclamationmark-5-3cSAq3.js";import"./FileXMark-BD9yt7V1.js";import"./HandShakeHeart-uH00FJw3.js";import"./Calendar-Bt1zfgSm.js";import"./ThumbUp-C-ipizhB.js";import"./ExclamationmarkTriangle-Chg4wcZD.js";import"./Table-uio_zPLq.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
