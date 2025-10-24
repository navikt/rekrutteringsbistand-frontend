import{r as i,j as e,o as l}from"./iframe-DsITc3mA.js";import{E as s}from"./EndreArkivertStatusModal-CF7g74uN.js";import{A as a}from"./ActionMenu-BY86g4ug.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUXpiv9x.js";import"./OrganisasjonsnummerAlert-BUC-F67u.js";import"./VStack-CvyiRE_f.js";import"./BasePrimitive--oSe4LW5.js";import"./List-CfXJtGdf.js";import"./Link-CY2UgJGm.js";import"./KandidatHendelseTag-w5zbIbts.js";import"./Tag-CLKybL4q.js";import"./ChatExclamationmark-DfMjluRc.js";import"./FileXMark-CrazEVzb.js";import"./Trash-DJTn7uuz.js";import"./HandShakeHeart-CaKP5WEO.js";import"./Calendar-UeiytvH-.js";import"./ThumbUp-Cr3eCfzz.js";import"./Table-DmabxBb3.js";import"./util-DfoRtf8j.js";import"./format-CX2UATzM.js";import"./match-HK4rQPNG.js";import"./parse-rayuB1S9.js";import"./getDefaultOptions-V7gnzTBC.js";import"./parseISO-BT7fYFKm.js";import"./util-DXyUuqfd.js";import"./Modal-DXMHfo8J.js";import"./floating-ui.react-CO8u8-zc.js";import"./Date.Input-v1rNPlVl.js";import"./useFormField-3f-yTkw_.js";import"./useControllableState-DLUEVyO-.js";import"./ChevronDown-D99Fb3BD.js";import"./Modal.context-CTOTWPev.js";import"./Portal-C5xt79du.js";import"./useDescendant-PvMXGtrB.js";import"./useClientLayoutEffect-DY3v19G_.js";import"./DismissableLayer-COL-0CdF.js";import"./Floating-B5EXpEC5.js";import"./ChevronRight-B8WasCXU.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
