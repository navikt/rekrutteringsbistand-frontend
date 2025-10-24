import{r as i,j as e,o as l}from"./iframe-DyjxJt6_.js";import{E as s}from"./EndreArkivertStatusModal-Cmra2Vqx.js";import{A as a}from"./ActionMenu-DhmDldcv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DzVT8GY0.js";import"./OrganisasjonsnummerAlert-B1LbYRzk.js";import"./VStack-k6rjAcI6.js";import"./BasePrimitive-DD5QSJl_.js";import"./List-DbvLH4Xd.js";import"./Link-BQyKaBg8.js";import"./KandidatHendelseTag-Bn-bF2SW.js";import"./Tag-jVQ027fS.js";import"./ChatExclamationmark-_zjEuLjb.js";import"./FileXMark-BP7zxZnt.js";import"./Trash-CKc4iBLw.js";import"./HandShakeHeart-QphpuF16.js";import"./Calendar-Be9HdFY7.js";import"./ThumbUp-BxYAF2fV.js";import"./Table-5qzdeWed.js";import"./util-u2KN_oDe.js";import"./format-DiYK34ra.js";import"./match-r7-eMgNP.js";import"./parse-Cbdomb8H.js";import"./getDefaultOptions-CGyA5tp4.js";import"./parseISO-CQvy-Q--.js";import"./util-B55YeDai.js";import"./Modal-fk5W3duk.js";import"./floating-ui.react-DwC01zyt.js";import"./Date.Input-hLEnjT2L.js";import"./useFormField-RkUFhjyk.js";import"./useControllableState-DyBNm6ng.js";import"./ChevronDown-B-gXgea7.js";import"./Modal.context-DsW8rZaM.js";import"./Portal-BdmLsT-1.js";import"./useDescendant-CYkwdAdJ.js";import"./useClientLayoutEffect-vNIzxBoF.js";import"./DismissableLayer-9F188wWR.js";import"./Floating-yW43KoRr.js";import"./ChevronRight-DgfL1Hcm.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
