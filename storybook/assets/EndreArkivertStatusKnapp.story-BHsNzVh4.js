import{r as s,j as e,d as p}from"./iframe-BaixhwPd.js";import{E as i}from"./EndreArkivertStatusModal-BJVQHsnp.js";import{A as a}from"./ActionMenu-C053KI-I.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C9OJfunF.js";import"./OrganisasjonsnummerAlert-CsqeIAFI.js";import"./VStack-D_dma6vx.js";import"./BasePrimitive-B10oB-GC.js";import"./List-Cp9scLmz.js";import"./Link-B-dOmAvL.js";import"./KandidatHendelseTag-CzAGVoTu.js";import"./Tag-BqtJBFrm.js";import"./ChatExclamationmark-NyUq3Q5b.js";import"./FileXMark-uIcWe4hD.js";import"./Trash-DnK28rAm.js";import"./HandShakeHeart-CmPEhmhq.js";import"./Calendar-BBdMEy0D.js";import"./ThumbUp-Cf0XFTlG.js";import"./Table-D54CpVkL.js";import"./index-BQM2YZXg.js";import"./index-B40KJ5b4.js";import"./util-FeeJLEIb.js";import"./Modal-CYd9NYLN.js";import"./floating-ui.react-BL0cmmOa.js";import"./Date.Input-BWutGdRi.js";import"./useFormField-CRj1shUX.js";import"./useControllableState-DEuiE3NL.js";import"./ChevronDown-CzCRaCzj.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-D3dVonUg.js";import"./Modal.context-DXSg-077.js";import"./Portal-BcBABZ9V.js";import"./useLatestRef-DCWijGfn.js";import"./useDescendant-DQ13ledV.js";import"./DismissableLayer-DXapyLoM.js";import"./Floating-Dm7sVZxI.js";import"./ChevronRight-Bx_LiFjR.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
