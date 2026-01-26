import{r as i,j as e,d as l}from"./iframe-D9qA_9GD.js";import{E as s}from"./EndreArkivertStatusModal-B3FKdNAe.js";import{A as a}from"./ActionMenu-D2Gim38k.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-C_BO5PDv.js";import"./OrganisasjonsnummerAlert-EKu8OGew.js";import"./VStack-F9byACb6.js";import"./BasePrimitive-BTVpI0SI.js";import"./Box-BQY138F7.js";import"./List-DC6PMjkG.js";import"./Link-CoHpPI50.js";import"./KandidatHendelseTag-Di8dUZOx.js";import"./Tag-DTbGS8uf.js";import"./ChatExclamationmark-D5TWuosh.js";import"./FileXMark-DvRu4AlR.js";import"./Trash-K0ldOWId.js";import"./HandShakeHeart-Dn0qVttd.js";import"./Calendar-Brz02_Oy.js";import"./ThumbUp-CmCH1kLN.js";import"./ExclamationmarkTriangle-C-9Ff1cH.js";import"./Table-8iZyNf9F.js";import"./index-DsbKVEBS.js";import"./index-B40KJ5b4.js";import"./util-LuhOfgaI.js";import"./Modal-D9imXltG.js";import"./floating-ui.react-CBDWNK4Z.js";import"./useFormField-gLsBXw0o.js";import"./ReadMore-Dwl8UzRp.js";import"./useControllableState-BQN1ohGC.js";import"./ChevronDown-jYQYWyfv.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-GzQGtyHt.js";import"./Modal.context-B_18zVZi.js";import"./Portal-Cs6w2Skg.js";import"./useValueAsRef-Bh2wHF7G.js";import"./Floating-B0mqIbvs.js";import"./useDescendant-DKxVsKrU.js";import"./DismissableLayer-C12o3Eot.js";import"./ChevronRight-BvECYT37.js";const Y={tags:["autodocs"],component:s},t={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},n={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[m,p]=i.useState(!1);return e.jsxs(a,{open:m,onOpenChange:p,children:[e.jsx(l,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};t.parameters={...t.parameters,docs:{...t.parameters?.docs,source:{originalSource:`{
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
