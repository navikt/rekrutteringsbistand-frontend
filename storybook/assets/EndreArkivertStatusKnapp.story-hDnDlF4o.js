import{r as i,j as e,d as l}from"./iframe-CS4cw4gB.js";import{E as s}from"./EndreArkivertStatusModal-BT9qJDmX.js";import{A as a}from"./ActionMenu-1CNNC7AQ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BtHFg94K.js";import"./OrganisasjonsnummerAlert-DjukhxoG.js";import"./VStack-BxLT0d6X.js";import"./BasePrimitive-DDMhX20D.js";import"./Box-BVPjClTp.js";import"./List-AWxqnavx.js";import"./Link-CdKIer7e.js";import"./KandidatHendelseTag-Dim6KXxF.js";import"./Tag-DHnluFVD.js";import"./ChatExclamationmark-t88kacSQ.js";import"./FileXMark-Bnhenm1k.js";import"./Trash-CXIR7oXi.js";import"./HandShakeHeart-up2aL-a2.js";import"./Calendar-BxkcVKI0.js";import"./ThumbUp-CCLqk3ge.js";import"./ExclamationmarkTriangle-eudKkerf.js";import"./Table-DJs7crw0.js";import"./index-CFZJFg7l.js";import"./index-B40KJ5b4.js";import"./util-BdeMvgko.js";import"./Modal-BZ5C8WF8.js";import"./floating-ui.react-CvEZw-0s.js";import"./useFormField-DPcPQkwW.js";import"./ReadMore-CDsOAi5a.js";import"./useControllableState-d5HlKukQ.js";import"./ChevronDown-D2QCjj1N.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C1L6rLPT.js";import"./Modal.context-Cq02MwlR.js";import"./Portal-CyvltQ2b.js";import"./useValueAsRef-hxxWJ-et.js";import"./Floating-CkMCyzDm.js";import"./useDescendant-BSTG9OiP.js";import"./DismissableLayer-BWglAePK.js";import"./ChevronRight-YfQRRqLy.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Y as default};
