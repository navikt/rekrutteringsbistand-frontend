import{j as e,c as d,r as p}from"./iframe-CuDSMhaq.js";import"./KandidatlisteContext-DvX5DOF6.js";import{A as i}from"./ActionMenu-BoXfQrJx.js";import{S as m}from"./KandidatHendelseTag-BW31CTc3.js";import{S as u}from"./Trash-DwwMlthw.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-gMFzB-Nj.js";import"./VStack-peAx0avK.js";import"./BasePrimitive-B1PStItJ.js";import"./Box-BQuanBXm.js";import"./List-DJ23K__7.js";import"./Link-tsLRweZL.js";import"./index-CBiK8n6F.js";import"./index-B40KJ5b4.js";import"./util-DXhbwXX1.js";import"./Modal.context-DiZ0ui_2.js";import"./useControllableState-CxL1lGPX.js";import"./Portal-BrdbejtF.js";import"./useClientLayoutEffect-Bd3jXGUA.js";import"./FocusBoundary-CfN95IQH.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-DK8IFe85.js";import"./useOpenChangeAnimationComplete-pdpevsqa.js";import"./useDescendant-BR4-H1-L.js";import"./DismissableLayer-BRBLHQUd.js";import"./Floating-Tcz1rUIG.js";import"./ChevronRight-DlAKLPhJ.js";import"./Tag-DJ_iPMRQ.js";import"./ChatExclamationmark-B0nHfMyF.js";import"./FileXMark-Ca4Av8Q1.js";import"./HandShakeHeart-B-8bJJTX.js";import"./Calendar-DDJzmvww.js";import"./ThumbUp-C4QBnZuP.js";import"./ExclamationmarkTriangle-CMF8L1j6.js";import"./Table-DNymA4zI.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
