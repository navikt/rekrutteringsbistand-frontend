import{r as i,j as e,d as p}from"./iframe-ByWmnZ4S.js";import{E as s}from"./EndreArkivertStatusModal-Crn0DJQQ.js";import{A as a}from"./ActionMenu-D6S4wOld.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CUwd8fGk.js";import"./OrganisasjonsnummerAlert-CIoaQ-va.js";import"./VStack-B4XMgije.js";import"./BasePrimitive-C0gkeO-o.js";import"./List-Bcp7Rviy.js";import"./Link-C0isikOf.js";import"./KandidatHendelseTag-D-PJ3Xds.js";import"./Tag-C7-_VXzn.js";import"./FileXMark-E6OErK0C.js";import"./Trash-C5n-8O5T.js";import"./HandShakeHeart-KCiOrMlu.js";import"./Calendar-BVNdHGpL.js";import"./ThumbUp-CjkUot_o.js";import"./Table-vR1KG8v5.js";import"./util-2p2A_6-L.js";import"./format-CFhjL3vv.js";import"./match-B8PDa1K1.js";import"./parse-BMZ-zCRH.js";import"./getDefaultOptions-C7xXZp1I.js";import"./parseISO-DxVXcsl2.js";import"./util-DCpp2D90.js";import"./Modal-Dy3ua6M0.js";import"./floating-ui.react-BJvj_AEa.js";import"./Date.Input-BeE2dgD5.js";import"./useFormField-PacwHw8j.js";import"./useControllableState-DHgIwWjk.js";import"./ChevronDown-CVtl9GHt.js";import"./Modal.context-MWwuFtiw.js";import"./Portal-C9LIitov.js";import"./useDescendant-CJI6UQRZ.js";import"./useClientLayoutEffect-D57ofA7I.js";import"./DismissableLayer-Bu04zMM1.js";import"./Floating-BIfpGRyS.js";import"./ChevronRight-BJFRpBvV.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
