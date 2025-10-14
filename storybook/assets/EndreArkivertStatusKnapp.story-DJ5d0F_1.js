import{r as i,j as e,e as l}from"./iframe-BIBlb7jU.js";import{E as s}from"./EndreArkivertStatusModal-B_3hr1-n.js";import{A as a}from"./ActionMenu-CWGbfwa9.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-gmAv3jhr.js";import"./OrganisasjonsnummerAlert-DUbyiUeq.js";import"./VStack-UZ9RtCeW.js";import"./BasePrimitive-hRRbf9ja.js";import"./List-Crb_EZay.js";import"./Link-DtjVUng9.js";import"./KandidatHendelseTag-CyQmMP1Q.js";import"./Tag-bSqi75pu.js";import"./ChatExclamationmark-CmE2x4dW.js";import"./FileXMark-m8emJ4j5.js";import"./Trash-Bkja8DjR.js";import"./HandShakeHeart-C3gkb3XK.js";import"./Calendar-CdzV6HXg.js";import"./ThumbUp-D_YVTCCu.js";import"./Table-WCgBjGcl.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CAvOd24l.js";import"./format-alVTIgQr.js";import"./match--zb4cLZ5.js";import"./parseISO-Brau4hq8.js";import"./parse-Dylxks-E.js";import"./getDefaultOptions-COAmtKIT.js";import"./util-BqVd911_.js";import"./Modal-Dpze01w3.js";import"./floating-ui.react-DEzdvJId.js";import"./Date.Input--Gl-NW01.js";import"./useFormField-DrsqqdWL.js";import"./useControllableState-AwvWBElT.js";import"./ChevronDown-DuV9F8YC.js";import"./Modal.context-CHA4jJyw.js";import"./Portal-D4EtPidH.js";import"./useDescendant-JMK-5JaG.js";import"./useClientLayoutEffect-Dh5o0Bmr.js";import"./DismissableLayer-DWR2AiB2.js";import"./ChevronRight-BSxoAr6K.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
