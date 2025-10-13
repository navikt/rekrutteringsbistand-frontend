import{r as i,j as e,e as l}from"./iframe-UjNt-zBO.js";import{E as s}from"./EndreArkivertStatusModal-BUPBnfpU.js";import{A as a}from"./ActionMenu-935Et1qa.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DAs4tGP3.js";import"./OrganisasjonsnummerAlert-BPyO27kT.js";import"./VStack-mc8H1tM0.js";import"./BasePrimitive-B__jwBzH.js";import"./List-nP_AfZ2o.js";import"./Link-wUd1tDUs.js";import"./KandidatHendelseTag-CbZOketc.js";import"./Tag-BSmjQs8J.js";import"./ChatExclamationmark-BF1mIJ-k.js";import"./FileXMark-DuHeyXFT.js";import"./Trash-C3ObPB-Y.js";import"./HandShakeHeart-DNxzqHyN.js";import"./Calendar-lsXea1Wh.js";import"./ThumbUp-vYWQfMS3.js";import"./Table-C8KeRzZn.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-HQ_OYy-u.js";import"./format-BsgKkAMj.js";import"./match-qxZlEw6J.js";import"./parseISO-Cxtu-_IP.js";import"./parse-DABQu9wW.js";import"./getDefaultOptions-1bbeywKy.js";import"./util-puWZ81cp.js";import"./Modal-ixcUKZqK.js";import"./floating-ui.react-CI9_OYBn.js";import"./Date.Input-CPpcN85d.js";import"./useFormField-CJ0XBcBD.js";import"./ReadMore-nHc54yo_.js";import"./useControllableState-DzzemiT1.js";import"./ChevronDown-BhKbsGuQ.js";import"./Modal.context-pcs4IwGf.js";import"./Portal-BYDom4H_.js";import"./useDescendant-BVGE-7tV.js";import"./useClientLayoutEffect-CYppG7qD.js";import"./DismissableLayer-CAM72o7M.js";import"./ChevronRight-B0avpn8U.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
