import{r as i,j as e,d as l}from"./iframe-MRLikfE6.js";import{E as s}from"./EndreArkivertStatusModal-BktVNpcz.js";import{A as a}from"./ActionMenu-Bk_XcOF3.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DEaKwyD5.js";import"./OrganisasjonsnummerAlert-v9-YnsVe.js";import"./VStack-CKga3UqI.js";import"./BasePrimitive-WcRKw7Lq.js";import"./Box-bxckNUtE.js";import"./List-BP1uHXI-.js";import"./Link-BeQsjFWu.js";import"./KandidatHendelseTag-D-p_npeq.js";import"./Tag-C5lbsKPJ.js";import"./ChatExclamationmark-iKGH1a-g.js";import"./FileXMark-e4FmmKnZ.js";import"./Trash-BEOwnfEK.js";import"./HandShakeHeart-B9dRyKdy.js";import"./Calendar-fbNZIAKe.js";import"./ThumbUp-DHaJAsfw.js";import"./ExclamationmarkTriangle-D2tLiDIf.js";import"./Table-o5a0zq4E.js";import"./index-ClcRPOe_.js";import"./index-B40KJ5b4.js";import"./util-BK0NQHj-.js";import"./Modal-HWCiB4bD.js";import"./floating-ui.react-CPMB3lDK.js";import"./useFormField-CuV7CE-W.js";import"./ReadMore-CRRbFoIU.js";import"./useControllableState-CXTqdpiU.js";import"./ChevronDown-DhS0mOol.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Cls70-9d.js";import"./Modal.context-Qf00d-Ga.js";import"./Portal-Bszg4AYE.js";import"./useValueAsRef-mICkb1JM.js";import"./Floating-jD8st6UI.js";import"./useDescendant-xNAAGTNI.js";import"./DismissableLayer-BZ4kC1EZ.js";import"./ChevronRight-a1WpzXIc.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
