import{r as i,j as e,d as p}from"./iframe-D9efq7gm.js";import{E as s}from"./EndreArkivertStatusModal-CQm9-zjd.js";import{A as a}from"./ActionMenu-BbWu17Fs.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Qovu6sPZ.js";import"./OrganisasjonsnummerAlert-zOlyC-ht.js";import"./VStack-D9lq_a4Y.js";import"./BasePrimitive-BzWnuIU4.js";import"./List-4TSCPVGQ.js";import"./Link-BHqVFeiD.js";import"./KandidatHendelseTag-CqGO6C7b.js";import"./Tag-VuDPtMMo.js";import"./ChatExclamationmark-DE2gpsk9.js";import"./FileXMark-BxcFT4qE.js";import"./Trash-D_YgXyyT.js";import"./HandShakeHeart-BIe_nHom.js";import"./Calendar-B870ooCh.js";import"./ThumbUp-C_Rne1Rb.js";import"./ExclamationmarkTriangle-DoHZ6yS1.js";import"./Table-m3oZFwvc.js";import"./index-BzgkzeDT.js";import"./index-B40KJ5b4.js";import"./util-M2qWKBBT.js";import"./Modal-DPQxNsXa.js";import"./floating-ui.react-Bp_BnijO.js";import"./Date.Input-Dcou4NvS.js";import"./useFormField-BjBsX3sj.js";import"./useControllableState-CeE_Zg6y.js";import"./ChevronDown-BkInPlEQ.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-dTbrXiSO.js";import"./Modal.context-BS_OZFTE.js";import"./Portal-DRlXkuLu.js";import"./useLatestRef-IhTPTW7u.js";import"./useDescendant-Co3zNkM5.js";import"./DismissableLayer-wq39k6jE.js";import"./Floating-CjBNcG0G.js";import"./ChevronRight-DkHShnmi.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
