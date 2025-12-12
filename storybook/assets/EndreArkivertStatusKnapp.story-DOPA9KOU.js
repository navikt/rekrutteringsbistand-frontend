import{r as s,j as e,d as p}from"./iframe-CkXwiOco.js";import{E as i}from"./EndreArkivertStatusModal-C2FYW0Yg.js";import{A as a}from"./ActionMenu-ChSlJ9PO.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DtOCfj4G.js";import"./OrganisasjonsnummerAlert-C8tSdnIi.js";import"./VStack-JNDCCjJP.js";import"./BasePrimitive-D7804odP.js";import"./List-ZBexDUX1.js";import"./Link-CKbZ3XZg.js";import"./KandidatHendelseTag-DyaZCOwo.js";import"./Tag-qHxTQz7s.js";import"./ChatExclamationmark-B7WMmAvI.js";import"./FileXMark-LvRGHOt7.js";import"./Trash-iId3LJot.js";import"./HandShakeHeart-ePZKpLk3.js";import"./Calendar-D-qcCiQb.js";import"./ThumbUp-BFGcaxts.js";import"./Table-B_b5D6yB.js";import"./index-B_Gmig1n.js";import"./index-B40KJ5b4.js";import"./util-DN9Wte-k.js";import"./Modal-CT8FsD8G.js";import"./floating-ui.react-DsSZBiJ6.js";import"./Date.Input-B5_L8H_W.js";import"./useFormField-Rq_gcKQ5.js";import"./useControllableState-CyMfcbpD.js";import"./ChevronDown-D3-xymWN.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-DK3ALoYQ.js";import"./Modal.context-B5bY_3Nt.js";import"./Portal-B9JvWDj-.js";import"./useLatestRef-Dxnkt8Ao.js";import"./useDescendant-B_Xt6JYk.js";import"./DismissableLayer-B8alNiQB.js";import"./Floating-RSH6SYmr.js";import"./ChevronRight-CPZfMyyF.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
