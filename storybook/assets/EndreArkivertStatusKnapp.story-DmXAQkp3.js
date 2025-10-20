import{r as i,j as e,e as l}from"./iframe-C8w3jQxa.js";import{E as s}from"./EndreArkivertStatusModal-B5isz1mU.js";import{A as a}from"./ActionMenu-BwsYAUXZ.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BVYVQHvA.js";import"./OrganisasjonsnummerAlert-Cze3Hgfm.js";import"./VStack-CAbXWkSv.js";import"./BasePrimitive-BROnwPJ2.js";import"./List-0qiMuAjb.js";import"./Link-DjfLdA4d.js";import"./KandidatHendelseTag-B3bAFX8N.js";import"./Tag-C0rwH5pF.js";import"./ChatExclamationmark-aPjr0abY.js";import"./FileXMark-BpLpt36-.js";import"./Trash-BLUhIqIK.js";import"./HandShakeHeart-B_vPzC3T.js";import"./Calendar-DBSoqUNW.js";import"./ThumbUp-B22CcxHd.js";import"./Table-DZ4c3E2u.js";import"./util-D3MbZe3k.js";import"./format-n5F6r33y.js";import"./match-9uiui95j.js";import"./parseISO-DzVh93mM.js";import"./parse-B5EqXZBM.js";import"./getDefaultOptions-CusdfGXI.js";import"./util-vxjLQGim.js";import"./Modal-hL95cYpi.js";import"./floating-ui.react-mzmR1DFu.js";import"./Date.Input-DDRk_EfF.js";import"./useFormField-DgNx6Vtv.js";import"./useControllableState-Cc6Yk2cp.js";import"./ChevronDown-GRqF1mXI.js";import"./Modal.context-fjbQwAhG.js";import"./Portal-_yogMRW2.js";import"./useDescendant-DOxv04li.js";import"./useClientLayoutEffect-CT1VJBZF.js";import"./DismissableLayer-DdCa3bXh.js";import"./Floating-ChNlS3-N.js";import"./ChevronRight-OSxElmhA.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
