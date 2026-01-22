import{r as i,j as e,d as l}from"./iframe-_Y_FQOIK.js";import{E as s}from"./EndreArkivertStatusModal-BrwIkNtl.js";import{A as a}from"./ActionMenu-C_S7LI2Z.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext--pywmHYz.js";import"./OrganisasjonsnummerAlert-NhjOxu42.js";import"./VStack-BV-kTNrI.js";import"./BasePrimitive-CgAYLi8z.js";import"./Box-s_VFObiR.js";import"./List-COiFA3Ep.js";import"./Link-BbIgnuLN.js";import"./KandidatHendelseTag-Bf_DYnTB.js";import"./Tag-Du44VU8x.js";import"./ChatExclamationmark-BurAkCe3.js";import"./FileXMark-BHxYWS4a.js";import"./Trash-DP-Yxt5I.js";import"./HandShakeHeart-D8fZXbUs.js";import"./Calendar-E4u3W48J.js";import"./ThumbUp-NH__amz1.js";import"./ExclamationmarkTriangle-CrL1M-JZ.js";import"./Table-Dd3Fr_8y.js";import"./index-QQgzqSqo.js";import"./index-B40KJ5b4.js";import"./util-D2yyjroG.js";import"./Modal-BGOOgZuu.js";import"./floating-ui.react-BcjM_8Wz.js";import"./useFormField-DesCrsSR.js";import"./ReadMore-CJ9HoYGx.js";import"./useControllableState-D-6TawYQ.js";import"./ChevronDown-bE3GWpqo.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-tdwdHZzr.js";import"./Modal.context-C_2IzOEE.js";import"./Portal-BF_1Jgmg.js";import"./useValueAsRef-e9kOIaux.js";import"./Floating-BkIEDuGO.js";import"./useDescendant-D7tLhiI3.js";import"./DismissableLayer-B1s_qZ9h.js";import"./ChevronRight-CHuqZhhP.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
