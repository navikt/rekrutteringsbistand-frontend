import{r as i,j as e,d as l}from"./iframe-BHOx9B5b.js";import{E as s}from"./EndreArkivertStatusModal-nC33nrps.js";import{A as a}from"./ActionMenu-Epcgo1v4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-PdvcG0Kw.js";import"./OrganisasjonsnummerAlert-BzQj5vvO.js";import"./VStack-CmLA3gnA.js";import"./BasePrimitive-SkRKoGXq.js";import"./List-_fOxGsS0.js";import"./Link-CgwqW9aN.js";import"./KandidatHendelseTag-2_0YGvkp.js";import"./Tag-BadF4dPH.js";import"./ChatExclamationmark-8ugFK-GN.js";import"./FileXMark-BrjqZNmO.js";import"./Trash-OENCU4YY.js";import"./HandShakeHeart-vBuPvVGQ.js";import"./Calendar-DuWWARUT.js";import"./ThumbUp-B_hDBLiw.js";import"./Table-ClzuaGNZ.js";import"./util-DmSLrwrq.js";import"./parse-Dyx89_Ry.js";import"./getDefaultOptions-DwRyr_Q7.js";import"./parseISO-CqNQisVW.js";import"./index-C3Kl7Ykz.js";import"./index-B40KJ5b4.js";import"./isBefore-CVE6uPQu.js";import"./util-BeBCU710.js";import"./Modal-B79dH_YT.js";import"./floating-ui.react-C7cTNDuv.js";import"./Date.Input-BAjUfhRV.js";import"./useFormField-DtUBbpyB.js";import"./useControllableState-CMMk7b1o.js";import"./ChevronDown-tvniP40I.js";import"./Modal.context-V4MFRuxC.js";import"./Portal-DYaSaokX.js";import"./useDescendant-BD6yfJ31.js";import"./useClientLayoutEffect-FxKx5dnQ.js";import"./DismissableLayer-Cx9euIV1.js";import"./Floating-CkHPH3YP.js";import"./ChevronRight-DqlTV2s0.js";const Z={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
