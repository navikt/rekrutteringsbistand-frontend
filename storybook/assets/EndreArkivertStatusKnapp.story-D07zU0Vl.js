import{r as i,j as e,d as l}from"./iframe-D5Hx8MOI.js";import{E as s}from"./EndreArkivertStatusModal-Cu9Kz_z-.js";import{A as a}from"./ActionMenu-UqXxRcYB.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CY2SUsP-.js";import"./OrganisasjonsnummerAlert-ekewJOh6.js";import"./VStack--Wd9bffL.js";import"./BasePrimitive-0g_Rn9vf.js";import"./List-DT2p30nz.js";import"./Link-e5cgoETk.js";import"./KandidatHendelseTag-DBavK9Jn.js";import"./Tag-sqViv2P5.js";import"./ChatExclamationmark-BBZeh-kH.js";import"./FileXMark-YL5z_ic7.js";import"./Trash-D4lyxCuc.js";import"./HandShakeHeart-CCsq3XV6.js";import"./Calendar-bCXJqlLh.js";import"./ThumbUp-Bkl_gHlE.js";import"./Table-J1I1xChK.js";import"./util-BPTmFIB5.js";import"./parse-BtZCxJNG.js";import"./getDefaultOptions-BSV_6W0p.js";import"./parseISO-Bj7jC2Qz.js";import"./index-DvbjUxB4.js";import"./index-B40KJ5b4.js";import"./isBefore-dcDV6Iu_.js";import"./util-BVg7me_Z.js";import"./Modal-CPp7OtiE.js";import"./floating-ui.react-B7GcXC42.js";import"./Date.Input-BNoCn-WA.js";import"./useFormField-CRwOs4JE.js";import"./useControllableState-BC3SVwpK.js";import"./ChevronDown-sV2brkBk.js";import"./Modal.context-ByVlJ93D.js";import"./Portal-BAcin9_r.js";import"./useDescendant-BarimCuy.js";import"./useClientLayoutEffect-Borw-cDB.js";import"./DismissableLayer-DCtW6fPx.js";import"./Floating-HH8R4LN1.js";import"./ChevronRight-DhpO0O08.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
