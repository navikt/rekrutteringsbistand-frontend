import{r as i,j as e,e as p}from"./iframe-BQJxXW9d.js";import{E as s}from"./EndreArkivertStatusModal-BLdEpCu9.js";import{A as a}from"./ActionMenu-CaRXI4ZS.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-D4D8XnLI.js";import"./OrganisasjonsnummerAlert-B7rcSb93.js";import"./VStack-D46019rJ.js";import"./BasePrimitive-BXqzJcUK.js";import"./List-CLc-5LkB.js";import"./Link-C54rWlFd.js";import"./KandidatHendelseTag-BtekIJZA.js";import"./Tag-4Cs80-uM.js";import"./FileXMark-BO5hpNuR.js";import"./Trash-CWCFb2vA.js";import"./HandShakeHeart-D1cb5IZd.js";import"./Calendar-BUIPGPOk.js";import"./ThumbUp-DXl4UXEL.js";import"./Table-C4cRX3o4.js";import"./util-BXDIftOZ.js";import"./format-DADo9TEe.js";import"./match-DeTCyl7A.js";import"./parseISO-MzENUmKJ.js";import"./parse-BMXXm650.js";import"./getDefaultOptions-Crc8mJKE.js";import"./util-C9HMcIxj.js";import"./Modal-B-K2myHi.js";import"./floating-ui.react-qbgNuRzq.js";import"./Date.Input-DkIuf96S.js";import"./useFormField-CC83feVF.js";import"./useControllableState-DLMKTCIV.js";import"./ChevronDown-D_v_0qT0.js";import"./Modal.context-DxEobc4s.js";import"./Portal-DNXh-AtB.js";import"./useDescendant-BazVU77l.js";import"./useClientLayoutEffect-MoxS65NT.js";import"./DismissableLayer-D0uVOeIp.js";import"./Floating-BlSc94v9.js";import"./ChevronRight-CRtyHgbr.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
