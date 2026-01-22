import{r as i,j as e,d as l}from"./iframe-iYTVubkb.js";import{E as s}from"./EndreArkivertStatusModal-C-5HjRjT.js";import{A as a}from"./ActionMenu-DsrGZTTt.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-y7ebpxGz.js";import"./OrganisasjonsnummerAlert-DAEs0rwZ.js";import"./VStack-CkGe8GD2.js";import"./BasePrimitive-boMTAT3N.js";import"./Box-BfsKMp9T.js";import"./List-B7AiJCK7.js";import"./Link-C2bgvx0K.js";import"./KandidatHendelseTag-2jNrj2wf.js";import"./Tag-Bo6lmjnk.js";import"./ChatExclamationmark-JmG1reqm.js";import"./FileXMark-CPW7kJ2g.js";import"./Trash-BFfxe-zj.js";import"./HandShakeHeart-CXOdnKtA.js";import"./Calendar-BfOwb4Q1.js";import"./ThumbUp-C9CFps8H.js";import"./ExclamationmarkTriangle-BsjgR85I.js";import"./Table-CPKuIuGE.js";import"./index-BJx6qXND.js";import"./index-B40KJ5b4.js";import"./util-CvOq8zPN.js";import"./Modal-Td0a8ER3.js";import"./floating-ui.react-DyKrx9yB.js";import"./useFormField-BHvkH1bP.js";import"./ReadMore-D50hHLON.js";import"./useControllableState-B7MdJ9VK.js";import"./ChevronDown-CI0gk8Xa.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D2kexCYt.js";import"./Modal.context-0kHKZyTP.js";import"./Portal-UIwkRJiI.js";import"./useValueAsRef-B8-QqpES.js";import"./Floating-D99qlo54.js";import"./useDescendant-CUf_Prmw.js";import"./DismissableLayer-B6vF3936.js";import"./ChevronRight-DIKddze6.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
