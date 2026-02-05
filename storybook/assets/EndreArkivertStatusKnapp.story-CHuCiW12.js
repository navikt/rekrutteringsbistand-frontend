import{r as i,j as e,d as l}from"./iframe-CpaCEoJu.js";import{E as s}from"./EndreArkivertStatusModal-k0SxibRe.js";import{A as a}from"./ActionMenu-Coc95v4s.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DYslwLvD.js";import"./OrganisasjonsnummerAlert-CBKTM_bV.js";import"./VStack-DZOHDKWr.js";import"./BasePrimitive-B0kOqQyV.js";import"./Box-B7IY5ylq.js";import"./List-Czd-EMJu.js";import"./Link-DQF4F1ji.js";import"./KandidatHendelseTag-kwJ1jV44.js";import"./Tag-BqYppfeq.js";import"./ChatExclamationmark-D3pUvoye.js";import"./FileXMark-CpKz2oGD.js";import"./Trash-W_8MUcLN.js";import"./HandShakeHeart-DQ_HFcAF.js";import"./Calendar-BLCRivOi.js";import"./ThumbUp-Ckly2uCF.js";import"./ExclamationmarkTriangle-D26JaztB.js";import"./Table-D9t9M2UJ.js";import"./index-Cu9Sbfix.js";import"./index-B40KJ5b4.js";import"./util-D3Hr9p3M.js";import"./Modal-Cgabz7Y8.js";import"./floating-ui.react-hy8tB0AH.js";import"./useFormField-Cqq2OdCv.js";import"./ReadMore-V7HVrQRM.js";import"./useControllableState-C5_OEs8z.js";import"./ChevronDown-DbzlDCwY.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-Dbupq2RB.js";import"./Modal.context-D_dG1LGR.js";import"./Portal-D8hpO35p.js";import"./useValueAsRef-DSWBXVQ5.js";import"./Floating-caSKg8O2.js";import"./useDescendant-Bcr7RB2c.js";import"./DismissableLayer-YI4klIIr.js";import"./ChevronRight-BRRxKdRX.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
