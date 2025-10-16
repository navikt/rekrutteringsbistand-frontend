import{r as i,j as e,e as p}from"./iframe-cKv9Xcbc.js";import{E as s}from"./EndreArkivertStatusModal-DTMEu-E2.js";import{A as a}from"./ActionMenu-CZHpQ8_f.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BrVtYsx9.js";import"./OrganisasjonsnummerAlert-BBJfjV8T.js";import"./VStack-AfRfjUcd.js";import"./BasePrimitive-BkBXH3Sq.js";import"./List-BHwStZyR.js";import"./Link-BJQb0isM.js";import"./KandidatHendelseTag-BU7zLNHq.js";import"./Tag-CyuLxgyY.js";import"./FileXMark-Db78uuup.js";import"./Trash-DYfGUhMj.js";import"./HandShakeHeart-_A7h8Tvx.js";import"./Calendar-BA-ZzF_J.js";import"./ThumbUp-42lJbfgi.js";import"./Table-DrCFeXe3.js";import"./util-FTyK7T7B.js";import"./format-oXsUGbWM.js";import"./match-Bg7PaJKN.js";import"./parseISO-BQHssbTv.js";import"./parse-CGsvWix5.js";import"./getDefaultOptions-D-Ph7PSR.js";import"./util-I-jUCGFx.js";import"./Modal-CR3AtPaM.js";import"./floating-ui.react-CcSFU4dS.js";import"./Date.Input-Bi8louro.js";import"./useFormField-ipfHAWys.js";import"./useControllableState-BOJnqGXH.js";import"./ChevronDown-CWqSwAPV.js";import"./Modal.context-Bb4T5EwF.js";import"./Portal-DEIY_xQd.js";import"./useDescendant-6viKTCKV.js";import"./useClientLayoutEffect-BzqYQ3NJ.js";import"./DismissableLayer-BmaSc7gG.js";import"./Floating-CiBKjNKI.js";import"./ChevronRight-CY1FGwos.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
