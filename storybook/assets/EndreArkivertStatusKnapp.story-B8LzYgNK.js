import{r as i,j as e,d as l}from"./iframe-BebJRiVm.js";import{E as s}from"./EndreArkivertStatusModal-D68ahpKF.js";import{A as a}from"./ActionMenu-CVnGp2Rs.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-joEcD6VU.js";import"./OrganisasjonsnummerAlert-B58diLk8.js";import"./VStack-ieBgEx_9.js";import"./BasePrimitive-D6Zi2XAC.js";import"./List-D9elBhoj.js";import"./Link-4eNfuCYY.js";import"./KandidatHendelseTag-AB7hUi_-.js";import"./Tag-CL3kJ4mm.js";import"./ChatExclamationmark-Bn6IsHl0.js";import"./FileXMark-DbPiFMgP.js";import"./Trash-DqIrZuIv.js";import"./HandShakeHeart-tczTNArD.js";import"./Calendar-DanYuDDB.js";import"./ThumbUp-_prN9aAy.js";import"./Table-C_EgM2uL.js";import"./util-D15lQn--.js";import"./format-CJcTvnkY.js";import"./match-DfPDRPQM.js";import"./parse-BXYDRMTi.js";import"./getDefaultOptions-B7iLoQN-.js";import"./parseISO-CrR--Dkd.js";import"./index-CjyM3s74.js";import"./index-B40KJ5b4.js";import"./isBefore-DChyuHjT.js";import"./util-CA16XgRB.js";import"./Modal-BLbY6Jf6.js";import"./floating-ui.react-XWokGLuC.js";import"./Date.Input-ChXEZ9KO.js";import"./useFormField-mSV91YqM.js";import"./useControllableState-C2NTHZgX.js";import"./ChevronDown-Dvj_iGkM.js";import"./Modal.context-pT0tppVX.js";import"./Portal-40JYkOyh.js";import"./useDescendant-DfTKdJgi.js";import"./useClientLayoutEffect-C3jk9aW7.js";import"./DismissableLayer-Dpt2aX5Q.js";import"./Floating-CAbeTBw7.js";import"./ChevronRight-CPlIRVOj.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
