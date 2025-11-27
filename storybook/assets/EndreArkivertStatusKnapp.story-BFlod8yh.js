import{r as s,j as e,d as p}from"./iframe-CxUg2AuX.js";import{E as i}from"./EndreArkivertStatusModal-BdH67f2F.js";import{A as a}from"./ActionMenu-ffOVv3eh.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxF4FbJC.js";import"./OrganisasjonsnummerAlert-DKvXnJKB.js";import"./VStack-CF_vrmLD.js";import"./BasePrimitive-Ay1P0RLG.js";import"./List-DzXEyHx1.js";import"./Link-Dtuj5eGY.js";import"./KandidatHendelseTag-BSyUVbt-.js";import"./Tag-mg-6ah9r.js";import"./ChatExclamationmark-BWJ7SL8F.js";import"./FileXMark-VE5DHzjr.js";import"./Trash-CeQdOROa.js";import"./HandShakeHeart-C7uvctws.js";import"./Calendar-D4WinFwz.js";import"./ThumbUp-BiLeHeS0.js";import"./Table-BZvmg8Op.js";import"./index-BtvTKIXR.js";import"./index-B40KJ5b4.js";import"./util-5kE2HE6r.js";import"./Modal-J0jh0CrT.js";import"./floating-ui.react-B47RM0oo.js";import"./Date.Input-ClR78xeg.js";import"./useFormField-B8OuaE_r.js";import"./useControllableState-B9AVaVs-.js";import"./ChevronDown-DsO-4IAD.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CzIkdIPi.js";import"./Modal.context-BkSTZliK.js";import"./Portal-DHLo116K.js";import"./useLatestRef-B4wDcEGI.js";import"./useDescendant-BgCd26Yg.js";import"./DismissableLayer-V6EjSsu2.js";import"./Floating-DoetCIZf.js";import"./ChevronRight-CAi-vI9_.js";const W={tags:["autodocs"],component:i},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null);return e.jsx(i,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=s.useRef(null),[l,m]=s.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(i,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
}`,...t.parameters?.docs?.source}}};export{t as IHandlingMeny,n as SomKnapp,W as default};
