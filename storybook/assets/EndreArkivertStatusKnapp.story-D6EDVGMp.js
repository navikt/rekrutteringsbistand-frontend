import{r as i,j as e,d as p}from"./iframe-dDyLELCN.js";import{E as s}from"./EndreArkivertStatusModal-BbBp2weJ.js";import{A as a}from"./ActionMenu-C0hsHxAH.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-29_U6Mp7.js";import"./OrganisasjonsnummerAlert-DkZcrKX0.js";import"./VStack-jPI2_5MN.js";import"./BasePrimitive-B9_PGHxz.js";import"./List-DX2Nsu8R.js";import"./Link-BHHifg93.js";import"./KandidatHendelseTag-KOWE9ntz.js";import"./Tag-5nFgEjDD.js";import"./ChatExclamationmark-clHFKuI8.js";import"./FileXMark-BPctVBRQ.js";import"./Trash-VOyAOEn3.js";import"./HandShakeHeart-r3C8OKTj.js";import"./Calendar-BsgMjBiK.js";import"./ThumbUp-CkfxuxUI.js";import"./ExclamationmarkTriangle-DeVuXY-G.js";import"./Table-mRucO3Hx.js";import"./index-BfWeFRSW.js";import"./index-B40KJ5b4.js";import"./util-CBgO15wo.js";import"./Modal-Cn4DiLEm.js";import"./floating-ui.react-C9yisIqS.js";import"./Date.Input-BNgyAyBN.js";import"./useFormField-BguGJLCY.js";import"./useControllableState-DB-5zWXL.js";import"./ChevronDown-COKw2Fvl.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-_reS0PqZ.js";import"./Modal.context-CyJwV-9C.js";import"./Portal-DqLeecrG.js";import"./useLatestRef-CYtNFwCZ.js";import"./useDescendant-CwiPvWB_.js";import"./DismissableLayer-C-7oYFSu.js";import"./Floating-CBXVFJt4.js";import"./ChevronRight-CwSmLkyh.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
