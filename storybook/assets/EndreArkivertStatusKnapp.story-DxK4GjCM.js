import{r as i,j as e,e as l}from"./iframe-D9mqkd8J.js";import{E as s}from"./EndreArkivertStatusModal-DcT8oHcs.js";import{A as a}from"./ActionMenu-BbE20DmC.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DlwI21Yt.js";import"./OrganisasjonsnummerAlert-CS-NcEr6.js";import"./VStack-CDhuPf9Y.js";import"./BasePrimitive-B3ciBDpN.js";import"./List-B-uwTmvA.js";import"./Link-M_AJD5Ob.js";import"./KandidatHendelseTag-BzFOeSdN.js";import"./Tag-BvNBSGKY.js";import"./ChatExclamationmark-L2UpYfHW.js";import"./FileXMark-4rwoeoHF.js";import"./Trash-CzVUQuc8.js";import"./HandShakeHeart-CUYrnLNx.js";import"./Calendar-B0NiFczk.js";import"./ThumbUp-Ctn7Umq2.js";import"./Table-Bks60uh_.js";import"./util-DSVI0ePf.js";import"./format-CzEV6SwL.js";import"./match-FBklN04L.js";import"./parseISO-DOIvH0AY.js";import"./parse-COQhzVgn.js";import"./getDefaultOptions-CWXBYWBL.js";import"./util-PvlszHua.js";import"./Modal-BheaPe08.js";import"./floating-ui.react-DcHBzFuk.js";import"./Date.Input-6hDRRA25.js";import"./useFormField-HR3NeTCc.js";import"./useControllableState-GZ88C6KH.js";import"./ChevronDown-Bbco9iiR.js";import"./Modal.context-BivSpKRk.js";import"./Portal-BTOg881_.js";import"./useDescendant-Dxtsczz9.js";import"./useClientLayoutEffect-B5nY-R9n.js";import"./DismissableLayer-BVSVExp-.js";import"./Floating-Cl9rhv31.js";import"./ChevronRight-Do3SUYmv.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
