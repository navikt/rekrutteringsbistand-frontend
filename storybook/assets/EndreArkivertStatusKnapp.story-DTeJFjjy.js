import{r as i,j as e,d as l}from"./iframe-Dx5p-74P.js";import{E as s}from"./EndreArkivertStatusModal-CbPx4Sny.js";import{A as a}from"./ActionMenu-D6dH75LN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BH3Z2Hac.js";import"./OrganisasjonsnummerAlert-BaL2Wpxk.js";import"./VStack-M4BYiSCC.js";import"./BasePrimitive-HT4iaqsB.js";import"./List-Ccl9AqJr.js";import"./Link-CQRIlL-P.js";import"./KandidatHendelseTag-Ckw2Yf1k.js";import"./Tag-BBp8XsrL.js";import"./ChatExclamationmark-DE5DLdsZ.js";import"./FileXMark-BZbSkgiU.js";import"./Trash-InTWHO4k.js";import"./HandShakeHeart-C3Fy77aQ.js";import"./Calendar-CUrO_5Yz.js";import"./ThumbUp-DV7m7lpk.js";import"./Table-CxSSnKIY.js";import"./util-BmmH2cUm.js";import"./parse-QRK9mKr4.js";import"./getDefaultOptions-VUvHQon4.js";import"./parseISO-CfdHbu5H.js";import"./index-DKRmfY_S.js";import"./index-B40KJ5b4.js";import"./isBefore-DNN8erOw.js";import"./util-BZefUNq6.js";import"./Modal-CXmacE1j.js";import"./floating-ui.react-1bRgyrJ9.js";import"./Date.Input-Dap9AMiQ.js";import"./ReadOnlyIcon-CUSYp9cW.js";import"./useFormField-CieKNAG5.js";import"./useControllableState-BHffPqA3.js";import"./ChevronDown-D21O9Nae.js";import"./Modal.context-TxvMfdUR.js";import"./Portal-D64R4Cmn.js";import"./useDescendant-BjBks9Ie.js";import"./useClientLayoutEffect-D5-QfL8A.js";import"./DismissableLayer-C8rDKSSp.js";import"./Floating-B2Jm_Wp_.js";import"./ChevronRight-DHqPh0IE.js";const _={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,_ as default};
