import{r as i,j as e,e as p}from"./iframe-BfAWemmc.js";import{E as s}from"./EndreArkivertStatusModal-gO5K0A2t.js";import{A as a}from"./ActionMenu-Vta_Fzqm.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CZJinPC_.js";import"./OrganisasjonsnummerAlert-CKNMwV2M.js";import"./VStack-E2AkkOI-.js";import"./BasePrimitive-4Bt1Qine.js";import"./List-CdDpv4YP.js";import"./Link-A-VeEQkm.js";import"./KandidatHendelseTag-COFRiu6Y.js";import"./Tag-BBcODoZp.js";import"./FileXMark-Cs2HeL1G.js";import"./Trash-lyimBUCL.js";import"./HandShakeHeart-BfGlbeYf.js";import"./Calendar-DLBjDSR0.js";import"./ThumbUp-BFmFnThU.js";import"./Table-C32uQCgO.js";import"./util-Cl7DppeK.js";import"./format-T6eo1b8A.js";import"./match-C_qGV_hU.js";import"./parseISO-NZvD22OB.js";import"./parse-B4iPNoV8.js";import"./getDefaultOptions-D1iwA5_5.js";import"./util-BF-xeARd.js";import"./Modal-BDH81RtI.js";import"./floating-ui.react-DNWRPkoZ.js";import"./Date.Input-wd6poww_.js";import"./useFormField-Ckq-4NQw.js";import"./useControllableState-DoW-j5pQ.js";import"./ChevronDown-BkwjVMbn.js";import"./Modal.context-BsYtDPHn.js";import"./Portal-q-r5LzgW.js";import"./useDescendant-ClfCo3QU.js";import"./useClientLayoutEffect-DBvfcbCB.js";import"./DismissableLayer-BkoMDDdv.js";import"./Floating-C6-FZzXS.js";import"./ChevronRight-CP6DEHpw.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
