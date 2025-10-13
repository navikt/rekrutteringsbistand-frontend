import{r as i,j as e,e as p}from"./iframe-DxsVXlKp.js";import{E as s}from"./EndreArkivertStatusModal-BaD_xX2H.js";import{A as a}from"./ActionMenu-DjA-FeED.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DBaap_3A.js";import"./OrganisasjonsnummerAlert-BRaz6LhX.js";import"./VStack-DLr41Sdy.js";import"./BasePrimitive-CVWzEEGe.js";import"./List-Zu0w8-Ow.js";import"./Link-DSnwK8eh.js";import"./KandidatHendelseTag-BzJ2Q9HZ.js";import"./Tag-B0WwZ_XI.js";import"./FileXMark-BOhJsIZe.js";import"./Trash-DXDOAyr4.js";import"./HandShakeHeart-cnO-6KOG.js";import"./Calendar-DrSgH4O2.js";import"./ThumbUp-DKmETQk-.js";import"./Table-DmsM-QeC.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-0q4bkZIV.js";import"./format-oEh3d8nI.js";import"./match-C6gf6vFE.js";import"./parseISO-DtIkSN4o.js";import"./parse-SU3b4A8Q.js";import"./getDefaultOptions-zjHXmn5U.js";import"./util-D7yesipt.js";import"./Modal-D_gdxlCP.js";import"./floating-ui.react-Bc1Ow91n.js";import"./Date.Input-BMLFi-Sw.js";import"./useFormField-y2vpLvjz.js";import"./useControllableState-332WqRZ5.js";import"./ChevronDown-D_-r46n6.js";import"./Modal.context-B9ZjbwV3.js";import"./Portal-Dh1DRiHu.js";import"./useDescendant-Dn2tUnAo.js";import"./useClientLayoutEffect-BczCKQUj.js";import"./DismissableLayer-DiN5We5v.js";import"./ChevronRight-C1fhT3zr.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
