import{r as i,j as e,e as p}from"./iframe-XlTllAuX.js";import{E as s}from"./EndreArkivertStatusModal-DX149iS3.js";import{A as a}from"./ActionMenu-jSambwLJ.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-OmFZasYM.js";import"./OrganisasjonsnummerAlert-CV3WVrYQ.js";import"./VStack-CsoES-hm.js";import"./BasePrimitive-B27pQm3P.js";import"./List-VTGdx7DI.js";import"./Link-BZllahFp.js";import"./KandidatHendelseTag-DwG_0g3h.js";import"./Tag-BDONKljZ.js";import"./FileXMark-DIYkyt3P.js";import"./Trash-Css8GNUu.js";import"./HandShakeHeart-DeLxSOoE.js";import"./Calendar-DOtBe3lY.js";import"./ThumbUp-DENVjgkC.js";import"./Table-DQEfXYmu.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BHGYwjsw.js";import"./format-D2iUlHUk.js";import"./match-B5GTOkkR.js";import"./parseISO-CX-BFnlC.js";import"./parse-9h7q15na.js";import"./getDefaultOptions-CexkTlHf.js";import"./util-DZymvEEu.js";import"./Modal-C87dbEOB.js";import"./floating-ui.react-CQ1j8rqW.js";import"./Date.Input-Dvo-G1dZ.js";import"./useFormField-BBkBvgfd.js";import"./useControllableState-Dwr4OusZ.js";import"./ChevronDown-CaeRuUHi.js";import"./Modal.context-B_tjMCaq.js";import"./Portal-DziiisPX.js";import"./useDescendant-CHQi9KgN.js";import"./useClientLayoutEffect-B0RCFDC1.js";import"./DismissableLayer-DminS6_a.js";import"./ChevronRight-Cxqy0KjB.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
