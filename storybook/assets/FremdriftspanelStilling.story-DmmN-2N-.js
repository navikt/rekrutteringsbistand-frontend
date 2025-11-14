import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-cLJRmr5B.js";import{w as m,c as A}from"./ContextDecorators-9fFt5yj9.js";import{F as N,A as v}from"./FullførtStilling-XXa_fryQ.js";import{R as T}from"./GjenåpneStillingKnapp-CvRuWLB6.js";import{T as E}from"./TilgangskontrollForInnhold-p5boYYAL.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-BSYuaauy.js";import"./OrganisasjonsnummerAlert-CCSY39nJ.js";import"./VStack-B2r-tQtf.js";import"./BasePrimitive-DTZDTqQs.js";import"./List-UT7Ujmtc.js";import"./Link-9PaDWQ5u.js";import"./KandidatHendelseTag-DZelb0om.js";import"./Tag-C-d1Pyhp.js";import"./ChatExclamationmark-BxusJMw0.js";import"./FileXMark-Cr6_-DVc.js";import"./Trash-C7kcIopf.js";import"./HandShakeHeart-46D9JgEp.js";import"./Calendar-Cr35rsID.js";import"./ThumbUp-BfeXTZAz.js";import"./Table-DVn9t72p.js";import"./util-DwduAItI.js";import"./parse-Cy-KfFvb.js";import"./getDefaultOptions-Ckh4Aw2C.js";import"./parseISO-DcOpjpXk.js";import"./index-BPuz4oKp.js";import"./index-B40KJ5b4.js";import"./isBefore-Db2DvAxc.js";import"./util-D6noReb-.js";import"./accordion-BtflaTQi.js";import"./index-sJWN58Q1.js";import"./index-CtZgFNga.js";import"./index-CwOOSuqh.js";import"./ChevronDown-CYilpRIH.js";import"./Box-DrwG-3Gc.js";import"./Bell-Bu8cNDY8.js";import"./PersonChat-Duo-cB9Z.js";import"./Eye-BjTp6f30.js";import"./ProgressBar-Dmleco60.js";import"./EyeSlash-CH3Obd-Z.js";import"./CircleSlash-BeEr_d5B.js";import"./Modal-CGfxLs3s.js";import"./floating-ui.react-oTc_ktS-.js";import"./Date.Input-CxMEZoBY.js";import"./useFormField-CUE04D8g.js";import"./useControllableState-BdxLHsnI.js";import"./Modal.context-Dv_WIP1o.js";import"./Checkbox-nCl4M__X.js";import"./Fieldset-CQsRRphW.js";import"./Pencil-BtuYEGew.js";import"./PersonbrukerTekst-Bqs9pZsI.js";import"./ClockDashed-C6C9o0_9.js";import"./Tasklist-Dmiu79QE.js";import"./ErrorBoundary-oq0WUaKH.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
