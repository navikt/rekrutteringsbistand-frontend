import{j as e,c as d,r as p}from"./iframe-PIyxYh0N.js";import"./KandidatlisteContext-Dkr7M27v.js";import{A as i}from"./ActionMenu-DC9SQc1b.js";import{S as m}from"./KandidatHendelseTag-WHd0J4ye.js";import{S as u}from"./Trash-vtkia1Jm.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-D1-ibdTw.js";import"./VStack-C1VVTBrH.js";import"./BasePrimitive-B6gD52gJ.js";import"./Box-BPicFkNa.js";import"./List-BRg4jmBQ.js";import"./Link-CohzM1Nw.js";import"./index-HyJdP3tn.js";import"./index-CWbL8d4M.js";import"./util-B2yife1h.js";import"./Modal.context-cqPJuvGz.js";import"./Portal-BWKPtpF9.js";import"./useDescendant-DVRnRT-3.js";import"./DismissableLayer-bNtwsa3p.js";import"./Floating-CpycfxTR.js";import"./useOpenChangeAnimationComplete-SziY2f1X.js";import"./useValueAsRef-JnwqLt8N.js";import"./FocusBoundary-Cn0UWZRq.js";import"./useControllableState-ZQecNKS5.js";import"./ChevronRight-C7HLyNvw.js";import"./Tag-BfKDETSx.js";import"./ChatExclamationmark-C3aP8kyt.js";import"./FileXMark-Brpn9O6G.js";import"./HandShakeHeart-8wSTH7xF.js";import"./Calendar-Bi8Gb9wP.js";import"./ThumbUp-B5jfWdS7.js";import"./ExclamationmarkTriangle-CHrPMSjw.js";import"./Table-Db45jQEm.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
