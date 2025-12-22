import{aw as I,T as w,j as t,x as k,S as x,cz as j,cI as b,cH as g,cA as u,X as y,c$ as _}from"./iframe-B3f5JsBL.js";import{w as m,c as D}from"./ContextDecorators-CdwUs38w.js";import{F as N,A as v}from"./FullførtStilling-Bx5Tfb-w.js";import{R as T}from"./GjenåpneStillingKnapp-CIBf0IiO.js";import{T as A}from"./TilgangskontrollForInnhold-BU1ZaWp4.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DSj3oEba.js";import"./OrganisasjonsnummerAlert-CqrFfl1R.js";import"./VStack-Cyq1zcSi.js";import"./BasePrimitive-DTcZC2Ka.js";import"./List-Bi1mPzw3.js";import"./Link-CxIdyMM9.js";import"./KandidatHendelseTag-C75U9OOQ.js";import"./Tag-HQflId7t.js";import"./ChatExclamationmark--mKgA6Ru.js";import"./FileXMark-CYLbex1x.js";import"./Trash-BRSLg01_.js";import"./HandShakeHeart-TSLWLIqu.js";import"./Calendar-DxUVfheH.js";import"./ThumbUp-sInhpK6j.js";import"./ExclamationmarkTriangle-BMukC4AA.js";import"./Table--483cipR.js";import"./index-Cnf-X_bH.js";import"./index-B40KJ5b4.js";import"./util-B6Mcalfs.js";import"./DatoVelger-dQvaUUFQ.js";import"./useDatepicker-DyxIRTY7.js";import"./useControllableState-CmSO-Fnv.js";import"./Modal-B7L2is3s.js";import"./floating-ui.react-BuFQUhpN.js";import"./Date.Input-Clf8B4hK.js";import"./useFormField-CIGIYXae.js";import"./ChevronDown-Bq9uvc-y.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-ARtV7_eE.js";import"./Modal.context-DKfjR89r.js";import"./Popover-vbAlY7mj.js";import"./DismissableLayer-COB3spCf.js";import"./startOfMonth-Cb9PmshA.js";import"./Select-DFeDBl-c.js";import"./endOfMonth-hblMgRKV.js";import"./ArrowLeft-CJ82ncZL.js";import"./ArrowRight-BfUGowf5.js";import"./isSameDay-DScS310x.js";import"./Checkbox-Bu0XL9KQ.js";import"./Fieldset-Cc3CDmtZ.js";import"./accordion-cc4ybFX_.js";import"./index-DkajiMKS.js";import"./index-DTesrF3c.js";import"./index-DpL5N1bg.js";import"./Box-DbDKPTBV.js";import"./Bell-B--oLkEL.js";import"./PersonChat-DIp0r1_l.js";import"./Eye-cDHU2b8D.js";import"./ProgressBar-S4tC6fp8.js";import"./useLatestRef-CgyOwYN1.js";import"./ShieldLock-BOweZ75Y.js";import"./PadlockLocked-DdWMu42t.js";import"./EyeSlash-Deq862QG.js";import"./CircleSlash-DEgrw5vK.js";import"./Pencil-LCoRoc1K.js";import"./FullførStillingModal-Da1RsJKS.js";import"./PersonbrukerTekst-BFS2Dsvt.js";import"./ClockDashed-Bmqhu-f_.js";import"./IkonNavnAvatar-BolIyWx3.js";import"./umamiEvents-4lZbqD_K.js";import"./Tasklist-C0U5tzOx.js";import"./ErrorBoundary-D3IbIwTV.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Qt={tags:["autodocs"],component:n},o={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},l={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...o.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{o as Aktiv,l as AktivDropdown,p as FormidlingVariant,a as Fullført,Qt as default};
