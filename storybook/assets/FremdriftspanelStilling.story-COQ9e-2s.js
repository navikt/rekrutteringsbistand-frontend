import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-Xu6LCdLp.js";import{w as d,c as D}from"./ContextDecorators-DWwF5DWm.js";import{F as N,A as v}from"./FullførtStilling-lOvjathL.js";import{R as T}from"./GjenåpneStillingKnapp-C5kPjrTQ.js";import{T as A}from"./TilgangskontrollForInnhold-B67L25Vz.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CxrfUA4z.js";import"./OrganisasjonsnummerAlert-DEF4CGMU.js";import"./VStack-B8yWg0yF.js";import"./BasePrimitive-Do-NJpc0.js";import"./List-CqCvDNK_.js";import"./Link-BY2fBes3.js";import"./KandidatHendelseTag-2e-ynWB9.js";import"./Tag-ChTYVXm_.js";import"./ChatExclamationmark-D3hGO4dV.js";import"./FileXMark-CwcxO-Ee.js";import"./Trash-C3OJiBqw.js";import"./HandShakeHeart-CZCByx4B.js";import"./Calendar-CnhQo0Li.js";import"./ThumbUp-Dt52FnrT.js";import"./Table-Bl65rNr_.js";import"./util-CAiyUaV6.js";import"./format-DPX7Su2y.js";import"./match-JhzIkmE4.js";import"./parse-BCmSvDHV.js";import"./getDefaultOptions-DViSjfbX.js";import"./parseISO-DtzgeS_I.js";import"./util-D_4CsoMS.js";import"./accordion-BWSLZkwS.js";import"./index-qq3ZslyB.js";import"./index-hgF5-Uhz.js";import"./index-CkEwmfJx.js";import"./ChevronDown-DWtuC2j8.js";import"./Box-CVHrEHdg.js";import"./Bell-CF1FuPzD.js";import"./PersonChat-CqAgQRjP.js";import"./Eye-Bx_wN8U2.js";import"./ProgressBar-B6iwNGHi.js";import"./EyeSlash-ThqfzFix.js";import"./CircleSlash-D7VLjvYJ.js";import"./Modal-BdpzMWrW.js";import"./floating-ui.react-BSQ1kU2M.js";import"./Date.Input-jERI6tCM.js";import"./useFormField-CFXIANGa.js";import"./useControllableState-BPvVIkLJ.js";import"./Modal.context-X5ow3xPo.js";import"./Checkbox-Bzqmgt2O.js";import"./Fieldset-C8DSrINf.js";import"./Pencil-DAq-kYCv.js";import"./PersonbrukerTekst-DaVv_T9q.js";import"./ClockDashed-DJbwgNaw.js";import"./Tasklist-DdGdkYNT.js";import"./ErrorBoundary-gfWt4Oyy.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),m=I(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
