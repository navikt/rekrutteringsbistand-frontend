import{h as I,j as t,aM as k,S as w,h_ as j,i9 as u,ia as x}from"./iframe-Cj10hJN9.js";import{w as m,c as D}from"./ContextDecorators-Dz6OibcW.js";import{K as b}from"./schema.zod-B-ipr8Fl.js";import{u as _}from"./useKandidatlisteForEier-Blt6151W.js";import{F as y,A as N}from"./FullførtStilling-DcJf0HW0.js";import{R as T}from"./GjenåpneStillingKnapp-C0A00uG_.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as A}from"./TilgangskontrollForInnhold-DenbJSWj.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-DCcLHUx1.js";import"./OrganisasjonsnummerAlert-C5fz9_EJ.js";import"./VStack-DgWskb_V.js";import"./BasePrimitive-C6TPMJG9.js";import"./List-iw2586sG.js";import"./Link-4Kimjj0w.js";import"./KandidatHendelseTag-BljSSKGz.js";import"./Tag-NFCzJApn.js";import"./FileXMark-Du0-y8iF.js";import"./Trash-C2Lk7IOj.js";import"./HandShakeHeart-DkAoXuKv.js";import"./Calendar-LzYd0bSO.js";import"./ThumbUp-B1ZOElQa.js";import"./Table-BAMcB-vd.js";import"./util-Dqlyw5_B.js";import"./format-BpNq2Jet.js";import"./match-B8Nx5_0z.js";import"./parseISO-Bc0AvIe9.js";import"./parse-BQHX6S4p.js";import"./getDefaultOptions-B8TMiTK_.js";import"./util-BgzDEogq.js";import"./kandidat.mock-Bqs74Obm.js";import"./innsatsgrupper-BqldBv0r.js";import"./accordion-iOW2rfXu.js";import"./index-B7UkPr_4.js";import"./index-BSAQgCq9.js";import"./index-B2L8coRY.js";import"./ChevronDown-BGcv_Viz.js";import"./Box-B4wOgh-g.js";import"./Bell-C9JqctyI.js";import"./PersonChat-cd-Hs4sH.js";import"./Eye-Dy7uPQE-.js";import"./ProgressBar-D21Gj7l3.js";import"./oppdaterStilling-Bayjem4P.js";import"./EyeSlash-CG0IW5p0.js";import"./CircleSlash-CzPgoa9O.js";import"./Modal-BnX-hhmJ.js";import"./floating-ui.react-S9Semehl.js";import"./Date.Input-DQpYWw0X.js";import"./useFormField-DDhd-sru.js";import"./useControllableState-Cfdz1RLo.js";import"./Modal.context-C6cKfwqx.js";import"./Checkbox-CRZBjvAL.js";import"./Fieldset-OiLuhayD.js";import"./Pencil-CPpVRgH2.js";import"./PersonbrukerTekst-Y0qZrXua.js";import"./ClockDashed-DmQeaAIo.js";import"./Tasklist-gr7m_bnE.js";import"./ErrorBoundary-y06l36Z7.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=_(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(y,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Ot={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
