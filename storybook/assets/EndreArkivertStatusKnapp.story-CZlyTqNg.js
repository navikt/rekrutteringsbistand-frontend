import{r as i,j as e,e as l}from"./iframe-Cz03cNnU.js";import{E as s}from"./EndreArkivertStatusModal-CG31vzsc.js";import{A as a}from"./ActionMenu-D7TC6vga.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DOiKwQlj.js";import"./OrganisasjonsnummerAlert-A6V_r_9p.js";import"./VStack-Dn4Om_V9.js";import"./BasePrimitive-xMOo3z-A.js";import"./List-BkBSIZ9o.js";import"./Link-D-wNG8OT.js";import"./KandidatHendelseTag-DMBTlFvq.js";import"./Tag-D0BEl-Rx.js";import"./FileXMark-D8OhWEgM.js";import"./Trash-YSKNBnBc.js";import"./HandShakeHeart-B4UWzEb8.js";import"./Calendar-CPEpsnvW.js";import"./ThumbUp-BnMzPauv.js";import"./Table-CaMwSQ-S.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-mkC834Ef.js";import"./format-BtonrWpy.js";import"./match-YUn_3ltH.js";import"./parseISO-CQ9F3tRX.js";import"./parse-DIF_idgU.js";import"./getDefaultOptions-B0jo0GfK.js";import"./util-CtK3LrTT.js";import"./Modal-D5YTGJOP.js";import"./floating-ui.react-D-zVLpts.js";import"./Date.Input-DKz4iTU4.js";import"./useFormField-BUPAi8Oh.js";import"./useControllableState-BjXV5lxt.js";import"./ChevronDown-ChhOAzu5.js";import"./Modal.context-CDADyR-h.js";import"./Portal-CyDxARZ9.js";import"./useDescendant-D-ThzgfS.js";import"./useClientLayoutEffect-cag720gG.js";import"./DismissableLayer-DAq5rDS1.js";import"./Floating-CHUP4lq3.js";import"./ChevronRight-Cl1erGGs.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
