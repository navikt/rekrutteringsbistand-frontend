import{r as i,j as e,e as p}from"./iframe-CIx7wo7D.js";import{E as s}from"./EndreArkivertStatusModal-DRKvd5VG.js";import{A as a}from"./ActionMenu-bWeKNf-l.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BE8HKbW2.js";import"./OrganisasjonsnummerAlert-DP7OVJ5V.js";import"./VStack-D7okkdd5.js";import"./BasePrimitive-l8vjXYg9.js";import"./List-BcRZRMxq.js";import"./Link-nGzr4IID.js";import"./KandidatHendelseTag-Bs36lIQK.js";import"./Tag-Ch13GRkI.js";import"./FileXMark-b-SwBIUk.js";import"./Trash-DDF0lDvq.js";import"./HandShakeHeart-BeQpNpMA.js";import"./Calendar-DpL55Nco.js";import"./ThumbUp-Dm7v3uRz.js";import"./Table-CncWjAoz.js";import"./util-Dz2WTHUK.js";import"./format-pnjYDM88.js";import"./match-kta7IEBV.js";import"./parseISO-CHHyxPoY.js";import"./parse-uQgzkAwn.js";import"./getDefaultOptions-CVriGt-u.js";import"./util-xzISgwZH.js";import"./Modal-B6NpsmBi.js";import"./floating-ui.react-DWu7eOHT.js";import"./Date.Input-DDJFd5Co.js";import"./useFormField-CpdlRCd5.js";import"./useControllableState-Cn-dqJnK.js";import"./ChevronDown-CY3htvpV.js";import"./Modal.context-BmX0zHS2.js";import"./Portal-CygybAG6.js";import"./useDescendant-0NAjw1zc.js";import"./useClientLayoutEffect-BNDslFP0.js";import"./DismissableLayer-CON-JNDb.js";import"./Floating-BdEX1WCI.js";import"./ChevronRight-DuKllmkI.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
