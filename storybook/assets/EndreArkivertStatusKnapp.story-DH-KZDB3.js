import{r as i,j as e,e as l}from"./iframe-CYGmpbFx.js";import{E as s}from"./EndreArkivertStatusModal-0nFvjrXP.js";import{A as a}from"./ActionMenu-DDy-fhqp.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-D625h6bh.js";import"./OrganisasjonsnummerAlert-ApUZM2-e.js";import"./VStack-D1VTWk4O.js";import"./BasePrimitive-CgXjeC8Z.js";import"./List-Cwb2MmIF.js";import"./Link-OSWFCzzX.js";import"./KandidatHendelseTag-DPH4tbvK.js";import"./Tag-DGVfr9rr.js";import"./ChatExclamationmark-Cln-Qvig.js";import"./FileXMark-Q0h4w8uX.js";import"./Trash-Cxpc9wlr.js";import"./HandShakeHeart-BOwI8cHe.js";import"./Calendar-RCVrHvI4.js";import"./ThumbUp-Cim8z76B.js";import"./Table-CqBcmo6t.js";import"./util-gOt3_Pyc.js";import"./format-Dw1SpVLZ.js";import"./match-CivtSffV.js";import"./parseISO-BPtudVCF.js";import"./parse-tmfDgK11.js";import"./getDefaultOptions-DM2GHvKD.js";import"./util-C76tBaN9.js";import"./Modal-BtW3pjgb.js";import"./floating-ui.react-C_Ji5Bix.js";import"./Date.Input-jZmJ-Pyy.js";import"./useFormField-Bvm5uANL.js";import"./useControllableState-D3hxcXud.js";import"./ChevronDown-3z86rFGh.js";import"./Modal.context-BnLUGpTN.js";import"./Portal-G0mLWwGC.js";import"./useDescendant-DpPZBL4W.js";import"./useClientLayoutEffect-BsOlTr7j.js";import"./DismissableLayer-HqJggTnx.js";import"./Floating-CtB32558.js";import"./ChevronRight-eNsLcMvC.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
