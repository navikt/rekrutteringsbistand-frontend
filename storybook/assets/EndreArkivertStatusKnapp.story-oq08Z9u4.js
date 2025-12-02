import{r as s,j as e,d as p}from"./iframe-DYebcAac.js";import{E as i}from"./EndreArkivertStatusModal-CIxfV07v.js";import{A as a}from"./ActionMenu-D4rK84sw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C2DOphGQ.js";import"./OrganisasjonsnummerAlert-3JKXLxol.js";import"./VStack-BXgQHkJH.js";import"./BasePrimitive-CRUxVIom.js";import"./List-B2JosOUI.js";import"./Link-CvjscnMo.js";import"./KandidatHendelseTag-CtxiF6k9.js";import"./Tag-B0qlNe2D.js";import"./ChatExclamationmark-Vm4Ti-4P.js";import"./FileXMark-Bz7kePTl.js";import"./Trash-BoeAt-iU.js";import"./HandShakeHeart-BOLx3G0Q.js";import"./Calendar-8ApYkf7s.js";import"./ThumbUp-DjcY46H4.js";import"./Table-DSoqSj2C.js";import"./index-Cj7qpNcs.js";import"./index-B40KJ5b4.js";import"./util-B_AA4L4z.js";import"./Modal-COqdtEtc.js";import"./floating-ui.react-CLtdJFP3.js";import"./Date.Input-COhCvR1O.js";import"./useFormField-Bk3OyaAW.js";import"./useControllableState-C8fzJ6EH.js";import"./ChevronDown-BQ1H2NSN.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-FTSIvdKE.js";import"./Modal.context-C5bciP-B.js";import"./Portal-CwiM0_0d.js";import"./useLatestRef-x4xRX3MJ.js";import"./useDescendant-XWHpP6OH.js";import"./DismissableLayer-ypqI2WT0.js";import"./Floating-CEFujiZp.js";import"./ChevronRight-CnnNxztt.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
