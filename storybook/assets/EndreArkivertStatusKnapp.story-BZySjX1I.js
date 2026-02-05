import{r as i,j as e,d as l}from"./iframe-BQn8oluG.js";import{E as s}from"./EndreArkivertStatusModal-DNo1K9MP.js";import{A as a}from"./ActionMenu-DFZhoxbD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CyhOc4oz.js";import"./OrganisasjonsnummerAlert-CYywNrcV.js";import"./VStack-CusJYT2i.js";import"./BasePrimitive-3X9LqDm9.js";import"./Box-DVLWXHQE.js";import"./List-CqxD3cjY.js";import"./Link-DWvxLqKl.js";import"./KandidatHendelseTag-B7uUE2XF.js";import"./Tag-BzqTsz9d.js";import"./ChatExclamationmark-DrTYDI0x.js";import"./FileXMark-Bi4WPtJY.js";import"./Trash-DGqxjYj7.js";import"./HandShakeHeart--0XvPa6w.js";import"./Calendar-BYG-Fmtl.js";import"./ThumbUp-IEtKGI8o.js";import"./ExclamationmarkTriangle-Cj19ZXv-.js";import"./Table-Cq7taEiR.js";import"./index-ufCrU90i.js";import"./index-B40KJ5b4.js";import"./util-CRfPFknI.js";import"./Modal-BbI0nr47.js";import"./floating-ui.react-DIZNPFob.js";import"./useFormField-QYCCEhIW.js";import"./ReadMore-BtbbZnCJ.js";import"./useControllableState-CCj747yy.js";import"./ChevronDown-0_y9Wyb-.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BACD_49t.js";import"./Modal.context-DNTgIFxy.js";import"./Portal-CW5ZBVtE.js";import"./useValueAsRef-Kuu0acC8.js";import"./Floating-BB73xC18.js";import"./useDescendant-CqCnzhwB.js";import"./DismissableLayer-BdYCKIFL.js";import"./ChevronRight-BA9bqRNx.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
