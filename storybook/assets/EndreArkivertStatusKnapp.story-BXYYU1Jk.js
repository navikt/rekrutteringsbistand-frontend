import{r as i,j as e,o as l}from"./iframe-Dz5WkgO0.js";import{E as s}from"./EndreArkivertStatusModal-DoDecjOg.js";import{A as a}from"./ActionMenu-_mkAJ48A.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BXVVn83h.js";import"./OrganisasjonsnummerAlert-cue8hzmE.js";import"./VStack-BiEkvKf6.js";import"./BasePrimitive-CCDlBmCX.js";import"./List-BtiImhee.js";import"./Link-zoaxWdQX.js";import"./KandidatHendelseTag-CqRiatAU.js";import"./Tag-DDDFzLIg.js";import"./ChatExclamationmark-DMnkqLQD.js";import"./FileXMark-DIL-4EoH.js";import"./Trash-cluU2dwU.js";import"./HandShakeHeart-C1M5G_up.js";import"./Calendar-DzX_tnPl.js";import"./ThumbUp-DvB7mkr_.js";import"./Table-C0E7aHio.js";import"./util-Boa8LuGc.js";import"./format-z-6xuJmt.js";import"./match-CyEf2s84.js";import"./parse-DbdPPznS.js";import"./getDefaultOptions-XvlMf_q4.js";import"./parseISO-jKUOMyLd.js";import"./util-CKNMcXwP.js";import"./Modal-BT6NkbUJ.js";import"./floating-ui.react-BVd2IcmE.js";import"./Date.Input-DrgG06vb.js";import"./useFormField-DpLIdY3U.js";import"./useControllableState-XDgiReJF.js";import"./ChevronDown-BOcJumpe.js";import"./Modal.context-DYi7aOes.js";import"./Portal-CTL3ZyLh.js";import"./useDescendant-F22c6Vqt.js";import"./useClientLayoutEffect-DCXCSFQx.js";import"./DismissableLayer-aFCZqziv.js";import"./Floating-dqP1CGpv.js";import"./ChevronRight-Di0EMH8c.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
