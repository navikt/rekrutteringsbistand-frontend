import{r as i,j as e,d as l}from"./iframe-D2qk06b9.js";import{E as s}from"./EndreArkivertStatusModal-DBxGuG8M.js";import{A as a}from"./ActionMenu-BIRB_Ejo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CGiBosJt.js";import"./OrganisasjonsnummerAlert-DUc8mytz.js";import"./VStack-D9NjHXKD.js";import"./BasePrimitive-DHsUWIon.js";import"./Box-ev7bPFwZ.js";import"./List-B4XJgJoc.js";import"./Link-DDxFzdGY.js";import"./KandidatHendelseTag-C0GrFqnq.js";import"./Tag-39UELPPM.js";import"./ChatExclamationmark-DyTKy811.js";import"./FileXMark-CuxCy8Dh.js";import"./Trash-Csb-g1YU.js";import"./HandShakeHeart-DKiNlJu4.js";import"./Calendar-BJ2HVi-_.js";import"./ThumbUp-Bgy4vdnc.js";import"./ExclamationmarkTriangle-BtGVo-c4.js";import"./Table-BriCsZse.js";import"./index-DJbTq8sZ.js";import"./index-B40KJ5b4.js";import"./util-DOM9QJYQ.js";import"./Modal-DGqTsXqn.js";import"./floating-ui.react-C52pHC-p.js";import"./useFormField-BLjVSavf.js";import"./ReadMore-DGGBhlWF.js";import"./useControllableState-DW-IcaiN.js";import"./ChevronDown-KTg6uqib.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CAHRMErA.js";import"./Modal.context-HFXbj7pd.js";import"./Portal-BhTj2bdE.js";import"./useValueAsRef-j9mC_0Wh.js";import"./Floating-BuMAPCPH.js";import"./useDescendant-z8f6DXoh.js";import"./DismissableLayer-Cl6K_98h.js";import"./ChevronRight-Dso_-qwW.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
