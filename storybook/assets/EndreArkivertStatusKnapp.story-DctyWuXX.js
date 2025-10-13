import{r as i,j as e,e as l}from"./iframe-Dbv-ZY6m.js";import{E as s}from"./EndreArkivertStatusModal-CkHN1suZ.js";import{A as a}from"./ActionMenu-CwRhDOZi.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BfPHHPX5.js";import"./OrganisasjonsnummerAlert-CMN6RSC3.js";import"./VStack-DZNJyLn1.js";import"./BasePrimitive-ClHlo-1x.js";import"./List-Bh8CwDuZ.js";import"./Link-BnDDjZ4T.js";import"./KandidatHendelseTag-BtPcl_FJ.js";import"./Tag-Cqu0347d.js";import"./FileXMark-BOGsNA63.js";import"./Trash-Bf_kz-Y4.js";import"./HandShakeHeart-Cm8qLszF.js";import"./Calendar-Bu5eC4tK.js";import"./ThumbUp-D9H6k4pI.js";import"./Table-PASOvmf2.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BzjSVB_a.js";import"./format-Bjj9PWS-.js";import"./match-C0AC_sxS.js";import"./parseISO-C6AtVv5J.js";import"./parse-CoDqBx_5.js";import"./getDefaultOptions-BEMMC4OI.js";import"./util-zb_msfsb.js";import"./Modal-DWr6i92s.js";import"./floating-ui.react-HGTfdzo0.js";import"./Date.Input-BAQUwUKS.js";import"./useFormField-B25Nx7HO.js";import"./useControllableState-CuovWR7y.js";import"./ChevronDown-BT8bNVDr.js";import"./Modal.context-AsKyuXOL.js";import"./Portal-C0MhYn7a.js";import"./useDescendant-DSn6aWUY.js";import"./useClientLayoutEffect-BOrB_Ep7.js";import"./DismissableLayer-DmuPEZeO.js";import"./Floating-Df_h3IhB.js";import"./ChevronRight-Chg6WoTJ.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
