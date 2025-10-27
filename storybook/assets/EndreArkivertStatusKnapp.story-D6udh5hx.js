import{r as i,j as e,d as l}from"./iframe-DnzzPsuE.js";import{E as s}from"./EndreArkivertStatusModal-BuKBePIE.js";import{A as a}from"./ActionMenu-BCj5LSHw.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BJZyqE9E.js";import"./OrganisasjonsnummerAlert-Bn_kfH1s.js";import"./VStack-BMNk3C3G.js";import"./BasePrimitive-BepNQS7l.js";import"./List-CqR4kegF.js";import"./Link-CaTHICZj.js";import"./KandidatHendelseTag-BuC8pwi5.js";import"./Tag-B1Z2_Is7.js";import"./ChatExclamationmark-CGc0wXvz.js";import"./FileXMark-Cyoi7yos.js";import"./Trash-BjtkO_oP.js";import"./HandShakeHeart-D918vreX.js";import"./Calendar-CrEPD-vT.js";import"./ThumbUp-DHgNpTNm.js";import"./Table-BB16ahds.js";import"./util-m2rlUe0u.js";import"./format-B-zWQ5Zw.js";import"./match-BzWMqxar.js";import"./parse-BJAx9Sy_.js";import"./getDefaultOptions-aRbab0sC.js";import"./parseISO-CknJZkO_.js";import"./util-Y2w3nFye.js";import"./Modal-B6IckbJN.js";import"./floating-ui.react-CKIy3Pr5.js";import"./Date.Input-xl8xuOwe.js";import"./useFormField-Bv-meZHM.js";import"./useControllableState-CICtFSXA.js";import"./ChevronDown-CtB-zssB.js";import"./Modal.context-C9jBMjOi.js";import"./Portal-DTopIKZU.js";import"./useDescendant-DSBGNHdu.js";import"./useClientLayoutEffect-DK3nPkze.js";import"./DismissableLayer-Ct7SF-gS.js";import"./Floating-BwwvX7Rb.js";import"./ChevronRight-MIgW7kwg.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
