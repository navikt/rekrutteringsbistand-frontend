import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-CC24wDKQ.js";import{w as m,c as A}from"./ContextDecorators-DO8BU597.js";import{F as N,A as v}from"./FullførtStilling-Dlvm-2IL.js";import{R as T}from"./GjenåpneStillingKnapp-BderKCHm.js";import{T as E}from"./TilgangskontrollForInnhold-DQUNCnKM.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dr34UCLz.js";import"./OrganisasjonsnummerAlert-6o4J3Zq8.js";import"./VStack-BfiJmBsb.js";import"./BasePrimitive-RaTy3Sqj.js";import"./List-BxJq4101.js";import"./Link-CLwnBQe7.js";import"./KandidatHendelseTag-DZm75Qvb.js";import"./Tag-DgZXKrLS.js";import"./ChatExclamationmark-CuAiLPOl.js";import"./FileXMark-DakMo6k3.js";import"./Trash-Cfv936UM.js";import"./HandShakeHeart-CwpdiEo3.js";import"./Calendar-Qlc-HePb.js";import"./ThumbUp-BMmej0A7.js";import"./Table-CvBE8rLO.js";import"./util-CwXuo_Oh.js";import"./parse-h5OPM2AO.js";import"./getDefaultOptions-DVLcaaiq.js";import"./parseISO-CY1zYzdS.js";import"./index-BWfBt7yf.js";import"./index-B40KJ5b4.js";import"./isBefore-V34-X8qa.js";import"./util-BYQIEfzV.js";import"./accordion-DVltyKI4.js";import"./index-tQvFgoK2.js";import"./index-B3mymdWq.js";import"./index-CkW1QryE.js";import"./ChevronDown-oQKRzDt4.js";import"./Box-eD__SWev.js";import"./Bell-CD37KX46.js";import"./PersonChat-BP6QDJrH.js";import"./Eye-D4l1klRK.js";import"./ProgressBar-Bz_b2lHm.js";import"./EyeSlash-Bxl1y1Y9.js";import"./CircleSlash-CFdZojVG.js";import"./Modal-DvEczSJU.js";import"./floating-ui.react-BZgD_ST-.js";import"./Date.Input-CXtqeAvR.js";import"./useFormField-18lvTvbK.js";import"./useControllableState-CcDs5zF6.js";import"./Modal.context-BxhMUhwK.js";import"./Checkbox-P-i_1nBW.js";import"./Fieldset-93DAR5aT.js";import"./Pencil-DC3sKUhG.js";import"./PersonbrukerTekst-DRHjtCKP.js";import"./ClockDashed-CCBksnTL.js";import"./Tasklist-BZhodfq_.js";import"./ErrorBoundary-D8ubDljM.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
