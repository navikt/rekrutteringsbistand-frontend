import{r as i,j as e,d as p}from"./iframe-Ik8kw4Ju.js";import{E as s}from"./EndreArkivertStatusModal-Bm1prEDo.js";import{A as a}from"./ActionMenu-CIz27ECM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DQ_rsbH0.js";import"./OrganisasjonsnummerAlert-BVUVbGru.js";import"./VStack-DtMoho4C.js";import"./BasePrimitive-CspwQbfs.js";import"./List-U0SSBVNs.js";import"./Link-Cau-CVIv.js";import"./KandidatHendelseTag-BlAh3-Nj.js";import"./Tag-DY7FqA44.js";import"./ChatExclamationmark-pwY1T5Ym.js";import"./FileXMark-vBOOE6wq.js";import"./Trash-BTctDNVN.js";import"./HandShakeHeart-BFdjLwtT.js";import"./Calendar-CdKvi8Wq.js";import"./ThumbUp-BdureR0h.js";import"./ExclamationmarkTriangle-iP216GN2.js";import"./Table-CZR_oYYA.js";import"./index-UR0OcfYb.js";import"./index-B40KJ5b4.js";import"./util-CPxhl3rq.js";import"./Modal-B8Jp1lwE.js";import"./floating-ui.react-CfN5WK7s.js";import"./Date.Input-CItyK-0t.js";import"./useFormField-C9ee2YVq.js";import"./useControllableState-p63OqQmu.js";import"./ChevronDown-C5cV2XA7.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CPiUCbX0.js";import"./Modal.context-paBkLDd3.js";import"./Portal-DWrpsNfA.js";import"./useLatestRef-C0uG3_ei.js";import"./useDescendant-DdjiYu7_.js";import"./DismissableLayer-OgsdA99v.js";import"./Floating-D4hvQZV3.js";import"./ChevronRight-DdrzI6hY.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
