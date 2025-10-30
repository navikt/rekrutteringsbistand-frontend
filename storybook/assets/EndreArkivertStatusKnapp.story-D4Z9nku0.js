import{r as i,j as e,d as l}from"./iframe-Dn6oOtbf.js";import{E as s}from"./EndreArkivertStatusModal-8Ezp4ViS.js";import{A as a}from"./ActionMenu-ekvDoQ8a.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-dK394pnf.js";import"./OrganisasjonsnummerAlert-D5-jFYKp.js";import"./VStack-1Y06ajMB.js";import"./BasePrimitive-M-VNSZSQ.js";import"./List-Bu_qaqD6.js";import"./Link-DeUJpW5N.js";import"./KandidatHendelseTag-DVdlj2i_.js";import"./Tag-BaUOFaZU.js";import"./ChatExclamationmark-9Thb-iIS.js";import"./FileXMark-cXbFvwSu.js";import"./Trash-B9vT4zgD.js";import"./HandShakeHeart-rKAmRAyZ.js";import"./Calendar-CHtXvFtN.js";import"./ThumbUp-BGxaKFAm.js";import"./Table-By0dovrZ.js";import"./util-BLWTfEaX.js";import"./format-C0S4jMUI.js";import"./match-DH_fZqpI.js";import"./parse-VVjy0MJj.js";import"./getDefaultOptions-DBO-DaTO.js";import"./parseISO-Cf7-iP2x.js";import"./index-Cc-rxqI-.js";import"./index-B40KJ5b4.js";import"./isBefore-B9Mk30_B.js";import"./util-Bsw3rW9y.js";import"./Modal-BVkvhY2h.js";import"./floating-ui.react-506kzj2V.js";import"./Date.Input-C-6OEEjw.js";import"./useFormField-CXUgeBOA.js";import"./useControllableState-CgPyIzFT.js";import"./ChevronDown-n1n2toSX.js";import"./Modal.context-3AglHSQc.js";import"./Portal-BGtA14lb.js";import"./useDescendant-BLB7meWF.js";import"./useClientLayoutEffect-BczMoVgo.js";import"./DismissableLayer-rE89-BAl.js";import"./Floating-LrYiQ1RF.js";import"./ChevronRight-CpsCRIe8.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
