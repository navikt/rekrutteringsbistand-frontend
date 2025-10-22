import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-B0j3dBe_.js";import{w as m,c as D}from"./ContextDecorators-Dr6K2XF0.js";import{F as N,A as v}from"./FullførtStilling-9AsO42NN.js";import{R as T}from"./GjenåpneStillingKnapp-DV35xgLV.js";import{T as A}from"./TilgangskontrollForInnhold-bU94-HUT.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CThpR_0Y.js";import"./OrganisasjonsnummerAlert-Bxy0Rcbz.js";import"./VStack-DbIwrttT.js";import"./BasePrimitive-Dod1M_er.js";import"./List-BYFxz2b-.js";import"./Link-DGDf1XYQ.js";import"./KandidatHendelseTag-UzCePNJV.js";import"./Tag-BNRBoOxy.js";import"./ChatExclamationmark-BynP-iDS.js";import"./FileXMark-C_9Jiyie.js";import"./Trash-IOfx71pU.js";import"./HandShakeHeart-Vczkap1y.js";import"./Calendar-ZqKhZm1M.js";import"./ThumbUp-DKnvruW5.js";import"./Table-DFZx8cdo.js";import"./util-CfoXsJ_z.js";import"./format-qS-sW-Ib.js";import"./match-DHz9fwDB.js";import"./parse-DNW-Wvb-.js";import"./getDefaultOptions-BKY15GUr.js";import"./parseISO-D4PY0Yeo.js";import"./util-Bq54C9Kr.js";import"./accordion-KEGxt09y.js";import"./index-D-GEsDJu.js";import"./index-BKhpGqqa.js";import"./index-7lpZFuFR.js";import"./ChevronDown-BxOVmkRo.js";import"./Box-D7OU9iWr.js";import"./Bell-BKYokPRP.js";import"./PersonChat-Czd2fv6R.js";import"./Eye-CsqSbFT-.js";import"./ProgressBar-D7cUawMH.js";import"./EyeSlash-CG6471Ww.js";import"./CircleSlash-DCx4AEkC.js";import"./Modal-7DsMGCO3.js";import"./floating-ui.react-g9dkc5xN.js";import"./Date.Input-67tnFGPP.js";import"./useFormField-G-xxxCyd.js";import"./useControllableState-BWgq-Ysb.js";import"./Modal.context-BUox5sdW.js";import"./Checkbox-GX5Tthdk.js";import"./Fieldset-Bcwt9PEv.js";import"./Pencil-CyBcMbj_.js";import"./PersonbrukerTekst-Bf8Wzky7.js";import"./ClockDashed-BWk5llIo.js";import"./Tasklist-DNyFZu5a.js";import"./ErrorBoundary-D-RnEc0W.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
