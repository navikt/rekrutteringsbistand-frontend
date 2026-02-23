import{j as e,c as d,r as p}from"./iframe-Du4ErrN9.js";import"./KandidatlisteContext-BLtEYLBm.js";import{A as i}from"./ActionMenu-CGUJlaQM.js";import{S as m}from"./KandidatHendelseTag-DQ3Cp8M5.js";import{S as u}from"./Trash-bX2JpitG.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-D1Bm_81q.js";import"./VStack-Bve1Ie6c.js";import"./BasePrimitive-C9NfG_y6.js";import"./Box-KY0Rc0S9.js";import"./List-D7YUdINq.js";import"./Link-D27H1lvY.js";import"./index-DfnbxBUT.js";import"./index-B40KJ5b4.js";import"./util-CJcB-hEF.js";import"./Modal.context-Cm1HpL9i.js";import"./useControllableState-SOyeuRM-.js";import"./Portal-C4fML_zd.js";import"./useClientLayoutEffect-_rHzf2V6.js";import"./FocusBoundary-DL9aFeFb.js";import"./owner-CO0wgQ-G.js";import"./useValueAsRef-BYwi5IAp.js";import"./useOpenChangeAnimationComplete-O3LPnYXK.js";import"./useDescendant-xaskNqQ2.js";import"./DismissableLayer-BkQSmu2f.js";import"./Floating-Ck90-JjU.js";import"./ChevronRight-BhCfBUQt.js";import"./Tag-DiV07uNk.js";import"./ChatExclamationmark-BYksI9v2.js";import"./FileXMark-B1E1wd-v.js";import"./HandShakeHeart-recinVmu.js";import"./Calendar-RqC8pNZB.js";import"./ThumbUp-Cl5lbcUY.js";import"./ExclamationmarkTriangle-BH77reGb.js";import"./Table-o2ivS6E2.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const V={tags:["autodocs"],component:s},a={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},o={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};export{o as IHandlingMeny,a as SomKnapp,V as default};
