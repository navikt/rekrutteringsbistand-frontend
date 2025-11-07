import{r as i,j as e,d as l}from"./iframe-rcQ536TZ.js";import{E as s}from"./EndreArkivertStatusModal-QDt2bz2W.js";import{A as a}from"./ActionMenu-P6F_yzxf.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqhfWW1z.js";import"./OrganisasjonsnummerAlert-DIxPEGEB.js";import"./VStack-Bd5XxMuD.js";import"./BasePrimitive-DOQGXNDv.js";import"./List-Bge0zYza.js";import"./Link-Dl-V4cSV.js";import"./KandidatHendelseTag-PbGGHMS7.js";import"./Tag-xAKM8J8p.js";import"./ChatExclamationmark-DkFY89ke.js";import"./FileXMark-z-oFo2nP.js";import"./Trash-Cwb_7YZ0.js";import"./HandShakeHeart-D6kFY2Lw.js";import"./Calendar-CwMFbYJ1.js";import"./ThumbUp-DFrEW2Ez.js";import"./Table-DapziAdA.js";import"./util-BO75DCsf.js";import"./parse-B3-puTFr.js";import"./getDefaultOptions-BKcChqVo.js";import"./parseISO-C32pz730.js";import"./index-B3GzxfYD.js";import"./index-B40KJ5b4.js";import"./isBefore-D4c0a3-L.js";import"./util-CCDa60yO.js";import"./Modal-98TWSHc-.js";import"./floating-ui.react-BnE5Js1c.js";import"./Date.Input-CkhCOS9u.js";import"./useFormField-DVG_5Xb7.js";import"./useControllableState-yOoOMJdI.js";import"./ChevronDown-CONpnMjq.js";import"./Modal.context-ClNL2aFZ.js";import"./Portal-C6Iu0qCg.js";import"./useDescendant-pbOegnSC.js";import"./useClientLayoutEffect-DfdICjOw.js";import"./DismissableLayer-C-HcFn6G.js";import"./Floating-LAB1oXbI.js";import"./ChevronRight-MCG742sc.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
}`,...n.parameters?.docs?.source}}};export{n as IHandlingMeny,t as SomKnapp,Z as default};
