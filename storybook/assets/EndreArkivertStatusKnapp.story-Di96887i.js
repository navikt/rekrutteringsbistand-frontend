import{r as i,j as e,d as l}from"./iframe-vxlhYioC.js";import{E as s}from"./EndreArkivertStatusModal-CtznTED2.js";import{A as a}from"./ActionMenu-DLBVhx4h.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BsXHsMDf.js";import"./OrganisasjonsnummerAlert-x2My_1Eb.js";import"./VStack-BZfHHrnb.js";import"./BasePrimitive-D5ktlNqm.js";import"./List-DjDlZYKP.js";import"./Link-D-UIIivm.js";import"./KandidatHendelseTag-nyFbxxtt.js";import"./Tag-CHdgDEIm.js";import"./ChatExclamationmark-CeH_4DOl.js";import"./FileXMark-DHSIBz7p.js";import"./Trash-KKPL1OMN.js";import"./HandShakeHeart-Bl_VA7Hk.js";import"./Calendar-mLj0Fd57.js";import"./ThumbUp-DL2Wo1MI.js";import"./Table-BPWMJHa8.js";import"./util-Dcl-up4a.js";import"./format-CPcFKb8h.js";import"./match-CkHEsP0d.js";import"./parse-CiNqO_-e.js";import"./getDefaultOptions-NvUiPm5I.js";import"./parseISO-tgOundRI.js";import"./index-IahZpkRC.js";import"./index-B40KJ5b4.js";import"./isBefore-BsF4uDyc.js";import"./util-DvTFOeO4.js";import"./Modal-BbDH7Fgf.js";import"./floating-ui.react-NB48aGkL.js";import"./Date.Input-KE5qtxC1.js";import"./useFormField-zskv9Rr_.js";import"./useControllableState-C8bmfjbm.js";import"./ChevronDown-C0Rp9KsQ.js";import"./Modal.context-1XeiDYLf.js";import"./Portal-C2HD5bCt.js";import"./useDescendant-BEvTWtx7.js";import"./useClientLayoutEffect-CAAJPNEI.js";import"./DismissableLayer-CFXz1sLV.js";import"./Floating-ChT0HWsE.js";import"./ChevronRight-V5n2EVuR.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
