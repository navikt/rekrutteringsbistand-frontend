import{r as i,j as e,d as l}from"./iframe-Xu6LCdLp.js";import{E as s}from"./EndreArkivertStatusModal-CI7uJwXK.js";import{A as a}from"./ActionMenu-CZOPh6Jk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxrfUA4z.js";import"./OrganisasjonsnummerAlert-DEF4CGMU.js";import"./VStack-B8yWg0yF.js";import"./BasePrimitive-Do-NJpc0.js";import"./List-CqCvDNK_.js";import"./Link-BY2fBes3.js";import"./KandidatHendelseTag-2e-ynWB9.js";import"./Tag-ChTYVXm_.js";import"./ChatExclamationmark-D3hGO4dV.js";import"./FileXMark-CwcxO-Ee.js";import"./Trash-C3OJiBqw.js";import"./HandShakeHeart-CZCByx4B.js";import"./Calendar-CnhQo0Li.js";import"./ThumbUp-Dt52FnrT.js";import"./Table-Bl65rNr_.js";import"./util-CAiyUaV6.js";import"./format-DPX7Su2y.js";import"./match-JhzIkmE4.js";import"./parse-BCmSvDHV.js";import"./getDefaultOptions-DViSjfbX.js";import"./parseISO-DtzgeS_I.js";import"./util-D_4CsoMS.js";import"./Modal-BdpzMWrW.js";import"./floating-ui.react-BSQ1kU2M.js";import"./Date.Input-jERI6tCM.js";import"./useFormField-CFXIANGa.js";import"./useControllableState-BPvVIkLJ.js";import"./ChevronDown-DWtuC2j8.js";import"./Modal.context-X5ow3xPo.js";import"./Portal-dRD-T6g7.js";import"./useDescendant-DrDuq-kT.js";import"./useClientLayoutEffect-COLXtTwU.js";import"./DismissableLayer-D53PC-bl.js";import"./Floating-7ekiIOOd.js";import"./ChevronRight-BX-XKlWq.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
