import{j as e,a as d,r as p}from"./iframe-BDkGlu2A.js";import"./KandidatlisteContext-Co5n97FX.js";import{A as i}from"./ActionMenu-ucU4-cFp.js";import{S as m}from"./KandidatHendelseTag-DLuEFraq.js";import{S as u}from"./Trash-vgJESm9p.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-MZvK8bEV.js";import"./VStack-DmbEZUe6.js";import"./BasePrimitive-BKHuKnFY.js";import"./Box-BPw0V6Fr.js";import"./List-BdwSeizn.js";import"./Link-Dzd4imFl.js";import"./dato-Bw5hcYdr.js";import"./format-DOnqlv3Z.js";import"./getTimezoneOffsetInMilliseconds-B2lAfqmU.js";import"./match-H4nwVkoz.js";import"./parseISO-iW_-10Ww.js";import"./parse-DO6xBU5X.js";import"./getDefaultOptions-DaalUCUF.js";import"./isSameDay-CqMX9KMb.js";import"./index-Bn-4SKiA.js";import"./index-CWbL8d4M.js";import"./util-BUULX9Gg.js";import"./Modal.context-DYSmtGyK.js";import"./Portal-B956yLNG.js";import"./useDescendant-CQ-MnVt3.js";import"./DismissableLayer-D0OULu_n.js";import"./Floating-B5ej4W6f.js";import"./useOpenChangeAnimationComplete-K7pbfbiN.js";import"./useValueAsRef-PjrNas2W.js";import"./FocusBoundary-Bi1l7-Ym.js";import"./useControllableState-SFUimoeF.js";import"./ChevronRight-xR3TR1_n.js";import"./Tag-PZgmnfu9.js";import"./ChatExclamationmark-UbCAJQZc.js";import"./FileXMark-B70j__7y.js";import"./HandShakeHeart-n6A9Pp2R.js";import"./Calendar-DUJ3wHmA.js";import"./ThumbUp-DkC_SHsq.js";import"./ExclamationmarkTriangle-CzcnWQ2X.js";import"./Table-XtrGrhbx.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...a.parameters?.docs?.source}}};export{a as IHandlingMeny,o as SomKnapp,ee as default};
