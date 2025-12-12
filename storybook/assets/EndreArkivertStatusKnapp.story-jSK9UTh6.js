import{r as s,j as e,d as p}from"./iframe-T-H04Ezd.js";import{E as i}from"./EndreArkivertStatusModal-GiXTnv1f.js";import{A as a}from"./ActionMenu-gu8MpOmx.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C5uJS3BX.js";import"./OrganisasjonsnummerAlert-CfzuYHBj.js";import"./VStack-Bu-24W7v.js";import"./BasePrimitive-CD4yN9iL.js";import"./List-790aD13K.js";import"./Link-CpzkYPhO.js";import"./KandidatHendelseTag-DmNwrPEw.js";import"./Tag-B78aTiIZ.js";import"./ChatExclamationmark-CEq0XBXp.js";import"./FileXMark-B96StWBE.js";import"./Trash-gKkmwHxt.js";import"./HandShakeHeart-BMlil5Mu.js";import"./Calendar-Diq6AebV.js";import"./ThumbUp-C_xSVdgp.js";import"./Table-Wh8VKEqs.js";import"./index-4LmzDlw9.js";import"./index-B40KJ5b4.js";import"./util-DnEn7dJZ.js";import"./Modal-CVI_Lh_E.js";import"./floating-ui.react-r5z69PAR.js";import"./Date.Input-j5cj3e6p.js";import"./useFormField-CIRHe0WO.js";import"./useControllableState-CWJMUhnE.js";import"./ChevronDown-Bh39XFR4.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CCUoL0HN.js";import"./Modal.context-BlEMFX_m.js";import"./Portal-DLF3acVV.js";import"./useLatestRef-DV6yFHwr.js";import"./useDescendant-o6gX2mm0.js";import"./DismissableLayer-BNF07ANn.js";import"./Floating-BT-sMVoQ.js";import"./ChevronRight-BD6YVJeN.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
