import{r as i,j as e,e as l}from"./iframe-BF8BNn-P.js";import{E as s}from"./EndreArkivertStatusModal-CeJmRVy3.js";import{A as a}from"./ActionMenu-fg41xxS3.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BXJD1A0s.js";import"./OrganisasjonsnummerAlert-IXrNVLwl.js";import"./VStack-CMeQnFcr.js";import"./BasePrimitive-BlsGsg21.js";import"./List-BM9N4mrD.js";import"./Link-DN5m26Rs.js";import"./KandidatHendelseTag-nU4MgnR-.js";import"./Tag-DXp4bEZw.js";import"./ChatExclamationmark-Br8h6JfZ.js";import"./FileXMark-iAfT_WZd.js";import"./Trash-C4_BLZyj.js";import"./HandShakeHeart-B72tsY5W.js";import"./Calendar-_1VseOVU.js";import"./ThumbUp-CsNb83Hv.js";import"./Table-D8vUaOQl.js";import"./util-Pkq9MnMO.js";import"./format-BHNDKqLI.js";import"./match-DiwQH8nR.js";import"./parseISO-euhGvvRy.js";import"./parse-D3BBtSad.js";import"./getDefaultOptions-Bp-ZLzIw.js";import"./util-9-sgCJTZ.js";import"./Modal-59K-mOmj.js";import"./floating-ui.react-CEZCZn4x.js";import"./Date.Input-C1O_cGqo.js";import"./useFormField-5gDKVoHJ.js";import"./useControllableState-CH5q939z.js";import"./ChevronDown-CQEy5wB2.js";import"./Modal.context-BhhqLRxX.js";import"./Portal-eIIH8qR5.js";import"./useDescendant-ng3Vo_aV.js";import"./useClientLayoutEffect-CVA0Lj03.js";import"./DismissableLayer-B6zBYQZd.js";import"./Floating-BVqTRMfc.js";import"./ChevronRight-CjLL0MwG.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
