import{r as i,j as e,d as l}from"./iframe-BA8NGl8Z.js";import{E as s}from"./EndreArkivertStatusModal-tKbyaK_4.js";import{A as a}from"./ActionMenu-BV8aa-_G.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxoF-fzq.js";import"./OrganisasjonsnummerAlert-Dkf9eg_y.js";import"./VStack-Kc3uDync.js";import"./BasePrimitive-DVQzxbgB.js";import"./Box-QiYsNTYh.js";import"./List-BLBE283a.js";import"./Link-DuDyUj0y.js";import"./KandidatHendelseTag-Dxvy0j_v.js";import"./Tag-DJO1ZEnS.js";import"./ChatExclamationmark-CIA0LWMm.js";import"./FileXMark-BF3VFzMY.js";import"./Trash-D5CVVktL.js";import"./HandShakeHeart-BbCuuX07.js";import"./Calendar-BtfCCLae.js";import"./ThumbUp-Bu5VGlTV.js";import"./ExclamationmarkTriangle-DTZLN61C.js";import"./Table-b9WZVWIS.js";import"./index-DC2vRRA7.js";import"./index-B40KJ5b4.js";import"./util-Cn0sHhFJ.js";import"./Modal-owe8sJ8N.js";import"./floating-ui.react-6WPeK0Ep.js";import"./useFormField-C2zx6Vke.js";import"./ReadMore-evtPe4OF.js";import"./useControllableState-BKzc71DB.js";import"./ChevronDown-CzujMlO1.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CiWpgXLp.js";import"./Modal.context-Cgdz-tcK.js";import"./Portal-rgQKCE9Q.js";import"./useValueAsRef-O8V3Mha_.js";import"./Floating-CYJbRnkq.js";import"./useDescendant-Djm2s_KM.js";import"./DismissableLayer-hP1yz2kw.js";import"./ChevronRight-Bmbqu97n.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
