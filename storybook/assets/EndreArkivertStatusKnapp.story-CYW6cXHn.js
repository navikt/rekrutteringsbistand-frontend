import{r as s,j as e,d as p}from"./iframe-rg7Mi9Fm.js";import{E as i}from"./EndreArkivertStatusModal-rVEYUX6t.js";import{A as a}from"./ActionMenu-CFQeUmTn.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BiUNsutO.js";import"./OrganisasjonsnummerAlert-GRi70etK.js";import"./VStack-DrQVJZbY.js";import"./BasePrimitive-BiogUs6_.js";import"./List-B5Zb1zql.js";import"./Link-8vsD6bh1.js";import"./KandidatHendelseTag-BKKMnVDA.js";import"./Tag-CePG_4wH.js";import"./ChatExclamationmark-DihCNQAw.js";import"./FileXMark-BZYKe9uf.js";import"./Trash-DhrK18Rr.js";import"./HandShakeHeart-C_UIIpYx.js";import"./Calendar-t9CMsUw1.js";import"./ThumbUp-C7iiQW3_.js";import"./Table-BphJGzOj.js";import"./index-qMbBKF_W.js";import"./index-B40KJ5b4.js";import"./util-Bnm6XJYa.js";import"./Modal-BtsHoWHs.js";import"./floating-ui.react-5sgbQVDa.js";import"./Date.Input-DPh6gKPy.js";import"./useFormField-CH2lF7TD.js";import"./useControllableState-DviLRBNa.js";import"./ChevronDown-DW7__CRK.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BrQuwOC3.js";import"./Modal.context-rK_dUd0p.js";import"./Portal-CU5eNsYF.js";import"./useLatestRef-DsdRIYNG.js";import"./useDescendant-CFsmqmSk.js";import"./DismissableLayer-zGpqYdLX.js";import"./Floating-BBTdCG63.js";import"./ChevronRight-MF42VCS8.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
