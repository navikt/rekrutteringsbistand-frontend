import{r as s,j as e,d as p}from"./iframe-Dy0lgISD.js";import{E as i}from"./EndreArkivertStatusModal-CGjoAkQp.js";import{A as a}from"./ActionMenu-BxVQhgzZ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-4ihAi1Vd.js";import"./OrganisasjonsnummerAlert-Bhoy52Yu.js";import"./VStack-DoN2IO4E.js";import"./BasePrimitive-CQr7-pyL.js";import"./List-Dx95tQEs.js";import"./Link-dq1pqMCI.js";import"./KandidatHendelseTag-sB1FI4LX.js";import"./Tag-Bgfs15oY.js";import"./ChatExclamationmark-mnpx42yJ.js";import"./FileXMark-Dvyb1woY.js";import"./Trash-CQFlK5ks.js";import"./HandShakeHeart-CsXAGir8.js";import"./Calendar-DkoO1Plo.js";import"./ThumbUp-DhsAfMQl.js";import"./Table-BR6gcF0p.js";import"./index-B4PmVqKX.js";import"./index-B40KJ5b4.js";import"./util-BRqn0qrI.js";import"./Modal-aidDq1f6.js";import"./floating-ui.react-D5df03w-.js";import"./Date.Input-BgiE-HeY.js";import"./useFormField-CKGIjrUK.js";import"./useControllableState-DsPI5clQ.js";import"./ChevronDown-BUvm8QKR.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BppbtjEv.js";import"./Modal.context-BzlekgQp.js";import"./Portal-BxO1BEfI.js";import"./useLatestRef-kNqACp-i.js";import"./useDescendant-gtpiM4GY.js";import"./DismissableLayer-CwiY48hJ.js";import"./Floating-JkM8H2jw.js";import"./ChevronRight-DN-K0u38.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
