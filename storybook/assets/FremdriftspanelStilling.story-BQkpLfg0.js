import{aI as I,Q as w,j as t,w as k,S as x,cx as j,cF as b,cE as g,cy as u,V as y,cU as _}from"./iframe-CiGY7qMR.js";import{w as m,c as A}from"./ContextDecorators-DAnV9lS_.js";import{F as N,A as v}from"./FullførtStilling-B1SE3BIJ.js";import{R as T}from"./GjenåpneStillingKnapp-DytJo2FW.js";import{T as E}from"./TilgangskontrollForInnhold-CLX0BkJ0.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-CqG63GHb.js";import"./OrganisasjonsnummerAlert-ByJga9bj.js";import"./VStack-C_-hnwwm.js";import"./BasePrimitive-BQ62VW93.js";import"./List--wBR2yL0.js";import"./Link-DyRtkKI1.js";import"./KandidatHendelseTag-CcqEyqef.js";import"./Tag-C0efUnwM.js";import"./ChatExclamationmark-Ckn-l4A4.js";import"./FileXMark-BwXFQEJT.js";import"./Trash-digMADAk.js";import"./HandShakeHeart-B7NwZDqt.js";import"./Calendar-TIPtk1kB.js";import"./ThumbUp-X8wLfdad.js";import"./Table-CH84zTQf.js";import"./util-Fn-bZDVZ.js";import"./parse-Dg8aE5G9.js";import"./getDefaultOptions-CiRVjgWb.js";import"./parseISO-9yAsPxsQ.js";import"./index-VhmIyIcn.js";import"./index-B40KJ5b4.js";import"./isBefore-B2vJKrVG.js";import"./util-BAlQu1eo.js";import"./accordion-CTHnGYBC.js";import"./index-_KAAriij.js";import"./index-DltaZL3-.js";import"./index-BFDexgmx.js";import"./ChevronDown-C7Nf2yeE.js";import"./Box-BolHw0XS.js";import"./Bell-X6ZXwgE2.js";import"./PersonChat-CkYMVLXT.js";import"./Eye-CpU_U8xV.js";import"./ProgressBar-DwguoE2P.js";import"./EyeSlash-BQzvCoy0.js";import"./CircleSlash-BZGnYb9R.js";import"./Modal-BqkINsYj.js";import"./floating-ui.react-kQ0dcq0t.js";import"./Date.Input-DpTSAKfW.js";import"./useFormField-C1e6No_-.js";import"./useControllableState-BE8X9NLB.js";import"./Modal.context-D2yQqxZ7.js";import"./Checkbox-C4ymHpM8.js";import"./Fieldset-CDx8WO68.js";import"./Pencil-U42txE1G.js";import"./PersonbrukerTekst-BfL1ix9R.js";import"./ClockDashed-BtlG73cm.js";import"./Tasklist-BG4_fAAk.js";import"./ErrorBoundary-bwqWf7Rc.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
