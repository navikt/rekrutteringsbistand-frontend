import{r as i,j as e,e as l}from"./iframe-C5WYDDgG.js";import{E as s}from"./EndreArkivertStatusModal-tnGD2oam.js";import{A as a}from"./ActionMenu-DJDkFVqr.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DvE1vsyh.js";import"./OrganisasjonsnummerAlert-C85y1jZg.js";import"./VStack-CGjISBtE.js";import"./BasePrimitive-Cpkpxro0.js";import"./List-DAOF7kuF.js";import"./Link-Crh-IT43.js";import"./KandidatHendelseTag-CsB2A49T.js";import"./Tag-DimcxUST.js";import"./ChatExclamationmark-BPFzi1ZK.js";import"./FileXMark-C2nd-YET.js";import"./Trash-dUh1hCIp.js";import"./HandShakeHeart-BLwS6NQP.js";import"./Calendar-Br9eUOU1.js";import"./ThumbUp-D-407tMV.js";import"./Table-CTdTQr35.js";import"./util-wTlgndPH.js";import"./format-D6tTPMvi.js";import"./match-CesVRQGT.js";import"./parseISO-DB2fE1bN.js";import"./parse-6GhogZDZ.js";import"./getDefaultOptions-CBL_1nw2.js";import"./util-xKC9If_S.js";import"./Modal-DEM_RWCt.js";import"./floating-ui.react-Cm-18w_6.js";import"./Date.Input-Bq2Wg-Yo.js";import"./useFormField-2ZYty3U6.js";import"./useControllableState-Cdxfncmo.js";import"./ChevronDown-C4tZxf6w.js";import"./Modal.context-CyBBT6uy.js";import"./Portal-D8N3lgro.js";import"./useDescendant-BQaF6zUo.js";import"./useClientLayoutEffect-CEMUO7Yx.js";import"./DismissableLayer-BndGehaV.js";import"./Floating-iDOf10Gl.js";import"./ChevronRight-BUJrz1b9.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
