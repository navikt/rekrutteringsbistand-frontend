import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-B5k7HgKP.js";import{w as m,c as A}from"./ContextDecorators-Bl6_1Vly.js";import{F as N,A as v}from"./FullførtStilling-BRmTYzx7.js";import{R as T}from"./GjenåpneStillingKnapp-KQi64H99.js";import{T as E}from"./TilgangskontrollForInnhold-n-U-1xSv.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CvPwwAd8.js";import"./OrganisasjonsnummerAlert-qh5-HCeD.js";import"./VStack-DwNyMrLP.js";import"./BasePrimitive-ChLjm-OF.js";import"./List-Dsa8NCSm.js";import"./Link-C19GH7by.js";import"./KandidatHendelseTag-CAWwf87G.js";import"./Tag-Da0f1wDh.js";import"./ChatExclamationmark-DnfOejm9.js";import"./FileXMark-BUypplJh.js";import"./Trash-fwld1poE.js";import"./HandShakeHeart-ZwdqVNvv.js";import"./Calendar-BWc64Fs3.js";import"./ThumbUp-D4CF9KsB.js";import"./Table-Bt_s7cRr.js";import"./util-DFhp_AVe.js";import"./parse-DdTbfJuI.js";import"./getDefaultOptions-C_GWPHaZ.js";import"./parseISO-Pc_TeQhl.js";import"./index-BiQOaXy7.js";import"./index-B40KJ5b4.js";import"./isBefore-Cyp7XTD_.js";import"./util-BxKh5lRO.js";import"./accordion-BBxC_hEw.js";import"./index-D61Jw1fD.js";import"./index-O5OfE37q.js";import"./index-DSKEMX1K.js";import"./ChevronDown-CWuZpo8s.js";import"./Box-BQApRDQ5.js";import"./Bell-QnyYvo6Y.js";import"./PersonChat-DXR5swbl.js";import"./Eye-SgFSspdb.js";import"./ProgressBar-Twc9MWUV.js";import"./EyeSlash-vP-a7CqQ.js";import"./CircleSlash-BSJOdY0M.js";import"./Modal-DlmypBx-.js";import"./floating-ui.react-BPABgFu6.js";import"./Date.Input-CmGT4RU1.js";import"./useFormField-BmZi7DJY.js";import"./useControllableState-CUN5WquP.js";import"./Modal.context-BcWwb0YD.js";import"./Checkbox-PFxLZVCU.js";import"./Fieldset-DRO8r2-O.js";import"./Pencil-B2ycSVjU.js";import"./PersonbrukerTekst-BCI6NKGL.js";import"./ClockDashed-DVuQ88CI.js";import"./Tasklist-nuBKDdQK.js";import"./ErrorBoundary-DBkuUQgj.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
