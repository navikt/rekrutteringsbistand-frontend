import{r as i,j as e,o as l}from"./iframe-Cnqf-bcl.js";import{E as s}from"./EndreArkivertStatusModal-CLqeAqPE.js";import{A as a}from"./ActionMenu-CU-eW4sD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BKFhtA1R.js";import"./OrganisasjonsnummerAlert-Crk21BJO.js";import"./VStack-BL1M7op8.js";import"./BasePrimitive-DxDcg_UA.js";import"./List-C4WnpohN.js";import"./Link-xmdcPjF1.js";import"./KandidatHendelseTag-DnA3LP75.js";import"./Tag-C89_9Q9a.js";import"./ChatExclamationmark-BaBPdmiJ.js";import"./FileXMark-DoWjNFhs.js";import"./Trash-Da8YnMzQ.js";import"./HandShakeHeart-Zmv_IxzJ.js";import"./Calendar-U5L3IAOx.js";import"./ThumbUp-B3AziIcu.js";import"./Table-BMgL1XGB.js";import"./util-B6xTVb4d.js";import"./format-BEtlDaco.js";import"./match-Dsf7IN36.js";import"./parse-CKfm7Msh.js";import"./getDefaultOptions-DnqILuRB.js";import"./parseISO-DTAWIXv6.js";import"./util-1LrmIP3t.js";import"./Modal-BgmrSXda.js";import"./floating-ui.react-BPTziuQR.js";import"./Date.Input-8RYFoirS.js";import"./useFormField-DSJEni5o.js";import"./useControllableState-C1wR1eYe.js";import"./ChevronDown-CrfRh_Y3.js";import"./Modal.context-b3xVmYOX.js";import"./Portal-68bkrRIL.js";import"./useDescendant-C96LCEco.js";import"./useClientLayoutEffect-C7dti1gw.js";import"./DismissableLayer-DLwtcRFm.js";import"./Floating-BefB-NWo.js";import"./ChevronRight-yrikcTqv.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
