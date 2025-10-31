import{r as i,j as e,d as l}from"./iframe-BieBZBrC.js";import{E as s}from"./EndreArkivertStatusModal-DZ8FhUax.js";import{A as a}from"./ActionMenu-DTjFBcMo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bnf8RiZM.js";import"./OrganisasjonsnummerAlert-BvKz5vny.js";import"./VStack-j_6fDLqS.js";import"./BasePrimitive-C-AyPf28.js";import"./List-tzDAdmQv.js";import"./Link-CWeI14oH.js";import"./KandidatHendelseTag-Dd3aEsI4.js";import"./Tag-BnzJTYvC.js";import"./ChatExclamationmark-CElSCxaJ.js";import"./FileXMark-DnWXPm_c.js";import"./Trash-BYeHNZgS.js";import"./HandShakeHeart-DYywCy2W.js";import"./Calendar-BdhU97-1.js";import"./ThumbUp-Dpw8xDbk.js";import"./Table-Ce5VDLFH.js";import"./util-CaZvvzYS.js";import"./parse-COH9Z8ot.js";import"./getDefaultOptions-CHo2M-IZ.js";import"./parseISO-GHa_kk7l.js";import"./index-C2SWHjju.js";import"./index-B40KJ5b4.js";import"./isBefore-CeGnEHPl.js";import"./util-CF1SHtQv.js";import"./Modal-Dle4maZT.js";import"./floating-ui.react-BT8q7oaF.js";import"./Date.Input-YnMHaQ4h.js";import"./useFormField-A_jOGruo.js";import"./useControllableState-DtKQdZJ4.js";import"./ChevronDown-66bC11TG.js";import"./Modal.context-BqRc_p1X.js";import"./Portal-QvoiE7cM.js";import"./useDescendant-CBlcYzGO.js";import"./useClientLayoutEffect-B-LF-TZu.js";import"./DismissableLayer-BYCpcB0r.js";import"./Floating-D1B6S8x4.js";import"./ChevronRight-BI4Fdz4-.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
