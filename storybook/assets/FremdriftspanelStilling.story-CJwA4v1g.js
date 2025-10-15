import{a5 as I,a_ as w,j as t,R as k,S as j,a6 as x,cq as b,ak as g,cC as u,av as _,cD as y}from"./iframe-D0GwblT9.js";import{w as d,c as A}from"./ContextDecorators-CMebyck5.js";import{F as N,A as v}from"./FullførtStilling-jF7V6tvW.js";import{R as T}from"./GjenåpneStillingKnapp-CurXkEv7.js";import{T as D}from"./TilgangskontrollForInnhold-TVjQ78yJ.js";import"./preload-helper-DoVtK-SO.js";import"./KandidatlisteContext-uZfcIBzt.js";import"./OrganisasjonsnummerAlert-DPiffhI3.js";import"./VStack-DfBEpgKB.js";import"./BasePrimitive-UD7NlCQ0.js";import"./List-BRv2j5Bv.js";import"./Link-D9_Md5d7.js";import"./KandidatHendelseTag-BFY25_C2.js";import"./Tag-CguSApHK.js";import"./FileXMark-BkMS0TzM.js";import"./Trash-CS_c5_23.js";import"./HandShakeHeart-s5_1MJ0t.js";import"./Calendar-ePF77qUm.js";import"./ThumbUp-H-K5QnVH.js";import"./Table-6gCLUur0.js";import"./util-CGf6D49c.js";import"./format-BqKlHFwg.js";import"./match-Bysio2Q7.js";import"./parseISO-D1SCS3cY.js";import"./parse-Dwt_9sBn.js";import"./getDefaultOptions-C4E30K8G.js";import"./util-Dv4KQlRL.js";import"./accordion-rQ3deGlo.js";import"./index-DI0Y8ODE.js";import"./index-Ccu0eCer.js";import"./index-Y-T2M5GO.js";import"./ChevronDown-B_Sd0WQW.js";import"./Box-C09I9Atg.js";import"./Bell-Dm-r_J8l.js";import"./PersonChat-C5m3szyg.js";import"./Eye-CxevXwq_.js";import"./ProgressBar-tggGk7S1.js";import"./EyeSlash-Dxgh5deI.js";import"./CircleSlash-C1LZtduM.js";import"./Modal-BMbaFcl7.js";import"./floating-ui.react-Br6_DC9v.js";import"./Date.Input-CynUqluh.js";import"./useFormField-BN4HxSCa.js";import"./useControllableState-bKZctjKQ.js";import"./Modal.context-DI9DxRcm.js";import"./Checkbox-BCY0cmm9.js";import"./Fieldset-C26yIYWv.js";import"./Pencil-CmxsqJvV.js";import"./PersonbrukerTekst-WlWucOQk.js";import"./ClockDashed-BAFhjkJO.js";import"./Tasklist-CWeeY1MP.js";import"./ErrorBoundary-CEEKoUb3.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),m=w(i,E),c=m.error;return c?.status===404||c?.message?.includes("404")||c&&!m.isLoading?t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(D,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[m],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const vt={tags:["autodocs"],component:n},l={render:()=>d(()=>t.jsx(n,{dropDown:!1}))},a={render:()=>d(()=>t.jsx(n,{dropDown:!0}))},o={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:_.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return d(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=y,i=A({stillingsData:r,antall:2});return d(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...a.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
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
}`,...o.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,a as AktivDropdown,p as FormidlingVariant,o as Fullført,vt as default};
