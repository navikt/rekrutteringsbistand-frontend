import{r as i,j as e,d as l}from"./iframe-8PA8JIpM.js";import{E as s}from"./EndreArkivertStatusModal-BDZOcV05.js";import{A as a}from"./ActionMenu-hC6B_1yq.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DjDIdn6k.js";import"./OrganisasjonsnummerAlert-BF-uqVZd.js";import"./VStack-C5TklDBs.js";import"./BasePrimitive-CS6dP3kN.js";import"./Box-lNhXOLcS.js";import"./List-L5kmjqNb.js";import"./Link-DwOhcXtK.js";import"./KandidatHendelseTag-D1-JW3PQ.js";import"./Tag-DdN6yDgJ.js";import"./ChatExclamationmark-C76uizCL.js";import"./FileXMark-DW8LQ00M.js";import"./Trash-CsbrXyGo.js";import"./HandShakeHeart-BeW9pxc7.js";import"./Calendar-CiGgD1Wd.js";import"./ThumbUp-CyJ_juv6.js";import"./ExclamationmarkTriangle-U8KhXais.js";import"./Table-BnGeDy7b.js";import"./index-CP1sWLEr.js";import"./index-B40KJ5b4.js";import"./util-Qt-ynxAK.js";import"./Modal-5nBSo7Ni.js";import"./floating-ui.react-DA3NzabH.js";import"./useFormField-BW1aEeVF.js";import"./ReadMore-FzzSl8EK.js";import"./useControllableState-BO1oWSXl.js";import"./ChevronDown-aDL9GrOY.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-BuANfnd3.js";import"./Modal.context-D15DMEGj.js";import"./Portal-yQAJTGQF.js";import"./useValueAsRef-DJD3ZnQY.js";import"./Floating-BV2sFdDH.js";import"./useDescendant-CScYp0UO.js";import"./DismissableLayer-D5QKxWcX.js";import"./ChevronRight-5ovCURGO.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
