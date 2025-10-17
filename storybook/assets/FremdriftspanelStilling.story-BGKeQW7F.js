import{ak as I,al as w,j as t,R as k,S as j,ci as x,ck as b,cm as g,cz as u,aK as y,cA as _}from"./iframe-D2dvj_6K.js";import{w as m,c as D}from"./ContextDecorators-Bh_2pHE5.js";import{F as N,A as v}from"./FullførtStilling-DHtoYj-R.js";import{R as T}from"./GjenåpneStillingKnapp-C_HWd-gc.js";import{T as A}from"./TilgangskontrollForInnhold-Ddi2_Ex-.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BotNX_4K.js";import"./OrganisasjonsnummerAlert-DkkZhm3E.js";import"./VStack-z9wH5dn0.js";import"./BasePrimitive-BEWWhB3K.js";import"./List-Cprn4dhP.js";import"./Link-u6gzZM83.js";import"./KandidatHendelseTag-CM2kClGI.js";import"./Tag-CV9m-ITv.js";import"./FileXMark-CUqQ7cSb.js";import"./Trash-C1YTFGrH.js";import"./HandShakeHeart-Bu3Rw4xr.js";import"./Calendar-D02IXrkp.js";import"./ThumbUp-C5BLve7y.js";import"./Table-CnycmvKL.js";import"./util-viOpl8QD.js";import"./format-BAltmp1D.js";import"./match-D8FDjT0X.js";import"./parse-DYQ32hYW.js";import"./getDefaultOptions-BkBa5hFb.js";import"./parseISO-CS5cHoEZ.js";import"./util-Beh5P7GG.js";import"./accordion-DOnBvUrX.js";import"./index-CwtQgCSa.js";import"./index-Djwwvc2f.js";import"./index-DmqHWkjp.js";import"./ChevronDown-CabTLLsX.js";import"./Box-QyXigN0J.js";import"./Bell-DZk_8WsD.js";import"./PersonChat-CNDOBaRf.js";import"./Eye-CwerRW3p.js";import"./ProgressBar-DLgOQ1Lm.js";import"./EyeSlash-DOKavHym.js";import"./CircleSlash-DtrG0GZ1.js";import"./Modal-BHgMXdvc.js";import"./floating-ui.react-2s2ZHpJr.js";import"./Date.Input-8G6lp9tB.js";import"./useFormField-DQ6SW2DV.js";import"./useControllableState-DPGbthHZ.js";import"./Modal.context-Bq_osYLE.js";import"./Checkbox-Cd_p8BDn.js";import"./Fieldset-CF0ONOJp.js";import"./Pencil-DyX1fnME.js";import"./PersonbrukerTekst-DvrB4p3K.js";import"./ClockDashed-BTwuFF3I.js";import"./Tasklist-Ckn6l_Bc.js";import"./ErrorBoundary-C7lf6_p2.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,vt as default};
