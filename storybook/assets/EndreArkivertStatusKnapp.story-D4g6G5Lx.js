import{r as s,j as e,d as p}from"./iframe-DZidc6ne.js";import{E as i}from"./EndreArkivertStatusModal-DlH18fCD.js";import{A as a}from"./ActionMenu-CJz0z0oO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-XXfOC6Ua.js";import"./OrganisasjonsnummerAlert-KIBS92ps.js";import"./VStack-CT35bcBK.js";import"./BasePrimitive-DGGTuBQu.js";import"./List-Gkk8Lnu_.js";import"./Link-Bxi8Cnjn.js";import"./KandidatHendelseTag-CDMJayi4.js";import"./Tag-CJ_ullEH.js";import"./ChatExclamationmark-Yizz6DWz.js";import"./FileXMark-1hih9fuA.js";import"./Trash-CDbBnfx-.js";import"./HandShakeHeart-BcmZNNpe.js";import"./Calendar-CPHCr-VW.js";import"./ThumbUp-Cy7GuqiG.js";import"./Table-CTmqYVAw.js";import"./index-BzqkoKl8.js";import"./index-B40KJ5b4.js";import"./util-Bbk_Wzm7.js";import"./Modal-oJVF93Mp.js";import"./floating-ui.react-DFMGLDtM.js";import"./Date.Input-B65l9rmO.js";import"./useFormField-CwgffQtB.js";import"./useControllableState-d5QaYALg.js";import"./ChevronDown-CGg0Kr-2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-vxo5oBkf.js";import"./Modal.context-tifpMkeE.js";import"./Portal-CeWm1FJV.js";import"./useLatestRef-DTm9dWeK.js";import"./useDescendant-atIls6Fa.js";import"./DismissableLayer-CDRd_4R5.js";import"./Floating-B1oaNcQN.js";import"./ChevronRight-DUMSeziP.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
