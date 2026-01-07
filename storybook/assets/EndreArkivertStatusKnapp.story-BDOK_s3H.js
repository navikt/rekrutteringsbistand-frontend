import{r as i,j as e,d as p}from"./iframe-8sML1qxS.js";import{E as s}from"./EndreArkivertStatusModal-DyOtmfJD.js";import{A as a}from"./ActionMenu-Dce-AJBZ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DRigmI8a.js";import"./OrganisasjonsnummerAlert-BkRpSSfw.js";import"./VStack-DRwdmI3-.js";import"./BasePrimitive-BmqLDMuc.js";import"./List-BflqGauY.js";import"./Link-CS_39ATQ.js";import"./KandidatHendelseTag-DuddxgxS.js";import"./Tag-Cx8h0QcD.js";import"./ChatExclamationmark-DaCv-sla.js";import"./FileXMark-DT43kFyy.js";import"./Trash-DtE42QsC.js";import"./HandShakeHeart-DLBEN19F.js";import"./Calendar-CO5LFH_s.js";import"./ThumbUp-C2NOdUm1.js";import"./ExclamationmarkTriangle-4tCFwl3B.js";import"./Table-DhjErmmF.js";import"./index-DPXZmGOL.js";import"./index-B40KJ5b4.js";import"./util-B1cpXv4o.js";import"./Modal-pMute4gH.js";import"./floating-ui.react-OMGuPjdp.js";import"./Date.Input-VTQIO55Q.js";import"./useFormField-U6a8lsCF.js";import"./useControllableState-C6Xv7p8h.js";import"./ChevronDown-Ba2f5nE9.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CVhQb8QH.js";import"./Modal.context-DE6FvpHB.js";import"./Portal-BCS47DUs.js";import"./useLatestRef-Bc6puf5m.js";import"./useDescendant-mLI6B6jd.js";import"./DismissableLayer-Bl2AF_UL.js";import"./Floating-CR1mvX24.js";import"./ChevronRight-Bmuxpbm6.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
