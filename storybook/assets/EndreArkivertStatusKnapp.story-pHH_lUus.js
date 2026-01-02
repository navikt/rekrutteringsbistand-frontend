import{r as i,j as e,d as p}from"./iframe-BCPU83ju.js";import{E as s}from"./EndreArkivertStatusModal-Dwl6T1aO.js";import{A as a}from"./ActionMenu-C0-M0KqK.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-SWJxKa3q.js";import"./OrganisasjonsnummerAlert-B9fdaAF-.js";import"./VStack-BIz_V_1H.js";import"./BasePrimitive-C43Zdv_H.js";import"./List-DE7Xqmfm.js";import"./Link-BsYdxGte.js";import"./KandidatHendelseTag-CepaBxAT.js";import"./Tag-BRiTi-pB.js";import"./ChatExclamationmark-z02UnKbf.js";import"./FileXMark-DpM3u4VL.js";import"./Trash-Cta86JYs.js";import"./HandShakeHeart-BjjfjrpZ.js";import"./Calendar-CrUnjqKD.js";import"./ThumbUp-DJ19LnAF.js";import"./ExclamationmarkTriangle-BA7dsrnv.js";import"./Table-DXeSb6gu.js";import"./index-iHPVhBfh.js";import"./index-B40KJ5b4.js";import"./util-DoVIJkK9.js";import"./Modal-BBM7lRpi.js";import"./floating-ui.react-CkmWww4U.js";import"./Date.Input-DKZMtCa6.js";import"./useFormField-CPCdGz6D.js";import"./useControllableState-BmfeGQkw.js";import"./ChevronDown-j4ejZ-3f.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-C0hqye8N.js";import"./Modal.context-WcZRHucM.js";import"./Portal-C-cW_6fP.js";import"./useLatestRef-93o6EXzC.js";import"./useDescendant-OUsux5hG.js";import"./DismissableLayer-CPHSRetD.js";import"./Floating-DEVGGh4Z.js";import"./ChevronRight-BeLFfBTf.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
