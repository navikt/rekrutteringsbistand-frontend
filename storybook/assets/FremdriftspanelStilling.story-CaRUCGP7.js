import{h as I,j as t,aL as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-XlTllAuX.js";import{w as m,c as D}from"./ContextDecorators-VPPjrswg.js";import{K as b}from"./schema.zod-BC5-f7GZ.js";import{u as _}from"./useKandidatlisteForEier-GAtdg6Hp.js";import{F as y,A as N}from"./FullførtStilling-GdL6sclR.js";import{R as T}from"./GjenåpneStillingKnapp-Dnxkvb7y.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-5d-zOf4j.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-OmFZasYM.js";import"./OrganisasjonsnummerAlert-CV3WVrYQ.js";import"./VStack-CsoES-hm.js";import"./BasePrimitive-B27pQm3P.js";import"./List-VTGdx7DI.js";import"./Link-BZllahFp.js";import"./KandidatHendelseTag-DwG_0g3h.js";import"./Tag-BDONKljZ.js";import"./FileXMark-DIYkyt3P.js";import"./Trash-Css8GNUu.js";import"./HandShakeHeart-DeLxSOoE.js";import"./Calendar-DOtBe3lY.js";import"./ThumbUp-DENVjgkC.js";import"./Table-DQEfXYmu.js";import"./util-BHGYwjsw.js";import"./format-D2iUlHUk.js";import"./match-B5GTOkkR.js";import"./parseISO-CX-BFnlC.js";import"./parse-9h7q15na.js";import"./getDefaultOptions-CexkTlHf.js";import"./util-DZymvEEu.js";import"./kandidat.mock-DcKiI5c0.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-Bye-uayS.js";import"./index-CT7YRzHX.js";import"./index-BglsPjd_.js";import"./index-B_4xCHnZ.js";import"./ChevronDown-CaeRuUHi.js";import"./Box-ucKMfw_t.js";import"./Bell-DLsX6pTh.js";import"./PersonChat-QYUpTGHA.js";import"./Eye-uMfrM5qV.js";import"./ProgressBar-CJ9xPfCY.js";import"./oppdaterStilling-C-yDb4Do.js";import"./EyeSlash-Drsn29hy.js";import"./CircleSlash-DOpoIhzj.js";import"./Modal-C87dbEOB.js";import"./floating-ui.react-CQ1j8rqW.js";import"./Date.Input-Dvo-G1dZ.js";import"./useFormField-BBkBvgfd.js";import"./useControllableState-Dwr4OusZ.js";import"./Modal.context-B_tjMCaq.js";import"./Checkbox-3-aMbE6z.js";import"./Fieldset-pawAfBKV.js";import"./Pencil-DaCsutLP.js";import"./PersonbrukerTekst-v14UiooC.js";import"./ClockDashed-rshKofcU.js";import"./Tasklist-ByD12SDw.js";import"./ErrorBoundary-BA8CSVwJ.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Ot as default};
