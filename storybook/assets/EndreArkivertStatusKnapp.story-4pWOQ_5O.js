import{j as e,a as d,r as p}from"./iframe-dQW9Z_zk.js";import"./KandidatlisteContext-CJYLD__z.js";import{A as i}from"./ActionMenu-DMkVfzaa.js";import{S as m}from"./KandidatHendelseTag-xkEb6fKi.js";import{S as u}from"./Trash-C0rAx-3K.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-CYSlUhLZ.js";import"./VStack-5Cn0xXnD.js";import"./BasePrimitive-G6oXtLOj.js";import"./Box-otEQFjft.js";import"./List-0QRq-QCa.js";import"./Link-DFXDk8av.js";import"./dato-6QacYvdF.js";import"./format-Ci1biztN.js";import"./en-US-CEt_ID-_.js";import"./match-PiNg2qZ7.js";import"./parseISO-DYSaaqBK.js";import"./parse-C3XDkwLd.js";import"./getDefaultOptions-BwmOte06.js";import"./isSameDay-Cj5NnS7e.js";import"./index-CVBl4lzb.js";import"./index-CWbL8d4M.js";import"./util-Cw-1L6iA.js";import"./Modal.context-EZhP1nV5.js";import"./Portal-BKVXHdDH.js";import"./useDescendant-DsVI7Fw8.js";import"./DismissableLayer-D1nM_yGb.js";import"./Floating-BnVtHlP3.js";import"./useOpenChangeAnimationComplete-BhjMQTWC.js";import"./useValueAsRef-Bwqba-Yp.js";import"./FocusBoundary-CgBLaS5M.js";import"./useControllableState-BaYeSWn8.js";import"./ChevronRight-C_Xno_FI.js";import"./Tag-DhNgZu5O.js";import"./ChatExclamationmark-BhwYKFhb.js";import"./FileXMark-BKriksVs.js";import"./HandShakeHeart-CUbYMZF2.js";import"./Calendar-BbntDJCE.js";import"./ThumbUp-BMpVVZL2.js";import"./ExclamationmarkTriangle-BqI9Lc0z.js";import"./Table-OzJdcQ2O.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
