import{av as w,V as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,Y as y,cw as _}from"./iframe-C8jcw7Cb.js";import{w as m,c as D}from"./ContextDecorators-BwUDklGS.js";import{F as N,A as v}from"./FullførtStilling-DyMYFZHD.js";import{R as T}from"./GjenåpneStillingKnapp-TGCLPY6b.js";import{T as A}from"./TilgangskontrollForInnhold-DKNhTC9i.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DnY9EEzK.js";import"./OrganisasjonsnummerAlert-BCFTfpSG.js";import"./VStack-BNepLD7v.js";import"./BasePrimitive-j6bcQoiE.js";import"./List-DbyFyqGt.js";import"./Link-DGq1BhO6.js";import"./KandidatHendelseTag-CXaL0pNj.js";import"./Tag-sxlF9RpW.js";import"./ChatExclamationmark-DBdosOr8.js";import"./FileXMark-BbhoTwvO.js";import"./Trash-Bvh1x_kE.js";import"./HandShakeHeart-B07m9nhL.js";import"./Calendar-B4h891om.js";import"./ThumbUp-4m2Eb0GJ.js";import"./Table-CLMLU_P6.js";import"./util-CSHBdDyM.js";import"./format-lbXZMvYQ.js";import"./match-BdPrbPLE.js";import"./parse-Dy9tyMs5.js";import"./getDefaultOptions-DcxZO1Sq.js";import"./parseISO-5MriDrOw.js";import"./index-znWfUUuP.js";import"./index-B40KJ5b4.js";import"./isBefore-BDjvwerj.js";import"./util-tI648GuU.js";import"./accordion-CVPbblwu.js";import"./index-BDCRo7P0.js";import"./index-n1CCoJ_N.js";import"./index-NZ5AjimQ.js";import"./ChevronDown-D0XiWsMN.js";import"./Box-C8f3Fhij.js";import"./Bell-C7tnOoAN.js";import"./PersonChat-BgoqxS8l.js";import"./Eye-rSgZOQi5.js";import"./ProgressBar-BjrxukjL.js";import"./EyeSlash-NnXBfnzT.js";import"./CircleSlash-CBeJjDQU.js";import"./Modal-AuWpHQsv.js";import"./floating-ui.react-BmbGXzjv.js";import"./Date.Input-uaTAZs0d.js";import"./useFormField-DsCr0zyN.js";import"./useControllableState-BUOfQ_y2.js";import"./Modal.context-DvXrykWw.js";import"./Checkbox-CRDswWuy.js";import"./Fieldset-CcOVYtC0.js";import"./Pencil-DGtPk2gw.js";import"./PersonbrukerTekst-7eELNrJD.js";import"./ClockDashed-DAdgQG2w.js";import"./Tasklist-Bw7kVCjr.js";import"./ErrorBoundary-DyEHwwJt.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Jt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Jt as default};
