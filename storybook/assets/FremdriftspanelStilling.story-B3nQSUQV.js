import{aD as I,M as w,j as t,q as k,S as x,cx as j,cB as b,cD as g,cy as u,P as y,cR as _}from"./iframe-BieBZBrC.js";import{w as m,c as A}from"./ContextDecorators-D2Oshgmx.js";import{F as N,A as v}from"./FullførtStilling-Bf0AuMfJ.js";import{R as T}from"./GjenåpneStillingKnapp-3IUeDSz0.js";import{T as D}from"./TilgangskontrollForInnhold-DhpQLYO6.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Bnf8RiZM.js";import"./OrganisasjonsnummerAlert-BvKz5vny.js";import"./VStack-j_6fDLqS.js";import"./BasePrimitive-C-AyPf28.js";import"./List-tzDAdmQv.js";import"./Link-CWeI14oH.js";import"./KandidatHendelseTag-Dd3aEsI4.js";import"./Tag-BnzJTYvC.js";import"./ChatExclamationmark-CElSCxaJ.js";import"./FileXMark-DnWXPm_c.js";import"./Trash-BYeHNZgS.js";import"./HandShakeHeart-DYywCy2W.js";import"./Calendar-BdhU97-1.js";import"./ThumbUp-Dpw8xDbk.js";import"./Table-Ce5VDLFH.js";import"./util-CaZvvzYS.js";import"./parse-COH9Z8ot.js";import"./getDefaultOptions-CHo2M-IZ.js";import"./parseISO-GHa_kk7l.js";import"./index-C2SWHjju.js";import"./index-B40KJ5b4.js";import"./isBefore-CeGnEHPl.js";import"./util-CF1SHtQv.js";import"./accordion-DvIdxHEE.js";import"./index-CGNSxLNl.js";import"./index-DCpc_ZFy.js";import"./index-C2mgQKNj.js";import"./ChevronDown-66bC11TG.js";import"./Box-2mspcOCv.js";import"./Bell-ozhAbnbw.js";import"./PersonChat-CMLExyWJ.js";import"./Eye-DY1ysPl3.js";import"./ProgressBar-Cn8qSARq.js";import"./EyeSlash-Bg1TDSlk.js";import"./CircleSlash-C8SBVT3u.js";import"./Modal-Dle4maZT.js";import"./floating-ui.react-BT8q7oaF.js";import"./Date.Input-YnMHaQ4h.js";import"./useFormField-A_jOGruo.js";import"./useControllableState-DtKQdZJ4.js";import"./Modal.context-BqRc_p1X.js";import"./Checkbox-DCC4sImV.js";import"./Fieldset-C2ULAKk4.js";import"./Pencil-DGN9OGCp.js";import"./PersonbrukerTekst-DseNmg8M.js";import"./ClockDashed-BUeBwFp0.js";import"./Tasklist-CIjmbhqt.js";import"./ErrorBoundary-MUI-itDH.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ut={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ut as default};
