import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-ByzEnOxG.js";import{w as m,c as D}from"./ContextDecorators-BtgFJAn-.js";import{F as N,A as v}from"./FullførtStilling-dncawnlW.js";import{R as T}from"./GjenåpneStillingKnapp-BqECReLJ.js";import{T as A}from"./TilgangskontrollForInnhold-CFF9pqrZ.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-32deajk_.js";import"./OrganisasjonsnummerAlert-CjWKWI09.js";import"./VStack-BUNeWq07.js";import"./BasePrimitive-ADC_nWuD.js";import"./List-B9e_Uqcn.js";import"./Link-DP8L-u5t.js";import"./KandidatHendelseTag-DB-zDha5.js";import"./Tag-g1oZ3pmM.js";import"./ChatExclamationmark-CS5U7PlC.js";import"./FileXMark-9GnYKY-v.js";import"./Trash-MmHSDIpY.js";import"./HandShakeHeart-T_GBk1ak.js";import"./Calendar-DEfQx0cd.js";import"./ThumbUp-DIYI02ff.js";import"./Table-hnbPft1Z.js";import"./util-D-V2Ntvq.js";import"./format-jrJ_Xa-f.js";import"./match-C9jzbOjx.js";import"./parse-De4qOPe7.js";import"./getDefaultOptions-BH1O2UCm.js";import"./parseISO-CJWGJaij.js";import"./index-CDMSrJPg.js";import"./index-B40KJ5b4.js";import"./isBefore-DuuV8X7P.js";import"./util-BXsTr_LB.js";import"./accordion-qZJvIt0k.js";import"./index-CfJDkS87.js";import"./index-lNY65_1_.js";import"./index-Ci0Al8jN.js";import"./ChevronDown-BvbvSwjf.js";import"./Box-Ccm40kNX.js";import"./Bell-BSDppyDJ.js";import"./PersonChat-BRl-Xbsy.js";import"./Eye-Cq3PBGrN.js";import"./ProgressBar-CJNhrTgC.js";import"./EyeSlash-DtTDhMW5.js";import"./CircleSlash-C8eOKJPR.js";import"./Modal-iCCbX0mm.js";import"./floating-ui.react-CIrDHEIY.js";import"./Date.Input-5lHBwM5y.js";import"./useFormField-CJY1G2Gz.js";import"./useControllableState-BF3zxFoJ.js";import"./Modal.context-CpSCLtx0.js";import"./Checkbox-rNWTcdKB.js";import"./Fieldset-Oo3xWBcW.js";import"./Pencil-DsDnD8u6.js";import"./PersonbrukerTekst-Dx1Uufk7.js";import"./ClockDashed-ByuQjILp.js";import"./Tasklist-CYmx5KzI.js";import"./ErrorBoundary-OIZ5OrC3.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
