import{ak as I,al as w,j as t,R as k,S as j,ci as x,ck as b,cm as g,cz as u,aK as y,cA as _}from"./iframe-DkqQV0Vp.js";import{w as m,c as D}from"./ContextDecorators-CTI8SJFj.js";import{F as N,A as v}from"./FullførtStilling-CmIdh9Jw.js";import{R as T}from"./GjenåpneStillingKnapp-BEHa38xm.js";import{T as A}from"./TilgangskontrollForInnhold-BAvTaFbC.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-LJmcUknT.js";import"./OrganisasjonsnummerAlert-B-0GhKkG.js";import"./VStack-Br_bVmDS.js";import"./BasePrimitive-CTvonWwE.js";import"./List-DgeHneII.js";import"./Link-BMo8M5FD.js";import"./KandidatHendelseTag-3mtqR6ne.js";import"./Tag-OQKFFpN6.js";import"./FileXMark-G79II5l8.js";import"./Trash-CvGRU7xH.js";import"./HandShakeHeart-P-Q9hIaQ.js";import"./Calendar-G_W6zy3n.js";import"./ThumbUp-n6Eb3EYf.js";import"./Table-_jt-Wkdf.js";import"./util-BKVFyWR_.js";import"./format-DbRpKZZT.js";import"./match-Bcqr4xsr.js";import"./parse-C-cVUR9H.js";import"./getDefaultOptions-CDCFXLmF.js";import"./parseISO-DB_v1pEI.js";import"./util-B1vQ7Ub3.js";import"./accordion-CseUlFQO.js";import"./index-D60PJnnE.js";import"./index-DiTPCPEL.js";import"./index-DtP00QZ2.js";import"./ChevronDown-D9cxegDX.js";import"./Box-B7F-YfFi.js";import"./Bell-BpxIe5JV.js";import"./PersonChat-oE6N10pl.js";import"./Eye-B8TfXQIh.js";import"./ProgressBar-CkPT8eqx.js";import"./EyeSlash-DTm1-Mo6.js";import"./CircleSlash-C5XxsoL2.js";import"./Modal-CNKsmz6h.js";import"./floating-ui.react-AbRo5KDr.js";import"./Date.Input-DKgCjNm_.js";import"./useFormField-C_wy9RA2.js";import"./useControllableState-CktX_T5O.js";import"./Modal.context-BxvMIN3L.js";import"./Checkbox-DF8P5t53.js";import"./Fieldset-C_pYn4r0.js";import"./Pencil-Cmgl5pRh.js";import"./PersonbrukerTekst-BCDKpZHg.js";import"./ClockDashed-DC2-d0J6.js";import"./Tasklist-DxUuKQQP.js";import"./ErrorBoundary-BHa7_uD7.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
