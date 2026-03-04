import{j as e,c as d,r as p}from"./iframe-BrRRy87W.js";import"./KandidatlisteContext-Bx066WUy.js";import{A as i}from"./ActionMenu-CsLSaqab.js";import{S as m}from"./KandidatHendelseTag-DKSMfzI5.js";import{S as u}from"./Trash-B8waw_3B.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-B7QDgbF8.js";import"./VStack-CgfmCG0c.js";import"./BasePrimitive-YQMHy7Np.js";import"./Box-C-uC0ruS.js";import"./List-gUQSEGNL.js";import"./Link-Ch6xHdZZ.js";import"./dato-BmL0gDVE.js";import"./format-BhK7W3zi.js";import"./getTimezoneOffsetInMilliseconds-Bh9fIElG.js";import"./match-CKM5Xknp.js";import"./parseISO-CIRKoOMJ.js";import"./parse-DU8IMmvF.js";import"./getDefaultOptions-Cd6CUs11.js";import"./isSameDay-CHqErPY1.js";import"./index-vOxTa9hK.js";import"./index-CWbL8d4M.js";import"./util-CfPp7DTt.js";import"./Modal.context-Bwo_Hchg.js";import"./Portal-CB858NuS.js";import"./useDescendant-Dbspdi_L.js";import"./DismissableLayer-BuYleBYY.js";import"./Floating-C8Ojo8IV.js";import"./useOpenChangeAnimationComplete-DegIUOfZ.js";import"./useValueAsRef-DDdThnIX.js";import"./FocusBoundary-C6Hdjv4f.js";import"./useControllableState-BA6ifFhK.js";import"./ChevronRight-Crci9Qmj.js";import"./Tag-D_3Ry31M.js";import"./ChatExclamationmark-dDuaQ_nl.js";import"./FileXMark-CCMOk04x.js";import"./HandShakeHeart-jSUtcbqz.js";import"./Calendar-ItQ8uwze.js";import"./ThumbUp-CoYl0ohr.js";import"./ExclamationmarkTriangle-Chn-Fh0a.js";import"./Table-CBesBuVr.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
