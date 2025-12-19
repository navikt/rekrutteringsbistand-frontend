import{r as s,j as e,d as p}from"./iframe-BI30XQnF.js";import{E as i}from"./EndreArkivertStatusModal-niJVMDnL.js";import{A as a}from"./ActionMenu-vicM2u6O.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BnxcNx4Y.js";import"./OrganisasjonsnummerAlert-W15zpEie.js";import"./VStack-CZMV2HC4.js";import"./BasePrimitive-CZE9qk7F.js";import"./List-BIkHkuYY.js";import"./Link-D4z1f04J.js";import"./KandidatHendelseTag-CSskVXBJ.js";import"./Tag-Dxs0Vko4.js";import"./ChatExclamationmark-DF-1Cb_k.js";import"./FileXMark-DnOgS1YU.js";import"./Trash-3JQrFA94.js";import"./HandShakeHeart-DAxA4Ims.js";import"./Calendar-iJrxzXuD.js";import"./ThumbUp-CKLFu6F5.js";import"./Table-nidyqZEJ.js";import"./index-DkFBChQ6.js";import"./index-B40KJ5b4.js";import"./util-fxl2veKI.js";import"./Modal-bVJ2R-tw.js";import"./floating-ui.react-BxirlH8W.js";import"./Date.Input-Bb1wLdYj.js";import"./useFormField-BSE-6FGG.js";import"./useControllableState-DEvJbc5V.js";import"./ChevronDown-CIFnBDD2.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DyDkmotJ.js";import"./Modal.context-CrBnhJq6.js";import"./Portal-rDVbSlPW.js";import"./useLatestRef-DOqucmqf.js";import"./useDescendant--JrQHG23.js";import"./DismissableLayer-UGMmz6iD.js";import"./Floating-DY4UPg6A.js";import"./ChevronRight-B0g05sT-.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
