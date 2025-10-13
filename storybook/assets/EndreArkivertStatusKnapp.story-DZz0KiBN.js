import{r as i,j as e,e as p}from"./iframe-Bk2ExMXp.js";import{E as s}from"./EndreArkivertStatusModal-Dz2EPF4i.js";import{A as a}from"./ActionMenu-CgzxXW5J.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C4GS2fi3.js";import"./OrganisasjonsnummerAlert-z-4yC7BL.js";import"./VStack-BrgJZela.js";import"./BasePrimitive-B6Z69lzu.js";import"./List-Bj-Vbc_Z.js";import"./Link-ppp_mE_-.js";import"./KandidatHendelseTag-DBqbqhy3.js";import"./Tag-DLOBuFrJ.js";import"./FileXMark-BWnhuBxQ.js";import"./Trash-53uNVUd4.js";import"./HandShakeHeart-FINHHUTp.js";import"./Calendar-PfOWmbw2.js";import"./ThumbUp-BFeRRNd8.js";import"./Table-Cc2h9Gm3.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-D0bY77Dv.js";import"./format-CAywRZQ0.js";import"./match-B7tcGX9u.js";import"./parseISO-7TgmH8mW.js";import"./parse-DosHQWMe.js";import"./getDefaultOptions-Ck1xufvy.js";import"./util-Bj9I7rfg.js";import"./Modal-d-ul81sN.js";import"./floating-ui.react-8gdL2Sbe.js";import"./Date.Input-Dy-LTzXk.js";import"./useFormField-Bzn8rkcz.js";import"./useControllableState-JREvtEYi.js";import"./ChevronDown-B7VCVl_G.js";import"./Modal.context-m-44LJgz.js";import"./Portal-BN91yD-b.js";import"./useDescendant-DkY-_hV3.js";import"./useClientLayoutEffect-CIrrbVtR.js";import"./DismissableLayer-Cpx_wJKs.js";import"./ChevronRight-C-v5WNxd.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
