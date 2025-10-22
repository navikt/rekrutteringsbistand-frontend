import{r as i,j as e,o as l}from"./iframe-DLRfPnIA.js";import{E as s}from"./EndreArkivertStatusModal-CwrgetWB.js";import{A as a}from"./ActionMenu-Cs1jbyrI.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DPOG-WgZ.js";import"./OrganisasjonsnummerAlert-CuQCpySo.js";import"./VStack-4LIPwqdy.js";import"./BasePrimitive-BEpTr0x7.js";import"./List-1JqX_zGN.js";import"./Link-DJOsYkHV.js";import"./KandidatHendelseTag-CSw9k2Pi.js";import"./Tag-Bex3rpKK.js";import"./ChatExclamationmark-BPzKqelu.js";import"./FileXMark-fy2i8p_8.js";import"./Trash-BWxxXeYN.js";import"./HandShakeHeart-DVN5OzbY.js";import"./Calendar-CDBQMsFO.js";import"./ThumbUp-CYIiqwTe.js";import"./Table-BamrKyXB.js";import"./util-AvlE4TX_.js";import"./format-BnHsCra-.js";import"./match-BAt8OPxC.js";import"./parse-DwFSpjbA.js";import"./getDefaultOptions-DJMDZ6IL.js";import"./parseISO-261MZjGk.js";import"./util-Cr9yaPzG.js";import"./Modal-dGxTQDz5.js";import"./floating-ui.react-BVVz65mv.js";import"./Date.Input-D2YxAgPX.js";import"./useFormField-DWyA6BM_.js";import"./useControllableState-BvFOz6dj.js";import"./ChevronDown-CsjiObvX.js";import"./Modal.context-DoUDg5BX.js";import"./Portal-BBL4w1ph.js";import"./useDescendant-Qr841VWI.js";import"./useClientLayoutEffect-CfiW0lxK.js";import"./DismissableLayer-B0BVm3uO.js";import"./Floating-C0Uf3Ug3.js";import"./ChevronRight-EhtKXS95.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
