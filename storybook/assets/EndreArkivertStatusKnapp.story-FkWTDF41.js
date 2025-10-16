import{r as i,j as e,d as p}from"./iframe-BXziY_Zi.js";import{E as s}from"./EndreArkivertStatusModal-BQLE77W2.js";import{A as a}from"./ActionMenu-CU8BV00U.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CyAXKXv4.js";import"./OrganisasjonsnummerAlert-JCFq03jU.js";import"./VStack-BfV9VSAn.js";import"./BasePrimitive-Ov_Zozgq.js";import"./List-_K5Vmu90.js";import"./Link-4XsaCY8h.js";import"./KandidatHendelseTag-CrFMkKI_.js";import"./Tag-27IIFXKU.js";import"./FileXMark-C4GrZGwO.js";import"./Trash-DAtihogT.js";import"./HandShakeHeart-zB5wL4zo.js";import"./Calendar-D53PpRMk.js";import"./ThumbUp-B6tdJAUa.js";import"./Table-BAh0mp6c.js";import"./util-BjIecu4N.js";import"./format-B1cmwU2D.js";import"./match-C_z_8etj.js";import"./parse-DkXjFss9.js";import"./getDefaultOptions-O6SvB0vf.js";import"./parseISO-Chp8ZZ_L.js";import"./util-DEIDtFt4.js";import"./Modal-Byk1nq5S.js";import"./floating-ui.react-DmgCcC2w.js";import"./Date.Input-hiWrJIWD.js";import"./useFormField-D4xFFkD-.js";import"./useControllableState-D5oGLZjf.js";import"./ChevronDown-CicwSVMz.js";import"./Modal.context-DkZACfZM.js";import"./Portal-DoA8jeTO.js";import"./useDescendant-Dn1MdCUk.js";import"./useClientLayoutEffect-C8YEyyK8.js";import"./DismissableLayer-Esa6WiPg.js";import"./Floating-hIlada_I.js";import"./ChevronRight-DeylLC0a.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
