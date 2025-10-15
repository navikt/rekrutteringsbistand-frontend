import{r as i,j as e,e as l}from"./iframe-D-AjZlUt.js";import{E as s}from"./EndreArkivertStatusModal-DLmeKVi-.js";import{A as a}from"./ActionMenu-DvjtWJXy.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-Cvi2YthW.js";import"./OrganisasjonsnummerAlert-ZFPNdvhq.js";import"./VStack-D9az6B_P.js";import"./BasePrimitive-ChIiOCuG.js";import"./List-D3lk6ROm.js";import"./Link-8RMWJEmQ.js";import"./KandidatHendelseTag-CqESFpmQ.js";import"./Tag-DZeuvrYI.js";import"./ChatExclamationmark-NpYoxkY_.js";import"./FileXMark-BjXsB-ap.js";import"./Trash-D--eKmsb.js";import"./HandShakeHeart-yrQFOuhb.js";import"./Calendar-CpmEDSNG.js";import"./ThumbUp-C_umlp3p.js";import"./Table-2kctjMPO.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-BLaW0wmH.js";import"./format-wxpr1Ccp.js";import"./match-CR1ydbAl.js";import"./parseISO-BCt-OVe7.js";import"./parse-i1bpAfmg.js";import"./getDefaultOptions-Dkji9mRS.js";import"./util-CWQ2JgV5.js";import"./Modal-D6I5DY54.js";import"./floating-ui.react-skxVNIuN.js";import"./Date.Input-CjXymNkg.js";import"./useFormField-BkIpqHlH.js";import"./useControllableState-f-tqrQui.js";import"./ChevronDown-Canbumtw.js";import"./Modal.context-DFyDwZnZ.js";import"./Portal-BqcjrsMV.js";import"./useDescendant-DSTfsy-A.js";import"./useClientLayoutEffect-GqFZdyJ1.js";import"./DismissableLayer-DsLL55K3.js";import"./ChevronRight-C_Yh357G.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
