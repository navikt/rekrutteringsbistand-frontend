import{r as i,j as e,d as p}from"./iframe-Bm0iWSAX.js";import{E as s}from"./EndreArkivertStatusModal-DZJY3sii.js";import{A as a}from"./ActionMenu-juQpImHc.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DiPu0wP-.js";import"./OrganisasjonsnummerAlert-BiNTUKBU.js";import"./VStack-DeoVT_RF.js";import"./BasePrimitive-DSuUDil5.js";import"./List-6LowxMuQ.js";import"./Link-0ed56hQx.js";import"./KandidatHendelseTag-CL9EsGtt.js";import"./Tag-DtJZzZHV.js";import"./FileXMark-gmOMb3WS.js";import"./Trash-C2i0h2eW.js";import"./HandShakeHeart-CI8OTjR4.js";import"./Calendar-CtcWy-uR.js";import"./ThumbUp-B74QiFr9.js";import"./Table-DWtnJaPl.js";import"./util-DBYMKOy9.js";import"./format-7rGwuxAI.js";import"./match-BPcDNGi2.js";import"./parse-D4Igef4h.js";import"./getDefaultOptions-BR-nU7_j.js";import"./parseISO-D_SMTJVk.js";import"./util-Dz0LE6uV.js";import"./Modal-C85FhlMf.js";import"./floating-ui.react-DYGiiub_.js";import"./Date.Input-CHKMV-hr.js";import"./useFormField-B0esHqmv.js";import"./useControllableState-BnCX1B-b.js";import"./ChevronDown-CmedFOPk.js";import"./Modal.context-ClgWLOEW.js";import"./Portal-FkWdnQdc.js";import"./useDescendant-8k9NotGR.js";import"./useClientLayoutEffect-D6Xy-NdX.js";import"./DismissableLayer-BdtdDvlJ.js";import"./Floating-BgHmmN-h.js";import"./ChevronRight-CfW2IfhU.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
