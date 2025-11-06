import{r as i,j as e,d as l}from"./iframe-DxFO8IvB.js";import{E as s}from"./EndreArkivertStatusModal-BdC-QLmR.js";import{A as a}from"./ActionMenu-CN4qh3ST.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bx5Bh9AX.js";import"./OrganisasjonsnummerAlert-CUceEugp.js";import"./VStack-qaCCDpee.js";import"./BasePrimitive-BaqMTUpz.js";import"./List-DVvtlFCQ.js";import"./Link-DwpzwPgp.js";import"./KandidatHendelseTag-DBW4uWwr.js";import"./Tag-DQBZdq-6.js";import"./ChatExclamationmark-Ci7EBtJP.js";import"./FileXMark-COvzPyrZ.js";import"./Trash-DoeLRnir.js";import"./HandShakeHeart-l_VS9-hh.js";import"./Calendar-DV_dxZU5.js";import"./ThumbUp-CW_SQ9lV.js";import"./Table-CdzJnmri.js";import"./util-DZ3qgcJo.js";import"./parse-Dky1ezAl.js";import"./getDefaultOptions-Fdz5HjLp.js";import"./parseISO-DIXD6R6r.js";import"./index-H2AEdEPn.js";import"./index-B40KJ5b4.js";import"./isBefore-DAtEqNzd.js";import"./util-DMAiq0PX.js";import"./Modal-D7Ivt0rL.js";import"./floating-ui.react-BGSAD5qD.js";import"./Date.Input-CIMNl_9q.js";import"./useFormField-BSkyo7ru.js";import"./useControllableState-CPx_uKRc.js";import"./ChevronDown-DYWOWGBT.js";import"./Modal.context-zx_c4c0w.js";import"./Portal-1nYmzj9s.js";import"./useDescendant-C-lIABgv.js";import"./useClientLayoutEffect-BkjQOB3H.js";import"./DismissableLayer-CggqpmuT.js";import"./Floating-CETi6cKv.js";import"./ChevronRight-I-S2si1o.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
