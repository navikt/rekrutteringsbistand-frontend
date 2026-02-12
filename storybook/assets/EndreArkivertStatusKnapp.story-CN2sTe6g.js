import{j as e,c as d,r as p}from"./iframe-C7XLhcpc.js";import"./KandidatlisteContext-DKn3kA58.js";import{A as i}from"./ActionMenu-BKTi7N22.js";import{S as m}from"./KandidatHendelseTag-BSTr6MXW.js";import{S as u}from"./Trash-DgPccyKE.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DB1FIAtx.js";import"./VStack-D9oREGnM.js";import"./BasePrimitive-COQ289lw.js";import"./Box-TXzayjAy.js";import"./List-BhYaUhw6.js";import"./Link-B5AnCRBg.js";import"./index-Cbr6uTtH.js";import"./index-B40KJ5b4.js";import"./util-CHKwWRQQ.js";import"./Modal.context-DXPH1CfZ.js";import"./useControllableState-CqHAXLCA.js";import"./Portal-BivjfcsI.js";import"./useClientLayoutEffect-qRqWNUAU.js";import"./FocusBoundary-DOuUsO6E.js";import"./owner-Cl3CaANg.js";import"./useValueAsRef-B6cMVjVa.js";import"./useOpenChangeAnimationComplete-DzrT_qaG.js";import"./useDescendant-BhRGw4nl.js";import"./DismissableLayer-CEJ7Zggx.js";import"./Floating-BZ3wh6nx.js";import"./ChevronRight-BvNKr3PM.js";import"./Tag-DQMyaSqp.js";import"./ChatExclamationmark-Bjo6hXdk.js";import"./FileXMark-DLMPCfDo.js";import"./HandShakeHeart-DHEH6BIq.js";import"./Calendar-BV1fKCCJ.js";import"./ThumbUp-HgoDSFyx.js";import"./ExclamationmarkTriangle-DJ_6pgml.js";import"./Table-Cwzq4m90.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
