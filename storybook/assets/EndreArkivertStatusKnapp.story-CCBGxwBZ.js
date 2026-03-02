import{j as e,c as d,r as p}from"./iframe-CeMepOlr.js";import"./KandidatlisteContext-C9AWXuLp.js";import{A as i}from"./ActionMenu-DKL2kFm1.js";import{S as m}from"./KandidatHendelseTag-DmasyJpX.js";import{S as u}from"./Trash-dPYMChoi.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-BNzAZK2T.js";import"./VStack-Bf7_wlp6.js";import"./BasePrimitive-DMMQw_JA.js";import"./Box-4zIiotVL.js";import"./List-7xQPIt_g.js";import"./Link-DRVVOdn0.js";import"./index-B-NKUlDt.js";import"./index-CWbL8d4M.js";import"./util-vYUnaJjq.js";import"./Modal.context-BBPtWxoG.js";import"./Portal-DrU4x4kb.js";import"./useDescendant-CeTwTpfL.js";import"./DismissableLayer-CliU41Ny.js";import"./Floating-DFeNhqxs.js";import"./useOpenChangeAnimationComplete-3an9AmJP.js";import"./useValueAsRef-CONuUMFb.js";import"./FocusBoundary-DtATmLxI.js";import"./useControllableState-Crc-rsnR.js";import"./ChevronRight-H_xd8rLx.js";import"./Tag-C3eNjb8Z.js";import"./ChatExclamationmark-DVD2Zl5K.js";import"./FileXMark-jK1tQ1Dk.js";import"./HandShakeHeart-Ck_S5Irb.js";import"./Calendar-DtB2lXzt.js";import"./ThumbUp-DKnaihwy.js";import"./ExclamationmarkTriangle-BF_HyOX8.js";import"./Table-s_OdHfiB.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const P={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,P as default};
