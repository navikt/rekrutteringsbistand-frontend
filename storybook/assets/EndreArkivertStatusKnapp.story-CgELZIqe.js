import{r as i,j as e,d as l}from"./iframe-ByNpXw81.js";import{E as s}from"./EndreArkivertStatusModal-BGikdwEb.js";import{A as a}from"./ActionMenu-C2tJHBBD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C-adtj-6.js";import"./OrganisasjonsnummerAlert-CgoWqrfn.js";import"./VStack-BkCe9z3a.js";import"./BasePrimitive-CgEC5yfj.js";import"./List-C0CGx6t_.js";import"./Link-K7iHMQmO.js";import"./KandidatHendelseTag-BDLVCQQX.js";import"./Tag-BIhHedAj.js";import"./ChatExclamationmark-D8oH4723.js";import"./FileXMark-CWKNfRsF.js";import"./Trash-BSgz52q-.js";import"./HandShakeHeart-f3HbAaro.js";import"./Calendar-Cudjsd_l.js";import"./ThumbUp-B2DxAcQQ.js";import"./Table-CRfVQTev.js";import"./util-ChU84pnD.js";import"./parse-CqHOPKoV.js";import"./getDefaultOptions-BH8bkUTA.js";import"./parseISO-upBYiumH.js";import"./index-D3yaVyU9.js";import"./index-B40KJ5b4.js";import"./isBefore-D2MnlS4x.js";import"./util-esJN40y8.js";import"./Modal-D2Nut8bL.js";import"./floating-ui.react-BxBUTSmx.js";import"./Date.Input-Aio1NogG.js";import"./useFormField-BWbpbANY.js";import"./useControllableState-CF148P0b.js";import"./ChevronDown-CuGLSyjk.js";import"./Modal.context-D5msxr56.js";import"./Portal-E7AaDyiu.js";import"./useDescendant-DqJITIpZ.js";import"./useClientLayoutEffect-CDmxK94Y.js";import"./DismissableLayer-BQOrSO4O.js";import"./Floating-D0PuAiXz.js";import"./ChevronRight-CnZV6X7D.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
