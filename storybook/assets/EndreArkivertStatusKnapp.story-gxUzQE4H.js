import{r as i,j as e,o as l}from"./iframe-Bc22TiGf.js";import{E as s}from"./EndreArkivertStatusModal-DM56QTM-.js";import{A as a}from"./ActionMenu-BaVcnUvH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CY2IbqZG.js";import"./OrganisasjonsnummerAlert-8lOqGaPL.js";import"./VStack-CHyaBfxG.js";import"./BasePrimitive-BsaRKyTM.js";import"./List-DW3Obwi1.js";import"./Link-yk8URM6J.js";import"./KandidatHendelseTag-dJX1T5Fo.js";import"./Tag-BOK4K7Fc.js";import"./ChatExclamationmark-C_YcO6-c.js";import"./FileXMark-Dhg_p8mN.js";import"./Trash-B-oJJD1Z.js";import"./HandShakeHeart-hujy4NDb.js";import"./Calendar-CQWQBOHt.js";import"./ThumbUp-DIzMLwvs.js";import"./Table-NoCpgyJR.js";import"./util-BfnnAcuM.js";import"./format-B7kw_Wnx.js";import"./match-QT-28sSn.js";import"./parse-BVrRkuIf.js";import"./getDefaultOptions-BAduFABw.js";import"./parseISO-om9Gl7dg.js";import"./util-CJ_fx-i-.js";import"./Modal-wXi_SZZF.js";import"./floating-ui.react-CY0w-Y59.js";import"./Date.Input-CYdHd1Ao.js";import"./useFormField-BcmSh0nP.js";import"./useControllableState-UyBcdlFN.js";import"./ChevronDown-CkTEUA16.js";import"./Modal.context-BNAEMjIh.js";import"./Portal-CnJsNBHi.js";import"./useDescendant-PVy_roNc.js";import"./useClientLayoutEffect-BIyC2go8.js";import"./DismissableLayer-Bz7rM6Vb.js";import"./Floating-C1WU42hw.js";import"./ChevronRight-BwSg6iDl.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
