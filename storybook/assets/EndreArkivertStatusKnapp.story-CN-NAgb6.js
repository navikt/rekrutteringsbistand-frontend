import{r as i,j as e,o as l}from"./iframe-DX9y8s0p.js";import{E as s}from"./EndreArkivertStatusModal-Bkw3e1MK.js";import{A as a}from"./ActionMenu-DWBm8MwN.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BgGQs1aF.js";import"./OrganisasjonsnummerAlert-wq-PWVhe.js";import"./VStack-BuoRLqFc.js";import"./BasePrimitive-n7t3DUXz.js";import"./List-CRuB2vXR.js";import"./Link-CE8mhjrR.js";import"./KandidatHendelseTag-DAfkQLOm.js";import"./Tag-DLJApF3O.js";import"./ChatExclamationmark-BaemJk_4.js";import"./FileXMark-BkK3__05.js";import"./Trash-Bd87jGlN.js";import"./HandShakeHeart-D0v5wORh.js";import"./Calendar-BTafpFij.js";import"./ThumbUp-DrDogaZf.js";import"./Table-DJuofRSv.js";import"./util-BeOVg5eS.js";import"./format-Dx5xwboz.js";import"./match-B_ykZKeH.js";import"./parse-BBuikJwA.js";import"./getDefaultOptions-Btv2vEbm.js";import"./parseISO-vl75CQb4.js";import"./index-Be7PHb8R.js";import"./index-B40KJ5b4.js";import"./isBefore-8anyI0-P.js";import"./util-BEto0Asq.js";import"./Modal-B37y99Mo.js";import"./floating-ui.react-Cf24XkUu.js";import"./Date.Input-BDB_uQzU.js";import"./useFormField-DGeky4xf.js";import"./useControllableState-DG5wg-Pt.js";import"./ChevronDown-kOA26EDn.js";import"./Modal.context-CQeCPNOL.js";import"./Portal-gRuIP5Lh.js";import"./useDescendant-CltYyeMp.js";import"./useClientLayoutEffect-hednBzpC.js";import"./DismissableLayer-Dlf6c4kf.js";import"./Floating-c6V_C3O9.js";import"./ChevronRight-CjJKYmsO.js";const $={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,$ as default};
