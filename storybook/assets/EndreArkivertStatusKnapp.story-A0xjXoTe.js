import{r as i,j as e,o as l}from"./iframe-DwCeUcpF.js";import{E as s}from"./EndreArkivertStatusModal-BheAOO59.js";import{A as a}from"./ActionMenu-D0StrI8J.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-ChP9k33A.js";import"./OrganisasjonsnummerAlert-CoXjmlwF.js";import"./VStack-D6hOBrE4.js";import"./BasePrimitive-Jh0xf_JO.js";import"./List-D9io_hwL.js";import"./Link-BOXQ--_T.js";import"./KandidatHendelseTag-DMrzV7Tn.js";import"./Tag-DVJQu9tw.js";import"./ChatExclamationmark-gKxU5Or8.js";import"./FileXMark-jm5k5WE5.js";import"./Trash-dx6nwkck.js";import"./HandShakeHeart-D82zD2iw.js";import"./Calendar-BLuLYfCH.js";import"./ThumbUp-DQKSXmIX.js";import"./Table-Dj9aueVg.js";import"./util-BItQrrej.js";import"./format-BMhxV5pv.js";import"./match-CB3mvxqp.js";import"./parse-CzlhRlc5.js";import"./getDefaultOptions-BnFjI66N.js";import"./parseISO-N1d7_gMU.js";import"./index-BEKt7dbX.js";import"./index-B40KJ5b4.js";import"./isBefore-XnSLFwsW.js";import"./util-BRXlMc76.js";import"./Modal-gYe538qt.js";import"./floating-ui.react-CFeW6sX0.js";import"./Date.Input-x0C3NBAs.js";import"./useFormField-20kFEF7J.js";import"./useControllableState-CdwTxnNv.js";import"./ChevronDown-D5-1Qh-a.js";import"./Modal.context-CbGkjZ7C.js";import"./Portal-DuR5T2wf.js";import"./useDescendant-Cz42C0A9.js";import"./useClientLayoutEffect-DOY64x3I.js";import"./DismissableLayer-DFUxmEzV.js";import"./Floating-DDyZov3o.js";import"./ChevronRight-eFDzUYdZ.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
