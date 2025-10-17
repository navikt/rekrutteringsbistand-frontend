import{r as i,j as e,d as p}from"./iframe-D2dvj_6K.js";import{E as s}from"./EndreArkivertStatusModal-0aoHu9qz.js";import{A as a}from"./ActionMenu-C4Eg3g-q.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BotNX_4K.js";import"./OrganisasjonsnummerAlert-DkkZhm3E.js";import"./VStack-z9wH5dn0.js";import"./BasePrimitive-BEWWhB3K.js";import"./List-Cprn4dhP.js";import"./Link-u6gzZM83.js";import"./KandidatHendelseTag-CM2kClGI.js";import"./Tag-CV9m-ITv.js";import"./FileXMark-CUqQ7cSb.js";import"./Trash-C1YTFGrH.js";import"./HandShakeHeart-Bu3Rw4xr.js";import"./Calendar-D02IXrkp.js";import"./ThumbUp-C5BLve7y.js";import"./Table-CnycmvKL.js";import"./util-viOpl8QD.js";import"./format-BAltmp1D.js";import"./match-D8FDjT0X.js";import"./parse-DYQ32hYW.js";import"./getDefaultOptions-BkBa5hFb.js";import"./parseISO-CS5cHoEZ.js";import"./util-Beh5P7GG.js";import"./Modal-BHgMXdvc.js";import"./floating-ui.react-2s2ZHpJr.js";import"./Date.Input-8G6lp9tB.js";import"./useFormField-DQ6SW2DV.js";import"./useControllableState-DPGbthHZ.js";import"./ChevronDown-CabTLLsX.js";import"./Modal.context-Bq_osYLE.js";import"./Portal--hTBf4g3.js";import"./useDescendant-D5kkyxTD.js";import"./useClientLayoutEffect-CdZ2hRHl.js";import"./DismissableLayer-BuLRyImn.js";import"./Floating-CI_JKSQx.js";import"./ChevronRight-B3BaKIQe.js";const X={tags:["autodocs"],component:s},n={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null);return e.jsx(s,{modalRef:o,lukketKandidatliste:r})}},t={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:r})=>{const o=i.useRef(null),[l,m]=i.useState(!1);return e.jsxs(a,{open:l,onOpenChange:m,children:[e.jsx(p,{as:a.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(a.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:o,lukketKandidatliste:r})})]})}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
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
