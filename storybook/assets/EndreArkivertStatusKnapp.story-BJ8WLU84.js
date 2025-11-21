import{r as i,j as e,d as l}from"./iframe-Jss5f2B_.js";import{E as s}from"./EndreArkivertStatusModal-VVvVn4Fp.js";import{A as a}from"./ActionMenu-D7lnvu5p.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Ct0r6n5n.js";import"./OrganisasjonsnummerAlert-DdQwQ_tc.js";import"./VStack-Bvg5AqJD.js";import"./BasePrimitive-d2SIG9Yf.js";import"./List-CE9DLIHw.js";import"./Link-s8QL5d5b.js";import"./KandidatHendelseTag-CAiVXrpu.js";import"./Tag-DMI8stAH.js";import"./ChatExclamationmark-DoO1Xfh2.js";import"./FileXMark-BB5uMe3O.js";import"./Trash-bW2rKM93.js";import"./HandShakeHeart-U7xHXCw-.js";import"./Calendar-Pc9FG0ds.js";import"./ThumbUp-DXiBthy6.js";import"./Table-IzXQZlKx.js";import"./dato-B0xplmbs.js";import"./parse-Cx1esH9S.js";import"./getDefaultOptions-BCEF9-o_.js";import"./parseISO-CMhBJTE1.js";import"./index-CnHa8f62.js";import"./index-B40KJ5b4.js";import"./util-gyJA8csV.js";import"./Modal-C5DF6Tu8.js";import"./floating-ui.react-fqAcPkKE.js";import"./Date.Input-Dwqf4bQn.js";import"./useFormField-D0W6d14a.js";import"./useControllableState-CZKHLiQ0.js";import"./ChevronDown-CNVEhu9g.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Bxl3NU5W.js";import"./Modal.context-55emPdz_.js";import"./Portal-C-88-3-M.js";import"./useLatestRef-D6C22Yzy.js";import"./useDescendant-BN6N_S6e.js";import"./DismissableLayer-BExMC79b.js";import"./Floating-B9mav9r0.js";import"./ChevronRight-YK-CMcP2.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
