import{r as i,j as e,o as l}from"./iframe-B0j3dBe_.js";import{E as s}from"./EndreArkivertStatusModal-CF42_55O.js";import{A as a}from"./ActionMenu-NqJGZKLD.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CThpR_0Y.js";import"./OrganisasjonsnummerAlert-Bxy0Rcbz.js";import"./VStack-DbIwrttT.js";import"./BasePrimitive-Dod1M_er.js";import"./List-BYFxz2b-.js";import"./Link-DGDf1XYQ.js";import"./KandidatHendelseTag-UzCePNJV.js";import"./Tag-BNRBoOxy.js";import"./ChatExclamationmark-BynP-iDS.js";import"./FileXMark-C_9Jiyie.js";import"./Trash-IOfx71pU.js";import"./HandShakeHeart-Vczkap1y.js";import"./Calendar-ZqKhZm1M.js";import"./ThumbUp-DKnvruW5.js";import"./Table-DFZx8cdo.js";import"./util-CfoXsJ_z.js";import"./format-qS-sW-Ib.js";import"./match-DHz9fwDB.js";import"./parse-DNW-Wvb-.js";import"./getDefaultOptions-BKY15GUr.js";import"./parseISO-D4PY0Yeo.js";import"./util-Bq54C9Kr.js";import"./Modal-7DsMGCO3.js";import"./floating-ui.react-g9dkc5xN.js";import"./Date.Input-67tnFGPP.js";import"./useFormField-G-xxxCyd.js";import"./useControllableState-BWgq-Ysb.js";import"./ChevronDown-BxOVmkRo.js";import"./Modal.context-BUox5sdW.js";import"./Portal-_e2X-qed.js";import"./useDescendant-CHSh_-f7.js";import"./useClientLayoutEffect-_R_noXX6.js";import"./DismissableLayer-DYXclc2x.js";import"./Floating-CrP2bFSc.js";import"./ChevronRight-uEboCFnv.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
