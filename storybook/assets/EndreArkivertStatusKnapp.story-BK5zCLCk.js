import{r as i,j as e,d as p}from"./iframe-B3f5JsBL.js";import{E as s}from"./EndreArkivertStatusModal-DTk923dj.js";import{A as a}from"./ActionMenu-Dh03LOx1.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DSj3oEba.js";import"./OrganisasjonsnummerAlert-CqrFfl1R.js";import"./VStack-Cyq1zcSi.js";import"./BasePrimitive-DTcZC2Ka.js";import"./List-Bi1mPzw3.js";import"./Link-CxIdyMM9.js";import"./KandidatHendelseTag-C75U9OOQ.js";import"./Tag-HQflId7t.js";import"./ChatExclamationmark--mKgA6Ru.js";import"./FileXMark-CYLbex1x.js";import"./Trash-BRSLg01_.js";import"./HandShakeHeart-TSLWLIqu.js";import"./Calendar-DxUVfheH.js";import"./ThumbUp-sInhpK6j.js";import"./ExclamationmarkTriangle-BMukC4AA.js";import"./Table--483cipR.js";import"./index-Cnf-X_bH.js";import"./index-B40KJ5b4.js";import"./util-B6Mcalfs.js";import"./Modal-B7L2is3s.js";import"./floating-ui.react-BuFQUhpN.js";import"./Date.Input-Clf8B4hK.js";import"./useFormField-CIGIYXae.js";import"./useControllableState-CmSO-Fnv.js";import"./ChevronDown-Bq9uvc-y.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ARtV7_eE.js";import"./Modal.context-DKfjR89r.js";import"./Portal-BViZNzZZ.js";import"./useLatestRef-CgyOwYN1.js";import"./useDescendant-hqKKqVhX.js";import"./DismissableLayer-COB3spCf.js";import"./Floating-CW3XXW0h.js";import"./ChevronRight-DWiEsoUM.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
