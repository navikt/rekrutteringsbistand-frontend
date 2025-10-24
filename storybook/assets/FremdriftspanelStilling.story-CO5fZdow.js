import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-DjWAYC3X.js";import{w as m,c as D}from"./ContextDecorators-CG1xE8mr.js";import{F as N,A as v}from"./FullførtStilling-DXHytv0t.js";import{R as T}from"./GjenåpneStillingKnapp-DO1Zl4Tj.js";import{T as A}from"./TilgangskontrollForInnhold-M0gVqPwk.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CtELFOJ9.js";import"./OrganisasjonsnummerAlert-CF7Db9g3.js";import"./VStack-BqFQUYwb.js";import"./BasePrimitive-sX7nyWc6.js";import"./List-DR39Y2pP.js";import"./Link-zymZHbka.js";import"./KandidatHendelseTag-BLQ_daev.js";import"./Tag-BKh_NYfg.js";import"./ChatExclamationmark-wGEED-K-.js";import"./FileXMark-OLFg0HbR.js";import"./Trash-sbNyFVus.js";import"./HandShakeHeart-BCU9vFzG.js";import"./Calendar-DGo2MEgV.js";import"./ThumbUp-CLh74G2X.js";import"./Table-BlUBqtiI.js";import"./util-CAXxsQeM.js";import"./format-BfXTDFos.js";import"./match-BDdBpRqH.js";import"./parse-DO3g-9bF.js";import"./getDefaultOptions-bsi7JpGz.js";import"./parseISO-CkBq9KAX.js";import"./index-C5sFxyTN.js";import"./index-B40KJ5b4.js";import"./isBefore-xCT4RK0D.js";import"./util-D7wgF1k8.js";import"./accordion-dIMkyD7S.js";import"./index-BkrR2ugV.js";import"./index-BA8VWX3e.js";import"./index-pFVkddLA.js";import"./ChevronDown-Bwtq3pPt.js";import"./Box-5T3MX3VV.js";import"./Bell-DK8NMjn8.js";import"./PersonChat-Bu8-LbMw.js";import"./Eye-kvnFYhno.js";import"./ProgressBar-C6RgLuKi.js";import"./EyeSlash-Bew1Czwi.js";import"./CircleSlash-CCi2vh-B.js";import"./Modal-BsoN4001.js";import"./floating-ui.react-DKvA-InG.js";import"./Date.Input-DR7nmpz5.js";import"./useFormField-BA43ugRZ.js";import"./useControllableState-B_dAdZ-G.js";import"./Modal.context-C1cH-4SS.js";import"./Checkbox-CINz8jg6.js";import"./Fieldset-Ddqe0bDG.js";import"./Pencil-yfcPR7eH.js";import"./PersonbrukerTekst-Dq8mioKL.js";import"./ClockDashed-CIwLy5KF.js";import"./Tasklist-CN8JbLf3.js";import"./ErrorBoundary-Df7TdstK.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Vt as default};
