import{r as i,j as e,d as l}from"./iframe-BwFHCbBn.js";import{E as s}from"./EndreArkivertStatusModal-BysKmS_Y.js";import{A as a}from"./ActionMenu-D607xmNA.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DYAMuCUL.js";import"./OrganisasjonsnummerAlert-DvyXhF_a.js";import"./VStack-K3QKP0V0.js";import"./BasePrimitive-BNXjGdaB.js";import"./List-CSIholbe.js";import"./Link-Cgb5FHMs.js";import"./KandidatHendelseTag-CnT4mVi1.js";import"./Tag-Z37UogoK.js";import"./ChatExclamationmark-DwZK9o6V.js";import"./FileXMark-Fw6QPVxk.js";import"./Trash-Bxm4p4Gt.js";import"./HandShakeHeart-7YVjBE9Y.js";import"./Calendar-E9fxOvDF.js";import"./ThumbUp-BAjF0-nQ.js";import"./Table-VABNjWEw.js";import"./util-DhPaykA3.js";import"./format-BcSMjo4Z.js";import"./match-D7ZttDwi.js";import"./parse-D5JUYnKE.js";import"./getDefaultOptions-C1srR_wH.js";import"./parseISO-CObrnXOb.js";import"./util-e_WnzYIy.js";import"./Modal-CcX2UsI9.js";import"./floating-ui.react-DSt_G1Mr.js";import"./Date.Input-Dgmyslsn.js";import"./useFormField-BuJKEgmm.js";import"./useControllableState-CK1iRQ76.js";import"./ChevronDown-_Vl9cyeX.js";import"./Modal.context-BNG1La1A.js";import"./Portal-DWcXgWfE.js";import"./useDescendant-DkCq7a5W.js";import"./useClientLayoutEffect-CiE3Twg0.js";import"./DismissableLayer-DSgU7EkV.js";import"./Floating-DCJ6rvPq.js";import"./ChevronRight-BrjDHjsW.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
