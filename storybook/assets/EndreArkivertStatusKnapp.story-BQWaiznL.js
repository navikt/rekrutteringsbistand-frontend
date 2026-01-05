import{r as i,j as e,d as p}from"./iframe-CYiyhWTI.js";import{E as s}from"./EndreArkivertStatusModal-Cb_HEmeR.js";import{A as a}from"./ActionMenu-DxenmAJ7.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Ch3xKDrZ.js";import"./OrganisasjonsnummerAlert-3zleYlEj.js";import"./VStack-ClVH4Ku2.js";import"./BasePrimitive-BTpmfR_9.js";import"./List-BX-O7rcO.js";import"./Link-BYs-f_YW.js";import"./KandidatHendelseTag-Dr6MGsc9.js";import"./Tag-BKIF4Jhe.js";import"./ChatExclamationmark-CoE-goaS.js";import"./FileXMark-DacbSndw.js";import"./Trash-Chy14LSL.js";import"./HandShakeHeart-CE36xryi.js";import"./Calendar-BpKyObVo.js";import"./ThumbUp-DK4Sl93n.js";import"./ExclamationmarkTriangle-ngfBzqY_.js";import"./Table-BEF106oA.js";import"./index-WIlmYY_z.js";import"./index-B40KJ5b4.js";import"./util-DW5zFozq.js";import"./Modal-CLHJe2OT.js";import"./floating-ui.react-Bfz6SC7K.js";import"./Date.Input-Bkr6PkeN.js";import"./useFormField-gfWUKjlL.js";import"./useControllableState-DtSoKbzt.js";import"./ChevronDown-BL_ttcBG.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BS5rsZoI.js";import"./Modal.context-DDFbhODk.js";import"./Portal-DseP34-f.js";import"./useLatestRef-Bu2gHKBl.js";import"./useDescendant-Cu9dL8DC.js";import"./DismissableLayer-BNLVEwnI.js";import"./Floating-CdwHgiMX.js";import"./ChevronRight-BhwNDlXB.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,X as default};
