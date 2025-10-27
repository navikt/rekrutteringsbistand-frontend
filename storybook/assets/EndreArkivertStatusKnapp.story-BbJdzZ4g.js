import{r as i,j as e,d as l}from"./iframe-BSwZn_oI.js";import{E as s}from"./EndreArkivertStatusModal-FUGTxMGm.js";import{A as a}from"./ActionMenu-CON4hL75.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BNUAfmvW.js";import"./OrganisasjonsnummerAlert-BX9tvKHw.js";import"./VStack-DjzZBkhX.js";import"./BasePrimitive-BHNKyCsd.js";import"./List-BEq7auS2.js";import"./Link-Bc3orUJ0.js";import"./KandidatHendelseTag-DgRM8e0p.js";import"./Tag-Cw756h_9.js";import"./ChatExclamationmark-DdLASfwf.js";import"./FileXMark-BOzKKBtH.js";import"./Trash-CW-Q6bzY.js";import"./HandShakeHeart-U-my39BI.js";import"./Calendar-KWJUd-kV.js";import"./ThumbUp-pLB34usb.js";import"./Table-B1aSq06A.js";import"./util-CtiqTgPV.js";import"./format-SsUeQAMy.js";import"./match-BhHc5umL.js";import"./parse-D37x4GqW.js";import"./getDefaultOptions-BG9ekSfG.js";import"./parseISO-Ca4v66bK.js";import"./index-Cfe2iOPl.js";import"./index-B40KJ5b4.js";import"./isBefore-hLlpF2sg.js";import"./util-BeYfbDft.js";import"./Modal-BoPnIdHz.js";import"./floating-ui.react-D8E_nKxQ.js";import"./Date.Input-DXjE-B4l.js";import"./useFormField-dVjSKRbI.js";import"./useControllableState-DTLpBcL-.js";import"./ChevronDown-6vB9t1a7.js";import"./Modal.context-ogyKFidp.js";import"./Portal-BwyLqxCh.js";import"./useDescendant-DwMa3nEz.js";import"./useClientLayoutEffect-DFm_hYrL.js";import"./DismissableLayer-puuWhmvF.js";import"./Floating-Dv-EynNH.js";import"./ChevronRight-DBivkhDK.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
