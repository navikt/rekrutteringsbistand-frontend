import{r as i,j as e,e as p}from"./iframe-CKFsWzOg.js";import{E as s}from"./EndreArkivertStatusModal-C65f9ks3.js";import{A as a}from"./ActionMenu-c44q-iGj.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-G78JjZX2.js";import"./OrganisasjonsnummerAlert-BRyBBSvV.js";import"./VStack-CKYEjYP9.js";import"./BasePrimitive-BYyecKB7.js";import"./List-BP41UQUP.js";import"./Link-CKoQmdNa.js";import"./KandidatHendelseTag-B6FXP1Dd.js";import"./Tag-DLZT034P.js";import"./FileXMark-BWULVMlW.js";import"./Trash-CusESwjy.js";import"./HandShakeHeart-DMYfZIZi.js";import"./Calendar-BI71gbdC.js";import"./ThumbUp-BaFn2Avv.js";import"./Table-C-HaVMJy.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BhCQq61x.js";import"./format-C7fWF7bo.js";import"./match-_P1yVbyy.js";import"./parseISO-B6fEo_Rt.js";import"./parse-BNYgtDZ7.js";import"./getDefaultOptions-CrgewLMG.js";import"./util-BKoP-Whd.js";import"./Modal-CO9x5ynS.js";import"./floating-ui.react--LN1m7xr.js";import"./Date.Input-DOTjZeUY.js";import"./useFormField-BpikIYHf.js";import"./useControllableState-DUu4Zg_I.js";import"./ChevronDown-5n4edY9Q.js";import"./Modal.context-DV2XXzj1.js";import"./Portal-BlJ8XOS2.js";import"./useDescendant-Cjhqtasz.js";import"./useClientLayoutEffect-CLPK0uFg.js";import"./DismissableLayer-DV2u_9DA.js";import"./ChevronRight-v9eyFlBs.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
