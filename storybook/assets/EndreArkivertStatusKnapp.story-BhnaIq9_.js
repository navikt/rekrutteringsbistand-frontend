import{r as i,j as e,e as p}from"./iframe-Toj4pykk.js";import{E as s}from"./EndreArkivertStatusModal-C5kO0E-R.js";import{A as a}from"./ActionMenu-Br0OZ2Tn.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DSBqXm2s.js";import"./OrganisasjonsnummerAlert-g64K9oEi.js";import"./VStack-Cvr9eCR3.js";import"./BasePrimitive-DPRW-2ci.js";import"./List-6umJsgvh.js";import"./Link-CnRvrC1D.js";import"./KandidatHendelseTag-Bv77E4ep.js";import"./Tag-Da0VVrnZ.js";import"./FileXMark-CXngGzHw.js";import"./Trash-D3GH5m_z.js";import"./HandShakeHeart-Cg646Fa_.js";import"./Calendar-DbsWeNMw.js";import"./ThumbUp-DA1fCJZp.js";import"./Table-wHMVrjQU.js";import"./util-CkgJohuK.js";import"./format-DkxpHWLB.js";import"./match-cULtJEmT.js";import"./parseISO-CY5p6dlu.js";import"./parse-wdjbf7Nz.js";import"./getDefaultOptions-CMKcdfqW.js";import"./util-QhXL_9PD.js";import"./Modal-C8GbhWYT.js";import"./floating-ui.react-BQ3mxbEN.js";import"./Date.Input-Dr0SC9lG.js";import"./useFormField-Ckpw-EIc.js";import"./useControllableState-CwIFAokw.js";import"./ChevronDown-DBDFtXTt.js";import"./Modal.context-vL2zOWLK.js";import"./Portal-kPgVS-53.js";import"./useDescendant-sJpxruLl.js";import"./useClientLayoutEffect-Cy5IKDaR.js";import"./DismissableLayer-CMluUa1A.js";import"./Floating-BJIyocw0.js";import"./ChevronRight-CjttDkmt.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
