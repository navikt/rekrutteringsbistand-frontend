import{r as i,j as e,e as l}from"./iframe-D0HnIaN5.js";import{E as s}from"./EndreArkivertStatusModal-BMu28i2-.js";import{A as a}from"./ActionMenu-D4T0Ncgm.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-CaiTux_G.js";import"./OrganisasjonsnummerAlert-BUiP5WNV.js";import"./VStack-Cwz6rHDN.js";import"./BasePrimitive-DVXlaCRH.js";import"./List-Dkwgn3Gq.js";import"./Link-BuJgBJVq.js";import"./KandidatHendelseTag-HEwqK8Da.js";import"./Tag-BONzrFqA.js";import"./ChatExclamationmark-BZnZ9OfB.js";import"./FileXMark-D5dRoIAY.js";import"./Trash-Cj-kqVJY.js";import"./HandShakeHeart-BXaHNstn.js";import"./Calendar-CY7SvHHg.js";import"./ThumbUp-EXSgiQs3.js";import"./Table-CC0EebB-.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-B7WynFbs.js";import"./format-Df3CFIuT.js";import"./match-BdVai8s9.js";import"./parseISO-DO2-pDco.js";import"./parse-BpIyXLCF.js";import"./getDefaultOptions-x-DNWUP6.js";import"./util-BkUCqppR.js";import"./Modal-CIRswf3U.js";import"./floating-ui.react-Bcl6AuG2.js";import"./Date.Input-B_7i3YvQ.js";import"./useFormField-Cc3d1c1D.js";import"./useControllableState-5Raq7Ez2.js";import"./ChevronDown-DSTHU4Gv.js";import"./Modal.context-D5WfPZho.js";import"./Portal-aLPno7TU.js";import"./useDescendant-DDAiNpI0.js";import"./useClientLayoutEffect-BPkG7QrG.js";import"./DismissableLayer-Cl9TkozM.js";import"./ChevronRight-itLBLckK.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
