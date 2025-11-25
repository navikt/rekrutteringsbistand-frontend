import{r as s,j as e,d as p}from"./iframe-k3RGaKPd.js";import{E as i}from"./EndreArkivertStatusModal-DMtLax3W.js";import{A as a}from"./ActionMenu-CRzTKZ1O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DZQaD31H.js";import"./OrganisasjonsnummerAlert-DdVrF-pr.js";import"./VStack-gaRuQisA.js";import"./BasePrimitive-oWqdiEpB.js";import"./List-DO6c7SaU.js";import"./Link-m72qJRKd.js";import"./KandidatHendelseTag-BrAO8gll.js";import"./Tag-D2EE5Q68.js";import"./ChatExclamationmark-DF0O3gg9.js";import"./FileXMark-l5PPGv7A.js";import"./Trash-Y-vpwXcT.js";import"./HandShakeHeart-B3fF5Ubu.js";import"./Calendar-BYpfA5n7.js";import"./ThumbUp-Btvsstwl.js";import"./Table-BKOBBStb.js";import"./index-X_-WxcWH.js";import"./index-B40KJ5b4.js";import"./util-By0TYWmq.js";import"./Modal-DgdEZW2q.js";import"./floating-ui.react-BKoOdG6k.js";import"./Date.Input-D2Xin510.js";import"./useFormField-CBigW7mh.js";import"./useControllableState-GOU9ZhGX.js";import"./ChevronDown-jAKfA1Ii.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CfmyerqT.js";import"./Modal.context-D1Ki8ylF.js";import"./Portal-CON__lVm.js";import"./useLatestRef-BYT0Wjj3.js";import"./useDescendant-DpCJZQic.js";import"./DismissableLayer-DyUQ-l04.js";import"./Floating-iEdudasf.js";import"./ChevronRight-CwYssGCF.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
