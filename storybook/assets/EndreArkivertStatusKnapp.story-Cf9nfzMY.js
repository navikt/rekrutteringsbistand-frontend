import{r as i,j as e,e as l}from"./iframe-B0cNm80T.js";import{E as s}from"./EndreArkivertStatusModal-3y5Q-zQS.js";import{A as a}from"./ActionMenu-C3DV8t7V.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-lKcZdIDi.js";import"./OrganisasjonsnummerAlert-By0RKHGl.js";import"./VStack-psTiiBW2.js";import"./BasePrimitive-Dnjwyk_L.js";import"./List-CwgKauhL.js";import"./Link-CvjagGWj.js";import"./KandidatHendelseTag-C5ff4Ain.js";import"./Tag-BBfBa6uK.js";import"./ChatExclamationmark-DogGhrjI.js";import"./FileXMark-260EKdwe.js";import"./Trash-DngtWOea.js";import"./HandShakeHeart-Buew0_gz.js";import"./Calendar-B6sM_WIj.js";import"./ThumbUp-DXn5sJq9.js";import"./Table--dP5e_vE.js";import"./KandidatTyper-CkRsvxsW.js";import"./util-CAU_umkw.js";import"./format-DaA7nAok.js";import"./match-B6SzKG0i.js";import"./parseISO-cg8KmGPa.js";import"./parse--eY5Mgca.js";import"./getDefaultOptions-U4OPOZza.js";import"./util-BOeZlekJ.js";import"./Modal-0KnAjZ93.js";import"./floating-ui.react-b-pUd3Lp.js";import"./Date.Input-CEBq0Klp.js";import"./useFormField-1AfxlixV.js";import"./useControllableState-BJDZ-eZz.js";import"./ChevronDown-DdRd8IuF.js";import"./Modal.context-B_Ji0Bce.js";import"./Portal-DghZ60RB.js";import"./useDescendant-BdOm-UzU.js";import"./useClientLayoutEffect-Rd30x-G4.js";import"./DismissableLayer-BmNMxcQk.js";import"./ChevronRight-CaJRvXGq.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
