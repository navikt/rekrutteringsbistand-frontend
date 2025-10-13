import{r as i,j as e,e as p}from"./iframe-CgpsV_Wu.js";import{E as s}from"./EndreArkivertStatusModal-NPpAwkHX.js";import{A as a}from"./ActionMenu-BH7DC8Pa.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C_fgEUb0.js";import"./OrganisasjonsnummerAlert-Bhx4nxvy.js";import"./VStack-DlX7_wSI.js";import"./BasePrimitive-DnTZQNYl.js";import"./List-VI7Q0s2V.js";import"./Link-BDVHruia.js";import"./KandidatHendelseTag-BD3eADfS.js";import"./Tag-C37VkUMh.js";import"./FileXMark-B7ZDcxhz.js";import"./Trash-C31SSF9P.js";import"./HandShakeHeart-vrKMCZxi.js";import"./Calendar-DhK1AGOB.js";import"./ThumbUp-CBRf_sJN.js";import"./Table-D1lgSz1-.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-2ZMmUiey.js";import"./format-B58jIAnh.js";import"./match-fCXOdtfI.js";import"./parseISO-BOwU1sGN.js";import"./parse-D2-UF7KL.js";import"./getDefaultOptions-ClMb8y5B.js";import"./util-WBelmkEa.js";import"./Modal-CEWB9pMp.js";import"./floating-ui.react-CIjUBrgT.js";import"./Date.Input-C8sZDZm4.js";import"./useFormField-DliOPgKb.js";import"./useControllableState-BTYG4yPg.js";import"./ChevronDown-xqq8YiUn.js";import"./Modal.context-BRVM-1Ki.js";import"./Portal-BXXHAoyf.js";import"./useDescendant-CCor8Ww3.js";import"./useClientLayoutEffect-DSdcXSH4.js";import"./DismissableLayer-14fygN0E.js";import"./ChevronRight-C5wIi40n.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
