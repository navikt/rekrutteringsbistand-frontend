import{r as s,j as e,d as p}from"./iframe-BA8lGxgc.js";import{E as i}from"./EndreArkivertStatusModal-CkI1YPQB.js";import{A as a}from"./ActionMenu-BDwx9Un8.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-xIeaODv6.js";import"./OrganisasjonsnummerAlert-2VNoVFHS.js";import"./VStack-DqzLThnb.js";import"./BasePrimitive-CzcpJyoT.js";import"./List-D5E-FGmL.js";import"./Link-DeXU7FXb.js";import"./KandidatHendelseTag-BcjMiIdK.js";import"./Tag-CYMsqiOQ.js";import"./ChatExclamationmark-B6cQYi_k.js";import"./FileXMark-BAgWfogE.js";import"./Trash-C1yt_cag.js";import"./HandShakeHeart-DZhiV6m5.js";import"./Calendar-CwN-hPGG.js";import"./ThumbUp-BAiA4eiW.js";import"./Table-CqBmIssP.js";import"./index-Bx4qJFrm.js";import"./index-B40KJ5b4.js";import"./util-Cu4x6vVJ.js";import"./Modal-FL_hfnIr.js";import"./floating-ui.react-oXij7_b1.js";import"./Date.Input-DD4Kcipt.js";import"./useFormField-DmljyEKY.js";import"./useControllableState-sTcONFh0.js";import"./ChevronDown-BTdMiVCP.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CGYyINhG.js";import"./Modal.context-B3p26qHn.js";import"./Portal-C86qxS3C.js";import"./useLatestRef-0RizkFOC.js";import"./useDescendant-DkIsMul7.js";import"./DismissableLayer-Cs8olJS3.js";import"./Floating-BhRFj5Ef.js";import"./ChevronRight-BEEe5jeR.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
