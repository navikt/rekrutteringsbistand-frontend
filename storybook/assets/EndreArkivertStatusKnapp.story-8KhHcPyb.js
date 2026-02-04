import{r as i,j as e,d as l}from"./iframe-BjEgG8Bz.js";import{E as s}from"./EndreArkivertStatusModal-BLQxH_e0.js";import{A as a}from"./ActionMenu-C32aTz8n.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqAnCG-y.js";import"./OrganisasjonsnummerAlert-DF_RoieK.js";import"./VStack-DIKon2VT.js";import"./BasePrimitive-B0t64DbI.js";import"./Box-ByEKtJEc.js";import"./List-RFuLUqQ4.js";import"./Link-ChdFwBS1.js";import"./KandidatHendelseTag-B54LIVIK.js";import"./Tag-BQZGLJBi.js";import"./ChatExclamationmark-LdK6mvnt.js";import"./FileXMark-DBbj60vg.js";import"./Trash-CzOzhYhB.js";import"./HandShakeHeart-B-lHUtgJ.js";import"./Calendar-wRSe2NZ1.js";import"./ThumbUp-B2nMwgVw.js";import"./ExclamationmarkTriangle-D-jj1427.js";import"./Table-CqOTa5Ih.js";import"./index-C2glyhwD.js";import"./index-B40KJ5b4.js";import"./util-Cf5Ur_0N.js";import"./Modal-DfFPtuN9.js";import"./floating-ui.react-B2Z9rU6x.js";import"./useFormField-PRfv3Od9.js";import"./ReadMore-DOJ4P9sL.js";import"./useControllableState-C98CIYum.js";import"./ChevronDown-BgT3NBPr.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BNLWoC8N.js";import"./Modal.context-C6v3fOVZ.js";import"./Portal-CE_q3ihB.js";import"./useValueAsRef-Z-j3zBaU.js";import"./Floating-DtoksFfH.js";import"./useDescendant-BQUyAWra.js";import"./DismissableLayer-C6zBdjV7.js";import"./ChevronRight-GOO7Uiwi.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
