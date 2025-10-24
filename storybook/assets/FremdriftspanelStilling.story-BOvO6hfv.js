import{am as w,an as I,j as t,p as k,S as j,cc as x,cg as b,ci as g,cd as u,aK as y,cw as _}from"./iframe-CvAsB_PP.js";import{w as m,c as D}from"./ContextDecorators-qU537RQf.js";import{F as N,A as v}from"./FullførtStilling-DqssM2X4.js";import{R as T}from"./GjenåpneStillingKnapp-Cp8PRKr-.js";import{T as A}from"./TilgangskontrollForInnhold-CG3s9oyR.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DHEfE7VN.js";import"./OrganisasjonsnummerAlert-DWhn1SoA.js";import"./VStack-AxHc-0un.js";import"./BasePrimitive-77yr22IN.js";import"./List-DGM51Xar.js";import"./Link-D4f6l7hj.js";import"./KandidatHendelseTag-DJk4h79r.js";import"./Tag-BlcEA2XO.js";import"./ChatExclamationmark-U-mAqd6d.js";import"./FileXMark-BvZo3mlC.js";import"./Trash-DE-JZ4Of.js";import"./HandShakeHeart-CfWBIzRT.js";import"./Calendar-AGKkvLA3.js";import"./ThumbUp-BoD78Ibw.js";import"./Table-KjrGy8Rv.js";import"./util-BHiovH0e.js";import"./format-sZiXwGYw.js";import"./match-C6g0stLX.js";import"./parse-nHoLI9xT.js";import"./getDefaultOptions-G1ntk7f0.js";import"./parseISO-B2cUmngl.js";import"./index-CmwULg7v.js";import"./index-B40KJ5b4.js";import"./isBefore-DF09tqDQ.js";import"./util-B6ET-IeG.js";import"./accordion-CUZhJMrj.js";import"./index-B_taDyc0.js";import"./index-CC2YD1di.js";import"./index-BWmdxYBr.js";import"./ChevronDown-xfR_zGFT.js";import"./Box-D7D6nwiU.js";import"./Bell-Biez94_E.js";import"./PersonChat-Cuw0l2L4.js";import"./Eye-DzHd5q9U.js";import"./ProgressBar-BPYG8lXq.js";import"./EyeSlash-axsgyMnk.js";import"./CircleSlash-CIl1xLrM.js";import"./Modal-LeLMqzzP.js";import"./floating-ui.react-BpGFA9Kj.js";import"./Date.Input-Cuo6jDtV.js";import"./useFormField-C4h_Ry35.js";import"./useControllableState-CXrdSXg2.js";import"./Modal.context-Btg_hFAx.js";import"./Checkbox-DXX_l6Zb.js";import"./Fieldset-DMTDtHN6.js";import"./Pencil-Bum_AyUN.js";import"./PersonbrukerTekst-DxSoIcZZ.js";import"./ClockDashed-g4qwZDZs.js";import"./Tasklist-_hE-dAw6.js";import"./ErrorBoundary-KUfclJFR.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=w(),d=I(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(j,{hooks:[d],children:e=>{const F=e.status===x.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Vt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
