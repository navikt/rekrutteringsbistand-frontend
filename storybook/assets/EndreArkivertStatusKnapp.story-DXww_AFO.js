import{r as i,j as e,d as l}from"./iframe-uGpH5bHE.js";import{E as s}from"./EndreArkivertStatusModal-Dm2TuZxs.js";import{A as a}from"./ActionMenu-DSaDthRF.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BNBMcZ4m.js";import"./OrganisasjonsnummerAlert-CrfVppIj.js";import"./VStack-C6U3-jpr.js";import"./BasePrimitive-DdQYhl9r.js";import"./List-6Cq_JyoF.js";import"./Link-_i-0pCB8.js";import"./KandidatHendelseTag-CbIcfoqq.js";import"./Tag-CIu7y533.js";import"./ChatExclamationmark-BGMJYM-O.js";import"./FileXMark-CiYdMBRl.js";import"./Trash-wnzU6iti.js";import"./HandShakeHeart-BBHlLIgg.js";import"./Calendar-EBOO-NN0.js";import"./ThumbUp-DPUW51cg.js";import"./Table-CD4SeFGN.js";import"./util-B5BZJM_V.js";import"./parse-_VpaQtsM.js";import"./getDefaultOptions-CP7UEA2u.js";import"./parseISO-DFYNu8uR.js";import"./index-DzCzZi3c.js";import"./index-B40KJ5b4.js";import"./isBefore-RPGehvCy.js";import"./util-Dr85VjP5.js";import"./Modal-DWtSBDNa.js";import"./floating-ui.react-dxPmWD31.js";import"./Date.Input-CDvyQSFD.js";import"./useFormField-Bl3PAVkQ.js";import"./useControllableState-DSpD-_vb.js";import"./ChevronDown-DrGBd-hu.js";import"./Modal.context-e5xMW6Fz.js";import"./Portal-_FR-UNR8.js";import"./useDescendant-B1BoJk-w.js";import"./useClientLayoutEffect-Z9eXB4or.js";import"./DismissableLayer-Cjhp46-H.js";import"./Floating-Dmhw-NQ9.js";import"./ChevronRight-3cjdG2-d.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
