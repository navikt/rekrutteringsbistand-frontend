import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-BHoMFX67.js";import{w as m,c as A}from"./ContextDecorators-DQhViAGk.js";import{F as N,A as v}from"./FullførtStilling-BykCJ2MS.js";import{R as T}from"./GjenåpneStillingKnapp-D9a3lAhL.js";import{T as E}from"./TilgangskontrollForInnhold-BxFmWBYP.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BIJDxCd7.js";import"./OrganisasjonsnummerAlert-CtyKFJ16.js";import"./VStack-Cb4Fd9NL.js";import"./BasePrimitive-BGvCM3ff.js";import"./List-Ba5nzO8b.js";import"./Link-CfecVY-4.js";import"./KandidatHendelseTag-Bo0o7sHX.js";import"./Tag-DCWS9W5D.js";import"./ChatExclamationmark-DL4qS7ce.js";import"./FileXMark-BVRHyc_E.js";import"./Trash-BTATC9D6.js";import"./HandShakeHeart-DzqcfAnc.js";import"./Calendar-C88ffwOa.js";import"./ThumbUp-Cg6pKAH2.js";import"./Table-Cgi7RIp6.js";import"./util-D6kNqDHc.js";import"./parse-BRSXN0qK.js";import"./getDefaultOptions-DBXf_iNK.js";import"./parseISO-CNxmnplC.js";import"./index-DLOipvgg.js";import"./index-B40KJ5b4.js";import"./isBefore-BK0dGRff.js";import"./util-BVx09jAu.js";import"./accordion-D9G67-L3.js";import"./index-CyNtERiI.js";import"./index-D0f73DmN.js";import"./index-Bf33mQtS.js";import"./ChevronDown-BdJQRWr_.js";import"./Box-DrAC56G6.js";import"./Bell-Dnhej7X_.js";import"./PersonChat-CLqsvMXs.js";import"./Eye-CPtU-gVE.js";import"./ProgressBar-CTHBnopU.js";import"./EyeSlash-oeFWJKfl.js";import"./CircleSlash-BDsGxOpt.js";import"./Modal-DBr1nkbn.js";import"./floating-ui.react-rhOpBHqT.js";import"./Date.Input-DFcY_nsR.js";import"./useFormField-LKhzjTW5.js";import"./useControllableState-Diyq5Leq.js";import"./Modal.context-CZsrP9EO.js";import"./Checkbox-Cbn1e5iU.js";import"./Fieldset-BwXGOMVX.js";import"./Pencil--41thc8f.js";import"./PersonbrukerTekst-BB3VG9YN.js";import"./ClockDashed-BhYkx0vL.js";import"./Tasklist-CA1Uf4rE.js";import"./ErrorBoundary-BY3RQKYj.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
