import{j as e,a as d,r as p}from"./iframe-BPSD_YT1.js";import"./KandidatlisteContext-CWv2XNbQ.js";import{A as i}from"./ActionMenu-BL3964LW.js";import{S as m}from"./KandidatHendelseTag-BA8Xq8oU.js";import{S as u}from"./Trash-C41qzD3M.js";import"./preload-helper-PPVm8Dsz.js";import"./OrganisasjonsnummerAlert-DBPOxU3O.js";import"./VStack-C67QtXfD.js";import"./BasePrimitive-8nTlBWV_.js";import"./Box-CMQLBGtp.js";import"./List-CG-AmWBZ.js";import"./Link-9DcEu_Or.js";import"./dato-BAVnjlbJ.js";import"./format-D-YFd6ny.js";import"./getTimezoneOffsetInMilliseconds-DQEVRmlI.js";import"./match-BuiY2TPh.js";import"./parseISO-BOW4UQTL.js";import"./parse-NK1nM1gG.js";import"./getDefaultOptions-C9er2TTU.js";import"./isSameDay-DbD_TQR0.js";import"./index-CGIfqvc0.js";import"./index-CWbL8d4M.js";import"./util-u9UCHBPY.js";import"./Modal.context-DvEzp0QD.js";import"./Portal-BgAknobq.js";import"./useDescendant-5d9VxkGW.js";import"./DismissableLayer-5YKXKYJX.js";import"./Floating-DPk3nvwU.js";import"./useOpenChangeAnimationComplete-BGjOV0Xd.js";import"./useValueAsRef-zCvEXrEB.js";import"./FocusBoundary-CRG9PzgU.js";import"./useControllableState-_KJ3yXDg.js";import"./ChevronRight-DuU4S5br.js";import"./Tag-Z_hb8F6K.js";import"./ChatExclamationmark-OKMhT7nK.js";import"./FileXMark-zEZJwxZh.js";import"./HandShakeHeart-stKjGjIo.js";import"./Calendar-Blqonz_6.js";import"./ThumbUp-ByRZjHBD.js";import"./ExclamationmarkTriangle-CXzaFuJ-.js";import"./Table-Cj6PKC90.js";const s=({modalRef:t,lukketKandidatliste:r,actionMenu:l,slettet:n})=>e.jsx(e.Fragment,{children:l?e.jsxs(i.Item,{variant:"danger",onClick:()=>t.current?.showModal(),children:[n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"})," ",n?"Gjenopprett":"Slett"]}):e.jsx(d,{disabled:r,variant:"tertiary",size:"small",onClick:()=>t.current?.showModal(),icon:n?e.jsx(m,{title:"Angre sletting"}):e.jsx(u,{title:"Slett"}),children:n?"Gjenopprett":"Slett"})});s.__docgenInfo={description:"",methods:[],displayName:"EndreArkivertStatusKnapp",props:{lukketKandidatliste:{required:!0,tsType:{name:"boolean"},description:""},slettet:{required:!1,tsType:{name:"boolean"},description:""},actionMenu:{required:!1,tsType:{name:"boolean"},description:""},modalRef:{required:!0,tsType:{name:"RefObject",elements:[{name:"HTMLDialogElement"}],raw:"RefObject<HTMLDialogElement>"},description:""}}};const ee={tags:["autodocs"],component:s},o={args:{lukketKandidatliste:!1,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null);return e.jsx(s,{modalRef:r,lukketKandidatliste:t})}},a={args:{lukketKandidatliste:!1,actionMenu:!0,modalRef:{current:null}},render:({lukketKandidatliste:t})=>{const r=p.useRef(null),[l,n]=p.useState(!1);return e.jsxs(i,{open:l,onOpenChange:n,children:[e.jsx(d,{as:i.Trigger,size:"small",variant:"secondary",children:"Åpne meny"}),e.jsx(i.Content,{children:e.jsx(s,{actionMenu:!0,modalRef:r,lukketKandidatliste:t})})]})}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
