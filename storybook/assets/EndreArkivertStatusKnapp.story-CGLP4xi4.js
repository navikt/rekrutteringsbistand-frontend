import{r as i,j as e,d as p}from"./iframe-BJZT-pV2.js";import{E as s}from"./EndreArkivertStatusModal-BwWJmeUo.js";import{A as a}from"./ActionMenu-AnW5NhHo.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BBzNoh1n.js";import"./OrganisasjonsnummerAlert-BzNKGtv5.js";import"./VStack-C0iAkaF0.js";import"./BasePrimitive-BURutVTi.js";import"./List-CUa7SAJy.js";import"./Link-CTWJTCeg.js";import"./KandidatHendelseTag-mluJCksq.js";import"./Tag-Dhce9dMK.js";import"./ChatExclamationmark-vkU7yaSK.js";import"./FileXMark-eege6pqK.js";import"./Trash-DetofLY0.js";import"./HandShakeHeart-D3ZDILka.js";import"./Calendar-B5jaW0qy.js";import"./ThumbUp-q8PY1-rH.js";import"./ExclamationmarkTriangle-BVRlOXHG.js";import"./Table-BISCMbx9.js";import"./index-BgCKhpKW.js";import"./index-B40KJ5b4.js";import"./util-WEItX0rf.js";import"./Modal-Bi4rj4XP.js";import"./floating-ui.react-CvzncKoC.js";import"./Date.Input-DxWRZeTN.js";import"./useFormField-CbAKSqsY.js";import"./useControllableState-Bc9HDHWi.js";import"./ChevronDown-OwgFQKN0.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C4CXiR91.js";import"./Modal.context-IYi_TOd5.js";import"./Portal-BJBI1IUg.js";import"./useLatestRef-D9WSIWjQ.js";import"./useDescendant-CNOkNIf2.js";import"./DismissableLayer-Cw7xwM7S.js";import"./Floating-CBvRuynd.js";import"./ChevronRight-DXkeGR6q.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
