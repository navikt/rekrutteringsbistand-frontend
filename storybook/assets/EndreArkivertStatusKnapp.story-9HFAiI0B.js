import{r as i,j as e,o as l}from"./iframe-C97ZE7sg.js";import{E as s}from"./EndreArkivertStatusModal-Bpkq7IXn.js";import{A as a}from"./ActionMenu-CAUb0Dqf.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-D8K9ewFu.js";import"./OrganisasjonsnummerAlert-D-BJV996.js";import"./VStack-UVKBDTSt.js";import"./BasePrimitive--wAx-l74.js";import"./List-BELJIMKe.js";import"./Link-CokqFeTg.js";import"./KandidatHendelseTag-C2KYmOIC.js";import"./Tag-iPE2K53n.js";import"./ChatExclamationmark-ZO-_zv82.js";import"./FileXMark-Bv0ZFBeU.js";import"./Trash-BT-FVWpx.js";import"./HandShakeHeart-B3GyMym4.js";import"./Calendar-CzqPLvaE.js";import"./ThumbUp-fgEACwNE.js";import"./Table-B96hvVL5.js";import"./util-ByCv2TR0.js";import"./format-Dpd-SLgv.js";import"./match-Cb4eL_Of.js";import"./parse-C5RlZesN.js";import"./getDefaultOptions-Bw1oc0Sy.js";import"./parseISO-BNRoldpU.js";import"./util-BZtQgFRo.js";import"./Modal-BG28xXoW.js";import"./floating-ui.react-BWdrZTEV.js";import"./Date.Input-GNTXNypm.js";import"./useFormField-Clw1DWDD.js";import"./useControllableState-D5C62osY.js";import"./ChevronDown-DxB1dxI9.js";import"./Modal.context-CU_WWhvz.js";import"./Portal-DXvnTXUR.js";import"./useDescendant-oS4vfHus.js";import"./useClientLayoutEffect-ywDazjGd.js";import"./DismissableLayer-B89bgzrm.js";import"./Floating-CrqkmWHQ.js";import"./ChevronRight-BVyV6zbN.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
