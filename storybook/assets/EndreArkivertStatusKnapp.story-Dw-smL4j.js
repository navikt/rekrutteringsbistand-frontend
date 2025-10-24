import{r as i,j as e,o as l}from"./iframe-DZyrTSlI.js";import{E as s}from"./EndreArkivertStatusModal-DIWr_c1b.js";import{A as a}from"./ActionMenu-DsEdSMLC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BkAw1Mkr.js";import"./OrganisasjonsnummerAlert-fw0smuCn.js";import"./VStack-Bi3_lm1-.js";import"./BasePrimitive-DsapbUAH.js";import"./List-CypvTfcm.js";import"./Link-DpvyDfp9.js";import"./KandidatHendelseTag-DLqx-B6C.js";import"./Tag-DFzpGXaJ.js";import"./ChatExclamationmark-iuBP3eJo.js";import"./FileXMark-Bh_C5zZN.js";import"./Trash-BhVhLJs_.js";import"./HandShakeHeart-BC1s7_NO.js";import"./Calendar--tOITD5g.js";import"./ThumbUp-BO4EIKNS.js";import"./Table-B3zrRkWX.js";import"./util-D-Ql6dhl.js";import"./format-CxDBX73B.js";import"./match-Bhd-0bF1.js";import"./parse-DvmpoZJt.js";import"./getDefaultOptions-BnejP4zr.js";import"./parseISO-KPFOWa3j.js";import"./util-P4U7UwH7.js";import"./Modal-DGAQvmmn.js";import"./floating-ui.react-DdUQq2B3.js";import"./Date.Input-DYwhDOSj.js";import"./useFormField-P10hdtN7.js";import"./useControllableState-D5wZx8MS.js";import"./ChevronDown-CoI8HCn0.js";import"./Modal.context-DtBDKmOm.js";import"./Portal-DuMv07kh.js";import"./useDescendant-VAvGN301.js";import"./useClientLayoutEffect-BxODUUc8.js";import"./DismissableLayer-BvD7YC6p.js";import"./Floating-iKvmiMa5.js";import"./ChevronRight-DS-IoR8D.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
