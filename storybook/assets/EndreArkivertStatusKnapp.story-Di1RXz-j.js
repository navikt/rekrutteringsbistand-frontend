import{r as i,j as e,e as l}from"./iframe-wMpf0ByR.js";import{E as s}from"./EndreArkivertStatusModal-CMxsIXK2.js";import{A as a}from"./ActionMenu-B_A__J1I.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-C-Hope_N.js";import"./OrganisasjonsnummerAlert-BKr52Xym.js";import"./VStack-37CH0eKn.js";import"./BasePrimitive-DEaSCRuB.js";import"./List-BHDmJnU9.js";import"./Link-C2D8Bda_.js";import"./KandidatHendelseTag-B61CT4h9.js";import"./Tag-C8vi5CtI.js";import"./ChatExclamationmark-DfA6YhNf.js";import"./FileXMark-DeA6pc2C.js";import"./Trash-jLZQ19UU.js";import"./HandShakeHeart-CAERdGPL.js";import"./Calendar-DekOy3Fx.js";import"./ThumbUp-BhbmdYoP.js";import"./Table-BKb7dE0E.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-R7omXOg5.js";import"./format-CSHl5Iu1.js";import"./match-Ly9h5Kr8.js";import"./parseISO-CM3aM_-k.js";import"./parse-DhcZKNzd.js";import"./getDefaultOptions-BcXGjLgH.js";import"./util-B6y6F2Hz.js";import"./Modal-D8kwV6AV.js";import"./floating-ui.react-DjemWi0d.js";import"./Date.Input-ZaD_nC3W.js";import"./useFormField-DY0O83Jc.js";import"./useControllableState-DRGcQ7Ej.js";import"./ChevronDown-PRNqbvoX.js";import"./Modal.context-B2-4rYqW.js";import"./Portal-Nt0OG3wl.js";import"./useDescendant-P4dhj-_s.js";import"./useClientLayoutEffect-DmzneG6q.js";import"./DismissableLayer-YMLpy7FU.js";import"./ChevronRight-BwV3SHmY.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
