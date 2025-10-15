import{r as i,j as e,e as l}from"./iframe-B2xGUNX-.js";import{E as s}from"./EndreArkivertStatusModal-CLN1pUck.js";import{A as a}from"./ActionMenu-DTc1dGrn.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-iMCDFI9i.js";import"./OrganisasjonsnummerAlert-gjj98bPf.js";import"./VStack-LgcJaDfa.js";import"./BasePrimitive-AscQ94av.js";import"./List-BT2hrq8R.js";import"./Link-KW-0U3Oy.js";import"./KandidatHendelseTag-CZrPE1Ic.js";import"./Tag-DO0bA650.js";import"./ChatExclamationmark-BaqHWrX8.js";import"./FileXMark-CBNT-_yc.js";import"./Trash-CdE_28Ci.js";import"./HandShakeHeart-DwzG4i_Y.js";import"./Calendar-Le8lwLWI.js";import"./ThumbUp-Bnf09OAs.js";import"./Table-D1aYPWvO.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CJjk-0R0.js";import"./format-DbvlSUt5.js";import"./match-C0QkKNCv.js";import"./parseISO-IukRNK7-.js";import"./parse-BWBOIAJT.js";import"./getDefaultOptions-BP3X6oux.js";import"./util-B4sWpGcm.js";import"./Modal-G-5cvdDL.js";import"./floating-ui.react-BB9BoIX5.js";import"./Date.Input-DyqbiFvC.js";import"./useFormField-DJnSCjKQ.js";import"./useControllableState-BjNavWkk.js";import"./ChevronDown-CnFUOh5J.js";import"./Modal.context-BVPj6e4T.js";import"./Portal-D8RtQTrK.js";import"./useDescendant-vQDS0gox.js";import"./useClientLayoutEffect-Db4Q6k2U.js";import"./DismissableLayer-CTxK1av6.js";import"./ChevronRight-ySD2yIrB.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
