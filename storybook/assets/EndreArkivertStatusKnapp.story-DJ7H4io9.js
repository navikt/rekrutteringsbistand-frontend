import{j as e,a as d,r as p}from"./iframe-9QB-DaFS.js";import"./KandidatlisteContext-Cb7w7IgL.js";import{A as i}from"./ActionMenu-5ZoroV8A.js";import{S as m}from"./KandidatHendelseTag-1m8Mn477.js";import{S as u}from"./Trash-CXv6PL6L.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-B409Sg5H.js";import"./VStack-IdSzJfb7.js";import"./BasePrimitive-CqnHCdpO.js";import"./Box-DbNaBfp_.js";import"./List-Vcwr0u-C.js";import"./Link-DRUCHg3V.js";import"./dato-micr6Kx5.js";import"./format-B0Vk874m.js";import"./en-US-CG9j0nLu.js";import"./match-BX-jyUN2.js";import"./parseISO-D9_5QCXM.js";import"./parse-LM0aOrqK.js";import"./getDefaultOptions-onEum7HG.js";import"./isSameDay-_XOy3LZz.js";import"./index-DAcM2qlO.js";import"./index-CWbL8d4M.js";import"./util-pjS9bycJ.js";import"./Modal.context-BarcoW_3.js";import"./Portal-DASJv-o5.js";import"./useDescendant-CkJWxJMR.js";import"./DismissableLayer-C7A3ZHit.js";import"./Floating-DVRzCse3.js";import"./useOpenChangeAnimationComplete-HXIJRsU1.js";import"./useValueAsRef-CEAsTMFf.js";import"./FocusBoundary-DXVXOPi0.js";import"./useControllableState-D55ZSACu.js";import"./ChevronRight-CMUenV_0.js";import"./Tag-DelammDU.js";import"./ChatExclamationmark-DqB4-H3K.js";import"./FileXMark-D5QHHCrz.js";import"./HandShakeHeart-D7xvTXa4.js";import"./Calendar-z8xSDDL7.js";import"./ThumbUp-CevKwLW9.js";import"./ExclamationmarkTriangle-CUccKGoR.js";import"./Table-OyV2vUpS.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IHandlingMeny,o as SomKnapp,ee as default};
